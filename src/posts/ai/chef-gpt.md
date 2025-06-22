---
title: Chef GPT
description: Chef GPT
date: 2025-06-22
tags:
  - frontend
  - llms
  - rag
  - ai
  - vibecoding
  - ollama
  - langchain
---

# AI + BBQ: A Sizzling Summer Hack

**TL;DR:** I made an AI-powered Sous-Chef that can turn any YouTube recipe into a local-friendly, ingredient-translated, HTML-formatted masterpiece. Also, I love BBQ. This post is  where code meets BBQ and summer smoke — let’s fire it up. 🔥

Every summer, I obsess over BBQ. That's it.

Trying global BBQ recipes is a **full-on adventure** where I live 🇸🇪. But here’s the rub (pun intended): Recipes are in all languages / formats say the recipe calls for brown sugar, but all I find is “farinsocker” hiding in a corner at ICA. Converting Fahrenheit feels like rocket science, and I scroll through someone’s Texas road trip just to learn how much cumin to use. Spice aisle at Coop? Still no Memphis rub — just me, confused, holding “paprikapulver rökt” and questioning life. 😃

**It’s enough to kill the vibe.**

**But this year’s different.** We’re living in the **AI-everything** geeez. And I figured — if AI can write poems, build apps, and beat humans at chess, it can definitely help me decode a recipe. So I did what any dev with a hunger for food and a seat on the AI hype train would do...



<br />

## Welcome to ChefGPT: My AI Sous-Chef.

So here’s what **ChefGPT** does:

 - You drop in a **YouTube recipe URL**
 - It grabs the content using `YoutubeLoader`
 - Runs a `RAG (Retrieval-Augmented Generation)` pipeline to extract recipe details
 - Translates ingredients + measurements to local-friendly formats
 - Serves it all up as clean `Markdown` format (print-ready, copy-pasteable, dev-friendly)

<br />

