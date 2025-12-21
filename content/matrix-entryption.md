# SAS vs. Recovery Key in Matrix: Same “Verified”, Very Different Plumbing

Matrix clients often offer two ways to “verify” a new device: **SAS verification** (emoji/number comparison) or entering a **Recovery Key**. Both can end with the same UI badge (“verified device”), but under the hood they solve different problems—and that difference becomes painfully obvious the moment you try to read *old* encrypted messages.

**TL;DR:** SAS is an interactive device-to-device authentication protocol; the Recovery Key unlocks server-stored encrypted secrets (SSSS / key backup) that can instantly give a new device the keys needed to decrypt history.

***

## The pieces (mental model)

Matrix E2EE has a few layers that are easy to mix up:

- **Device keys / identity (Olm, cross-signing):** “Is this device really yours?” This is what verification is about.
- **Message encryption (Megolm):** Room messages are encrypted with Megolm sessions, which evolve via a ratchet and are referenced by indexes; to decrypt history, you need the right Megolm session keys.
- **Key distribution:** A new device can obtain old Megolm keys either from another of your devices (key requests / forwarding) or from **server-side key backup**—if you can unlock it.

So when someone asks “Is SAS or Recovery Key better?”, the real question is usually: *How will this new device get the Megolm keys for earlier messages?*

***

## SAS verification (emoji/decimal comparison)

SAS (Short Authentication String) is essentially: “Let’s do a key agreement, derive a short string from it, and let the humans confirm it matches on both devices.”

What it gives you (cryptographically):

- An authenticated relationship between two devices, established via an interactive protocol (with multiple message round-trips).
- A trust decision bound to the devices involved (because you *visually* confirmed the same derived SAS on both ends).

What it does *not* give you:

- It does not magically download your old room keys.
- It does not itself decrypt any room history.

Practical consequence: after SAS verification, the new device typically starts sending **room key requests** (`m.room_key_request`) to your other devices, which may respond by forwarding keys (`m.forwarded_room_key`).
This works well when at least one older device is online, responsive, and willing/allowed by the client’s policy to share keys to that newly verified device.

And yes: SAS can feel “fiddly” because it’s a human-in-the-loop protocol, and clients have had real-world UX confusion around emoji verification flows.

***

## Recovery Key verification (SSSS + key backup unlock)

The Recovery Key route is conceptually different: it’s not an interactive ceremony between two devices; it’s a way to unlock *stored encrypted secrets* (SSSS) and/or the server-side key backup so the new device can bootstrap itself.

In practice, when you enter the Recovery Key, the client can unlock:

- Cross-signing secrets (so the device can become trusted in your identity graph).
- The **key backup** material needed to fetch and decrypt stored Megolm session keys from the server (depending on setup).

Why it often “just works”: it’s largely deterministic—either the key decrypts the stored secrets, or it doesn’t—without needing your other devices online or a synchronized multi-step exchange.

Security trade-off (important): server-side key backup means the server holds encrypted key material; your security then heavily depends on protecting the Recovery Key / passphrase used to unlock it.

Operational gotcha: if key backup gets reset or rotated, a previously saved Recovery Key might stop unlocking the current backup state, and you’ll see the classic “why can’t I decrypt history on a new device?” spiral.

***

## So… how are *old messages* decrypted after SAS?

Old messages are decrypted with **Megolm session keys**, not with SAS.

Megolm in one paragraph: a room message is encrypted under a Megolm session, and each message advances a symmetric ratchet; messages include an index (`message_index`), so devices need the correct session state/keys to decrypt a given point in history.

After SAS verification, there are (usually) two paths to get those old Megolm keys:

1. **Key requests to another device:** the new device asks your existing devices for the missing Megolm session keys (key request → forwarded room key).
2. **Key backup restore:** the new device pulls encrypted Megolm keys from the server-side backup and decrypts them after unlocking backup secrets (often via Recovery Key / SSSS).

Why users get surprised: a device can be “verified” yet still unable to decrypt history if it can’t obtain the old Megolm keys—because verification is about identity/trust, not about key availability.

One more spicy detail: security research has discussed that some Matrix design choices (including key handling/forwarding behaviors) can create practical security and privacy edge-cases; this doesn’t mean “Matrix is broken,” but it’s a reminder that “verified” is not a magical shield, and threat models matter.

### Sources (links)
- Matrix.org – End-to-end encryption concepts / implementation notes: https://matrix.org/docs/matrix-concepts/end-to-end-encryption/
- Element Docs – How to verify devices: https://docs.element.io/latest/element-support/device-verification/how-to-verify-devices/
- Sumner Evans – Matrix cryptographic key infrastructure (SSSS / cross-signing context): https://sumnerevans.com/posts/matrix/cryptographic-key-infrastructure/
- “Encrypting with Megolm” tutorial: https://uhoreg.gitlab.io/matrix-tutorial/megolm.html
- Megolm paper: https://nebuchadnezzar-megolm.github.io/static/paper.pdf
- “Message Security in Matrix” (Megolm/key flow discussion): https://sumnerevans.com/posts/matrix/megolm/
- Element blog – Resetting server-side key backup: https://element.io/blog/resetting-the-server-side-key-backup/
- Black Hat EU talk – Practical crypto vulnerabilities in Matrix: https://i.blackhat.com/EU-22/Wednesday-Briefings/EU-22-Jones-Practically-exploitable-Cryptographic-Vulnerabilities-in-Matrix.pdf
- Reddit thread – New device can’t decrypt old messages (illustrative symptom): https://www.reddit.com/r/matrixdotorg/comments/s7wyzc/new_device_decrypt_old_messages/