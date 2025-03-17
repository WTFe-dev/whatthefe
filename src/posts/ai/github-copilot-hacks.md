---
title: Github copilot hacks
description: Github copilot hacks
date: 2025-03-17
tags:
  - frontend
  - tooling
  - dx
  - ai
  - VSCode
  - copilot
---


# GitHub Copilot Hacks: May the Code Be with You

Time to step into the AI-driven galaxy. When I first started using **GitHub Copilot in VSCode**, it felt like having my own coding droid—snappy, helpful, and great for small tasks. But as I relied on it more, things got... complicated. 😤🤖

## The Copilot Strikes Back

Suddenly, I found myself writing **long, elaborate prompts for basic functions**. I had set up TypeScript rules, strict linting, and formatting preferences, but Copilot seemed to operate in its own universe, blissfully unaware of my setup. **WTFe?!**

### Here’s a Quick Example

I set up a **Next.js + TypeScript** project and asked Copilot:

**_"Generate a function to fetch an API and return JSON."_**

And here’s what I got:

![Before Code Instructions](/assets/images/01_before-instructions.jpg)

**The result?** I expected Copilot to generate TypeScript code by default, but instead, I kept getting code that needed **constant fixing**, **regenerating**, and **tweaking**—cue **the endless frustration loop**.

<br />

![Frustrated Droid](/assets/images/r2-d2.gif)

At one point, I thought, *"Maybe I should just write the code myself."* 
But I wanted to squeeze every bit of productivity out of Copilot, so the battle continued—**until I found something that changed the game.**

## A New Hope: Code Generation Instructions

No, I didn’t discover a hidden lightsaber or an ancient AI artifact—**I found Copilot’s Code Generation Instructions**⚡. This feature lets you set **custom rules for how Copilot generates code**, making it align with your project’s conventions.

Instead of begging Copilot every time—*"Use TypeScript! No `any`! Arrow functions, please!"*—I could define these rules upfront and let Copilot follow them like a well-trained protocol droid.

![Smarter Droid](/assets/images/bb8.gif)

### Setting Up Your Instructions

Here’s how to bring order to the chaos:

1. Open `settings.json` in VSCode.
2. Add this to set up your code generation instructions:

<br />

```json
"github.copilot.chat.codeGeneration.instructions": [

],
```

<br />

3. Now, define specific rules in simple and plain english:

<br />

```json
"github.copilot.chat.codeGeneration.instructions": [
  { "text": "Always use TypeScript strict mode with strict types." },
  { "text": "Prefer arrow functions over function declarations." }
],
```

<br />

<br />

After this setup, when I gave the same instruction—*"Generate a function to fetch an API and return JSON"*—the result is much better and closely follows my expectations. **The code is in Typescript without using `any` and it generated an arrow function as expected.**

![With Code Instructions](/assets/images/03_code_instructions.jpg)

There you have it! Isn’t this so much better than writing long prompts? This approach works really well—just remember, you can add as many instructions as you want, but keeping them small and precise gives the best results.

<br />

## Using Instruction from File

Instead of modifying `settings.json` every time, you can store your instructions in a separate file and reference it.

```json
"github.copilot.chat.codeGeneration.instructions": [
  { "file": "./typescript-instructions.md" }
],
```

<br />

Now, create a `typescript-instructions.md` file with simple, plain English rules:

```
Always use TypeScript strict mode with strict types.
Prefer arrow functions over function declarations.
Add JSDoc comments to all functions.
```

<br />


## Copilot Acting Up? Debugging Tips

If your instructions aren't being applied, try these quick fixes:

- **Restart VS Code**—yes, the classic "turn it off and on again" still works.
- Use this handy chat command: **"What are the current code generation instructions being used?"**


<br />


This should print all predefined instructions, including your custom ones. The output will look something like this:

![Debugging Instructions](/assets/images/04_debug.jpg)

<br />

## What’s Next? Unlocking More Power

This approach opens up tons of possibilities. You can create multiple instruction files for each repo—or even for different parts of your project:

- `react-components.md` → For React-specific rules
- `utility-functions.md` → For shared utility functions
- `api-calls.md` → For consistent API handling

And yes, you can reference these files in chat prompts too.

### Test Generation Instructions

You can do the same for unit tests using `github.copilot.chat.testGeneration.instructions`.

Sometimes, Copilot forgets teardown logic. So I added this:

```json
"github.copilot.chat.testGeneration.instructions": [
  { "text": "Set up teardowns for tests when applicable." },
  { "text": "Always use Vitest for testing React components." }
],
```

<br />

Now, Copilot automatically includes teardown logic—no more fixing it manually.


<br />

No more AI-generated chaos—just smarter, more predictable Copilot suggestions. 🚀 
**Harness the power of Code Generation Instructions and bring balance to your AI-driven coding.**

**The force (of good code) is with you. Use it wisely. ✨👨‍💻🚀**

![Debugging Instructions](/assets/images/yoda.gif)

<br />

**Reference:** [Official Docs](https://code.visualstudio.com/docs/copilot/copilot-customization)