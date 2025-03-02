---
# src/pages/about.md
layout: layouts/page.njk
title: About
description: Learn more about this blog and its author
eleventyNavigation:
  key: About
  order: 2
---

# About This Blog

Welcome to my Eleventy blog, a place where I share my thoughts, experiences, and knowledge.

## About Me

I'm a passionate developer who loves creating beautiful, functional websites. I believe in clean code, accessibility, and performance.

## Technical Stack

This blog is built with:

```javascript
// The tech stack powering this blog
const techStack = {
  staticSiteGenerator: "Eleventy (11ty)",
  cssFramework: "Tailwind CSS",
  deployment: "Netlify",
  fontProvider: "Google Fonts",
  buildTools: "Node.js and Yarn"
};
```

## Why Eleventy?

Eleventy is a simple static site generator that supports a variety of template languages. It's fast, flexible, and perfect for blogs. Here are some of the benefits:

- **Performance**: Static sites are incredibly fast
- **Security**: No server-side code or databases to worry about
- **Flexibility**: Works with multiple templating languages
- **Simplicity**: Easy to understand and extend

## Contact

Feel free to reach out to me if you have any questions or would like to connect!

---
# src/posts/first-post.md
layout: layouts/post.njk
title: Getting Started with Eleventy
description: Learn how to build your first Eleventy site from scratch
date: 2025-03-01
tags:
  - eleventy
  - tutorial
  - jamstack
---

# Getting Started with Eleventy

Eleventy (11ty) is a simple static site generator that's perfect for blogs, documentation sites, and more. In this post, we'll go through the basics of setting up an Eleventy site.

## Installation

First, let's install Eleventy using npm or yarn:

```bash
# Using npm
npm install -g @11ty/eleventy

# Using yarn
yarn global add @11ty/eleventy
```

## Creating Your First Page

Create a new directory for your project and add a simple markdown file:

```markdown
# Hello World

This is my first Eleventy page!
```

## Running Eleventy

Now you can run Eleventy to build your site:

```bash
eleventy --serve
```

This will start a local server and you can view your site at `http://localhost:8080`.

## Adding Templates

Eleventy supports various template languages. Let's create a layout using Nunjucks:

```html



  
  {{ title }}


  
    {{ content | safe }}
  


```

## Conclusion

This is just the beginning of what you can do with Eleventy. In future posts, we'll explore more advanced features and techniques.

Happy coding!