This idea sparked while I was casually working through the [JavaScript + AI course from Microsoft](https://www.youtube.com/watch?v=w7Q8pfHdkQ0). One moment I was watching a lesson, the next I was writing prompts and plotting recipes.

I’ve also been playing with [Ollama](https://wtfe.dev/posts/ai/hello-ollama/) to run LLMs locally — and this BBQ-flavored experiment turned out to be the perfect sandbox for exploring what’s possible.

🔗 **Vibe-coded repo here:** [github.com/giri-jeedigunta/hello-ollama](https://github.com/giri-jeedigunta/hello-ollama) follow along... Here is how it looks: 
<br />
![Nextjs App](/assets/images/app-1.jpg)

<br />

## 🧩 Core Concepts (Plain and Simple)

If you’re dipping your toes into AI like I am, the jargon can get overwhelming pretty fast. So here’s a quick lowdown on the key ideas I played with — nothing fancy, just the basics to get you started:

#### LangChain
LangChain is like a Swiss Army knife for building AI apps with JavaScript or TypeScript. It helps you connect different pieces — like memory, chains, and tools — to make your AI smarter and more useful. Check it out at [langchain.dev](https://js.langchain.com/docs).

#### Embeddings
Embeddings are a clever way to turn words into numbers so the AI can understand meaning, not just letters. It’s what lets your AI find the right info even if the words aren’t exact. Here’s a good intro from OpenAI: [Embeddings guide](https://platform.openai.com/docs/guides/embeddings).

#### VectorDB
ChromaDB is a special kind of database designed to store “embeddings” — think of it as your AI’s memory bank, where it keeps knowledge in a way that’s easy to search and retrieve. If you want to know more, visit [chromadb](https://www.trychroma.com/).

#### RAG (Retrieval Augmented Generation)
RAG stands for Retrieval Augmented Generation — a fancy way of saying the AI combines what it “knows” locally (your stored info) with its own language smarts to give you better, fact-based answers. Hugging Face has a great write-up here: [RAG explained](https://huggingface.co/docs/transformers/model_doc/rag).

#### Prompt Templates
Prompt Templates are like fill-in-the-blank scripts you write to guide your AI’s responses. Instead of typing everything fresh every time, you use templates to keep things consistent and clear. Learn more on [LangChain’s prompting docs](https://js.langchain.com/docs/concepts/prompt_templates).

### Ollama  
Ollama is what I’m using to run everything locally — no cloud setup, no API keys, just fast and private local LLMs running right on my machine. If you want to set it up yourself, I’ve written a short guide on my blog: [Hello Ollama](https://wtfe.dev/posts/ai/hello-ollama/)

<br />

## 🚀 Let’s Walk Through the Flow

Let’s break it down step by step — simple and focused:

🔍 You can follow along with all these steps in one place — check out the full code here:
github.com/giri-jeedigunta/hello-ollama/blob/main/app/api/generate/route.ts


---

### Set up your AI components

[`@langchain`](https://js.langchain.com/docs) makes it easier to build with LLMs in JavaScript/TypeScript apps. Here's what we’re initializing:

- `embeddings` let you search content by *meaning* — great for semantic matching instead of keyword-based lookup  
- the `model` is your local LLM — used to generate structured outputs based on your prompt  
- I’m using `phi4` for generation and `nomic-embed-text` for embeddings — feel free to use any compatible model running locally with Ollama

<br />

```ts
import { ChatOllama, OllamaEmbeddings } from "@langchain/ollama";

const embeddings = new OllamaEmbeddings({ model: "nomic-embed-text" });
const model = new ChatOllama({ model: "phi4" });
```

---

### Extract the Recipe from YouTube

`YoutubeLoader` processes the YouTube link and extracts the full transcript (from closed captions or auto-generated subtitles) into a raw document format.

<br />

```ts
import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";

const loader = new YoutubeLoader(videoUrl);
const rawDocuments = await loader.load();
```

---

### Split the Raw Docs into Chunks

Why split it? LLMs can only handle a limited amount of text at once — breaking the content into smaller chunks helps the model focus better and return smarter, more relevant answers.

Here’s how I’m doing it: 

```ts
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1500,
  chunkOverlap: 200,
});

const documents = await splitter.splitDocuments(rawDocuments);
```
<br />

I'm still learning how to tune these — **it often takes a bit of trial and error to find what works best** depending on your content. For recipe videos, I found `1500/200` works reasonably well, but feel free to experiment.

 - `chunkSize` defines how big each chunk of text should be (in characters). Bigger chunks give more context, but risk hitting token limits. Smaller ones are safer, but may lose meaning.
 - `chunkOverlap` ensures that some part of the previous chunk is included in the next. This helps maintain context between chunks, especially when ideas span across boundaries.

<br />

Here is how the extracted content looks:

![docs log 1](/assets/images/raw-docs-1.jpg)
![docs log 2](/assets/images/raw-docs-2.jpg)

---

### Create the Vector Store

This step creates a searchable vector database — it’s where all the processed chunks (from the transcript) are stored in an optimized format for retrieval.

```ts
vectorStore = await Chroma.fromDocuments(documents, embeddings, {
  collectionName: `youtube_${videoId}`,
});
```
<br />

**Why do we need this?**

Without a vector store, the LLM would have no structured way to search through the transcript. **You’d have to send the entire video transcript to the model every time — which isn’t scalable or efficient (and could exceed token limits fast)**.

By storing the chunks as embeddings in `ChromaDB`, we can later retrieve only the most relevant parts using similarity search — so the model gets the context it needs, without all the noise.

Think of it as setting up a smart “lookup zone” that we’ll query before generating answers.

---

### Build the Prompt Template

We define a prompt template to guide how the model should respond. It has two roles:

- The **system** message sets the rules for how the AI should behave
- The **human** message provides the actual user input (your question or request)

```ts
const questionAnsweringPrompt = ChatPromptTemplate.fromMessages([
  ["system", "Answer using only the sources below:\n\n{context}\nProvide the recipe in Markdown format"],
  ["human", "{input}"],
]);
```
<br />

**What’s `{context}` and `{input}`?**

`{context}` gets dynamically filled with the most relevant chunks from the YouTube transcript — the one we processed earlier. So the model’s response is grounded in actual video content, not random hallucinated stuff from the internet.

`{input}` is the user’s prompt — for example: “Give me the recipe in Swedish with metric units”

📝 I used Markdown as the output format here, but you can easily change it to HTML, React, or anything else that fits your use case.

---

### Time for the RAG Magic ✨

Now we wire up the actual **RAG (Retrieval-Augmented Generation) chain**:

```ts
const retriever = vectorStore.asRetriever();

const ragChain = await createStuffDocumentsChain({
  prompt: questionAnsweringPrompt,
  llm: model,
});
```
<br />

Here’s what this setup does:

 - Uses the `retriever` to find the most relevant transcript chunks (via semantic similarity)
 - Passes those `chunks` into the model along with your prompt
 - The `LLM` uses that focused context to generate a more accurate and useful response
 - **No hallucinations**, just grounded output based on actual video content.

---

### Stream the Response, Serve It Hot 🔥

Finally, we stream the generated output.

```ts
const stream = await ragChain.stream({ input: prompt, context });

let response = "";
for await (const chunk of stream) {
  response += chunk ?? "";
}
```
<br />

You now have the full answer, built from retrieved chunks and rendered as Markdown (or whatever you chose). Ready to display, copy, or even print and slap on your fridge.

![Recipe](/assets/images/app-2.jpg)


## Wrapping It Up ...

This whole thing was fully *vibe coded* — powered by chaotic back-and-forth prompting, questionable style choices, and a lot of “let’s see what happens.” The UI is rough, the CSS is screaming... but honestly? I’m pretty hyped about how it turned out. You get the idea 😉 ... 

**It solves a tiny but real problem for me** — turning global recipes into something I can actually cook (and convert!) — and **I got to learn a ton about AI along the way**.

**Next up:** surprising my fam and friends with some AI-curated, human-approved summer recipes.

**Happy summer**, and if you need me... I’m officially OOO and somewhere near a grill. 🍔🌞🔥
