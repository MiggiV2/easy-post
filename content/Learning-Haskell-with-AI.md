---
title: "Learning Haskell with AI: A Surprisingly Fun Journey"
date: "2025-12-22"
draft: false
description: "How an AI tutor turned forgotten syntax into elegant solutions and made functional programming genuinely fun."
---

# Learning Haskell with AI: A Surprisingly Fun Journey

## TL;DR
I started learning Haskell a few weeks ago, forgot most of the syntax, and came back to it with an AI tutor. Turns out, having a patient coding buddy who creates custom exercises and celebrates your wins is pretty awesome.

## Why Haskell?

You might ask: "Why learn Haskell in 2025?" Fair question.

For context: I've been working with Java in enterprise contexts for several years, and I've dabbled with Rust as a hobby for some time. Both are great languages. But Haskell? **Haskell is just different.**

It teaches you to **think differently** about programming. Pure functions, immutability, lazy evaluation, and strong static typing aren't just features - they're a fundamentally different way of solving problems. Even if you never use Haskell professionally, these concepts will make you a better programmer in *any* language.

Plus, writing `filter even . map (^2)` and having it just work feels like magic. Once you experience that elegance, you'll understand why functional programming enthusiasts are so passionate about it.

## The Beginning

A few weeks ago, I started learning Haskell. I read through the book, tried some simple things in GHCi - you know, the usual "getting started" stuff. But here's my confession: I skipped most of the exercises. I told myself I'd come back to them later.

Spoiler alert: "later" took a few weeks, and by then I'd forgotten most of the syntax.

But here's the thing: I didn't give up. I came back, and this time with a different approach - learning Haskell with an AI assistant as my tutor.

## My AI Learning Companion

