---
# src/index.md
layout: layouts/base.njk
title: Home
description: Welcome to my modern Eleventy blog
---

<div class="prose lg:prose-xl dark:prose-invert mx-auto">
  <h1 class="text-4xl font-bold mb-6">Welcome to My Eleventy Blog</h1>
  
  <p class="text-xl text-secondary-700 dark:text-secondary-300 mb-8">
    A modern, responsive blog built with Eleventy and Tailwind CSS.
  </p>
  
  <h2 class="text-2xl font-semibold mb-4">Recent Posts</h2>
  
  <div class="grid gap-6 mt-6">
    {% set postslist = collections.posts | head(3) %}
    {% for post in postslist %}
      <article class="bg-white dark:bg-secondary-800 rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-[1.01]">
        <a href="{{ post.url }}" class="block p-6 no-underline">
          <h3 class="text-xl font-semibold mb-2 text-secondary-900 dark:text-white">{{ post.data.title }}</h3>
          <time class="text-sm text-secondary-600 dark:text-secondary-400 mb-3 block" datetime="{{ post.date | dateToISO }}">
            {{ post.date | readableDate }}
          </time>
          <p class="text-secondary-700 dark:text-secondary-300">
            {{ post.data.description or post.templateContent | striptags | truncate(140) }}
          </p>
        </a>
      </article>
    {% endfor %}
  </div>
  
  <div class="mt-8 text-center">
    <a href="/posts/" class="inline-block bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-md font-medium transition-colors">
      View All Posts
    </a>
  </div>
</div>
