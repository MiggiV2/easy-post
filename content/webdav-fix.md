---
title: "How a Simple Aegis Backup Turned Into a WebDAV Bug Hunt"
date: "2026-03-11"
draft: false
description: "What started as a routine attempt to back up my Aegis 2FA vault to OpenCloud on Android turned into a deep dive through SAF, WebDAV, broken uploads, server logs, and a small fix that finally made everything work."
---

I had a modest goal for the evening: create reliable encrypted backups of my Aegis vault and store them in my own OpenCloud.

That sentence sounds calm, reasonable, and boring. In reality, it turned into one of those deeply familiar self-hosting adventures where every layer is technically working, except the one part you actually need.

Aegis supports encrypted backups, Android has a system file picker, and OpenCloud exposes storage over WebDAV, so this should have been a straightforward path from phone to server. Instead, I spent hours walking in circles through storage providers, Android integration quirks, empty files, and HTTP errors, slowly realizing I was no longer “setting up backups.” I was debugging a protocol boundary.

## The plan that should have worked

My original idea was simple.

I wanted Aegis to write encrypted backups directly into OpenCloud, ideally through the normal Android file picker, with no manual export dance and no half-forgotten temporary files sitting around on my phone. Nextcloud had worked that way before, which made the OpenCloud behavior even more confusing.

The first surprise was that OpenCloud did not show up in Android the way I expected. The app did not expose its folders in the same friendly, integrated way I had seen elsewhere, so Aegis had nowhere obvious to save its backup.

That is the kind of problem that looks small at first. It invites optimism. You think: no problem, I’ll just bridge it with WebDAV.

This is the exact moment the evening stopped being about backups and became about consequences.

## The false starts

My next stop was a WebDAV bridge app that could expose remote storage to Android through the system picker.

At first, this looked promising. I could connect. I could browse. I could see folders. For a brief moment, everything felt almost solved, which is one of the most dangerous states in software.

Then I tried DAVx⁵ mounts too, because when one path is flaky, the natural instinct is to add another layer of abstraction and hope that somehow improves things. It did not.

What I found instead were files that existed and looked real, but were completely empty. Zero kilobytes. The worst kind of backup failure is not a crash, or a loud error, or a giant red warning. It is a file that politely pretends it contains your future recovery plan while actually containing nothing at all.

Reports around DAVx⁵ WebDAV mounts and backup tools describe this exact class of problem: uploads can appear to succeed while ending up empty or corrupted, which makes them dangerous for anything important.

At that point I stopped treating the setup as “annoying” and started treating it as untrustworthy.

## The clue in the logs

So I went back to the WebDAV route and started checking everything more carefully.

Eventually I had the right OpenCloud DAV Spaces URL. I could list files. I could create folders. Authentication worked. The basic connection worked. Only uploads failed.

That detail mattered.

When listing and folder creation work, but `PUT` fails, the problem usually is not credentials or permissions in the broad sense. It is something more specific and more insulting. Usually the request itself is malformed in some tiny way that only becomes visible when actual file content enters the picture.

Then the server log finally gave me the sentence I had been waiting for:

```text
error getting the content length ... strconv.ParseInt: parsing "": invalid syntax
```

That was the whole mystery, compressed into one line.

The server was trying to parse `Content-Length`, and instead of a number it was effectively getting nothing. Not the wrong length. Not a bad value. Just absence, followed by chaos.

Once I saw that, the hours of confusion started to rearrange themselves into something coherent.

## The actual bug

The app was sending uploads in a way that did not provide a fixed `Content-Length`.

OpenCloud did not like that. More precisely, its frontend tried to parse the missing value and tripped over it hard enough to return HTTP 400 instead of storing the file.

That explained why everything else felt half-broken in such a specific way:

- Browsing worked.
- Folder creation worked.
- Uploads failed immediately.
- The server log looked weirdly low-level.

The entire issue lived in a small, boring, protocol-shaped gap between client and server.

This is one of my favorite and least favorite categories of bug. It is not glamorous. It does not involve distributed systems at scale or exotic race conditions or elegant algorithmic failure. It is just two pieces of software disagreeing about one HTTP detail with enough confidence to ruin your evening.

So I forked the repository and changed the upload behavior to send a fixed content length.

And then, suddenly, it worked.

Not metaphorically. Not “kind of.” Not “it uploaded but I’m not sure if I trust it.”

It actually worked.

The files uploaded. The Aegis backups landed where they were supposed to land. The setup went from haunted to boring, which is exactly what backup infrastructure should be.

## What I’m taking away from this

I started out wanting safe, encrypted backups of my 2FA vault. That still feels like an entirely reasonable expectation for modern software. But somewhere between Android storage integration and self-hosted WebDAV, I ended up debugging request headers and patching an app.

In hindsight, the most frustrating part was not that something failed. Things fail all the time. The frustrating part was how convincingly everything looked like it almost worked. A visible folder is not a working backup. A created file is not a valid backup. A successful login is not a complete workflow.

That is the lesson I am keeping from this little adventure: if the data matters, test the whole path. Not the first 80 percent of it. Not the parts that feel reassuring. The whole path.

In the end, I got what I wanted. I forked the project, fixed the upload behavior, and prepared an issue for upstream so the problem is documented properly and maybe fixed for the next person who decides that “back up Aegis to OpenCloud” sounds easy.

It was not easy.

But at least now it is possible.