Instead of just reading documentation or watching tutorials, I asked the AI to be my **learning buddy**. Not to give me answers, but to:
- Create custom exercises for me
- Review my solutions
- Explain concepts when I'm stuck
- Celebrate when I find elegant solutions (this matters more than you'd think!)

The AI started by creating **Exercise 1: Basics** with 5 challenges covering pattern matching, recursion, and list comprehensions. Nothing fancy, just enough to get my hands dirty again.

## The "Aha!" Moments

### Exercise 1: Rediscovering Recursion

My first solution for summing a list:
```haskell
listSum [] = 0
listSum (x:xs) = x + listSum(xs)
```

Simple, right? But here's what I loved - the AI didn't just say "correct" and move on. It showed me I could drop the parentheses in `listSum xs`, explained the style, and then tested it with multiple examples. That instant feedback loop? *Chef's kiss*.

The `maxValue` function was trickier. I came up with:
```haskell
maxValue (x:[]) = x
maxValue (x:y:xs)
  | x > y     = maxValue (x:xs)
  | otherwise = maxValue (y:xs)
```

The AI pointed out my solution was actually **more efficient** than the "classical" recursive approach. That little confidence boost? It kept me going.

### Exercise 2: Higher-Order Functions

Before tackling this, I spent time reading [Learn You a Haskell](https://learnyouahaskell.github.io/higher-order-functions.html). The AI created 10 progressively challenging exercises while I was reading.

This is where things got *fun*.

**Finding elegance:**
```haskell
squares = map (^2)
onlyPositive = filter (> 0)
sumWithFold = foldr (+) 0
```

Point-free style! Sections! Partial application! These weren't just concepts anymore - they were tools I was using to write **beautiful code**.

**The composition revelation:**
```haskell
squaredEvens = filter even . map (^2)
```

When I wrote this and the tests passed, I literally said "Ahhh, das ist so schön eine elegante Lösung zu finden" (roughly: "Ahh, it's so beautiful to find an elegant solution"). That feeling when everything clicks? That's why we code.

**My favorite:**
```haskell
twice :: (a -> a) -> a -> a
twice f = f . f
```

A higher-order function that composes a function with itself. Three words. Infinite possibilities. The AI called it "brilliant" and "mega elegant" - and honestly, I felt pretty proud.

## The Questions That Deepened Understanding

I didn't just blindly solve exercises. I asked questions:

**"Why doesn't `count = length . filter` work?"**

The AI explained partial application and currying in the context of my actual code. We explored why Haskell puts "specializing" parameters first (hint: better composition!).

**"Would it work if we swapped the parameters?"**

Yes! And that led to a discussion about Haskell's design philosophy. Not just "here's the answer," but "here's *why* things are designed this way."

**"What's the difference between `foldr` and `foldl`?"**

I got a nuanced explanation about laziness, associativity, and when to use `foldl'`. The AI didn't just dump information - it connected it to exercises I'd already solved.

## What Made This Work

### 1. **Custom Exercises**
The AI created exercises tailored to my level. Not too easy, not too hard. Each one built on the previous.

### 2. **Immediate Feedback**
Every solution got tested immediately. No waiting, no setup, just:
```bash
ghci -e "squares [1,2,3,4]" uebung2_higher_order.hs
```
Pass or fail, I knew instantly.

### 3. **Multiple Approaches**
For almost every solution, the AI showed alternatives:
- My solution (often celebrated!)
- Alternative implementations
- Different styles (explicit vs point-free)
- Trade-offs between approaches

### 4. **Encouraging Tone**
Look, learning can be frustrating. Having an AI that says "Exzellent! ✅" and "Du machst super Fortschritt! 💪" (You're making great progress!) kept the energy positive.

### 5. **I Drove the Pace**
I solved problems at my speed. No rushing. No judgment. When I needed to read about higher-order functions, the AI prepared exercises and waited. Perfect.

## The Results

After two sessions:
- ✅ Completed 5/5 exercises on basics (pattern matching, recursion, guards)
- ✅ Completed 10/10 exercises on higher-order functions (map, filter, foldr, composition)
- 📚 Deep understanding of currying, partial application, and point-free style
- 🎯 Genuine excitement about functional programming

More importantly, I **want to continue**. I'm ready for Exercise 3 (type classes, custom data types, Maybe/Either).

## Lessons Learned

### For Learning Haskell:
1. **Start simple** - Pattern matching before type classes
2. **Read theory, then practice** - The exercises made the reading stick
3. **Embrace the syntax** - It's different, but it's elegant
4. **Ask "why?"** - Don't just accept that things work

### For Learning with AI:
1. **Be explicit about your level** - "I'm learning X" helps tailor responses
2. **Show your work** - Share your solutions, get feedback
3. **Ask follow-up questions** - The best learning happens in the dialogue
4. **Request tests** - Seeing code run builds confidence
5. **Ask for explanations of alternatives** - Multiple perspectives deepen understanding
6. **Use persistent sessions** - GitHub Copilot CLI sessions continue across conversations!

## The Unexpected Joy

Here's what surprised me most: **learning Haskell became fun**.

Not in a "grinding through tutorials" way, but genuinely engaging. Each solved exercise felt like unlocking a new superpower. Finding an elegant solution gave me the same rush as solving a good puzzle.

When I wrote `twice f = f . f` and realized it worked, I got excited. When the AI explained why parameter order matters for composition, it clicked in a way that docs alone never could.

**Pro tip:** If you're using GitHub Copilot CLI, sessions persist! I could take breaks, read documentation, and come back hours later to continue right where I left off. The AI remembered my progress, my questions, and my learning style.

## Final Thoughts

Is AI the perfect teacher? No. But as a **learning companion**, it's surprisingly effective. It doesn't replace books, documentation, or human mentors - but it complements them beautifully.

For someone learning Haskell (or any programming language), having an AI that:
- Creates custom exercises
- Tests your code instantly
- Explains concepts in context
- Shows multiple solutions
- Encourages you along the way

...is pretty damn helpful.

If you're learning Haskell (or thinking about it), give this approach a try. Start with basics, ask for exercises, show your solutions, ask questions, and most importantly - **enjoy the elegance**.

Because when you write something like `filter even . map (^2)` and it just *works*, that's beautiful.

And Haskell has a lot of that kind of beauty.

---

*Currently on Exercise 2, 10/10 complete. Next up: Type classes and custom data types. Follow along in my [haskell-uebungen repo](https://code.mymiggi.de/thi-study/haskell-uebungen) if you're curious!*

---

**P.S.** - If you're an experienced Haskeller reading this, I'd love to hear: What was *your* "aha!" moment? When did Haskell click for you?
