---
title: "From Frustration to Automation: My n8n & Ollama Journey"
date: "2026-01-28"
draft: true
description: "How I overcame initial struggles with n8n to build powerful AI workflows using my Raspberry Pi and Ollama Cloud"
---

In the last few months, the automation software n8n got a lot of attention. I also tried it out some months ago, but I didn't find any good use case for me.


## First contact 
I have a very old project, written in Go, that fetches my GitHub notifications and sends me the newest OpenSource Releases on Matrix. n8n has a lot of integrations, including GitHub. So why not implement this old project in a new and clean workflow?

I got the setup via Docker very fast and started to work on my first workflow. My first struggle was that the GitHub integration did not provide any "action" to fetch my notifications or other ways to get the releases I wanted. Then I thought, okay let's try at least the Matrix integration. Then I spent some time figuring out how to send a simple message to a Matrix room and also failed. This was very frustrating and I gave up. I thought, maybe I will find a use case later in the week, but I didn't.

After some weeks, I deleted the containers to save resources, since I didn't use n8n actually.

## The Game Changer
While I was studying for an exam, about testing and workflows, I thought why not take a short break and give n8n a 2nd try. Let's watch a short basic tutorial on YouTube and try again. In this tutorial, the guy was starting with a very simple workflow. He simply fetched a news feed from Hacker News using HTTP and sent the latest 5 via Discord. Then I got curious. 

I don't want to use Discord for that. How about I use ntfy with HTTP. Could not be that difficult right? And it wasn't! Now I have a very simple workflow that sends me the latest Hacker News to my phone via ntfy, just using two HTTP requests. Great! Then, how about Matrix again? ntfy is cool, but Matrix is my main passion for communication. This time I got it to work! Now the simple workflow used the Matrix integration and sent me the news into a Matrix room :) This got me motivated even further.

In the next workflow, the guy did something with AI. I don't want to pay money to OpenAI, so I decided to use Ollama on my Pi. A very small model should fit on my Pi5 right? And it did! A very small, about `1b`-`4b`, model runs on the Pi5. It's slow, but it runs. My idea was to get a personalized weather report using a simple prompt to transform a lovely JSON into a nice report. That also worked and the model was quite fast, but then I got suspicious. Why is it so fast and why is the temperature so wrong? Turns out, the JSON objects were wrongly parsed and the prompt just included `[Object object, ...]`. Wow, the AI lied to me and hallucinated the full report. I quickly fixed this and then the LLM took way longer. So long that n8n decided to call a timeout after 5min. I did a lot of research, but could not find any way to increase the timeout limit that actually worked.

The frustration came back, but I didn't want to give up yet! Since Ollama exposes a RestAPI, I simply did this one HTTP request myself. It didn't take long to get my own Ollama workflow, without the n8n Ollama integration. So yeah, even if it takes very long, I don't care. The report is generated in the morning, before I wake up. It doesn't matter if it takes 6min, 30min or even 1h. I got my own local AI first workflow done with n8n.

## Bigger models for free
End of last year 2025, Ollama introduced Ollama Cloud. My first thought was, why do I need this? I have my GPU and can run models that are quite okay for my use cases. And then I saw that they have a free tier and I don't have to spend money, if I'm okay with a very limited usage. Since I just want to generate a weather report once a day, that should be fine. I got my API key and added it to n8n. Since the cloud model is way faster than my Pi5, I don't run into timeouts and get even better reports.
It just feels nice to have the opportunity to use the cloud model, but also I can just use my Pi5, which is okay too.

**Final thoughts**: Sometimes it's good to give things a 2nd try. But also, sometimes it's good to spend your energy wisely. Choose what you want to do for yourself, instead of following some trend. That being said, have a great day and build awesome stuff (if you want to)!

---

The n8n tutorial: https://www.youtube.com/watch?v=ONgECvZNI3o

This article is 100% human generated ✅
