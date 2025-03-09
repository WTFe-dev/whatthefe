---
title: ls-lint - File & Folder Naming, Sorted!
description: ls-lint - File & Folder Naming, Sorted!
date: 2025-03-09
tags:
  - frontend
  - tooling
  - best-practices
  - dx
  - fe
---

# ls-lint: File & Folder Naming, Sorted!

In the wild west of frontend development, everyone seems to follow their own rules—one team prefers `camelCase`, another swears by `PascalCase`, and then there’s that one dev who names files like `randomStuff/ComponentFolder` or `main_file.tsx`. **The inconsistency is real!**

Navigating a large codebase shouldn't feel like deciphering ancient scripts. Enter **ls-lint**—the tool you never knew you needed, but now won’t be able to live without!

## What is ls-lint?
[ls-lint](https://ls-lint.org) is a blazing-fast file and directory name linter that enforces naming conventions, ensuring your project structure remains consistent and organized. This is especially valuable in enterprise environments where multiple teams work on projects within the same tech stack.

## Why ls-lint is a Game-Changer:

- **Enforce naming** – Works for directory and file names - all extensions supported - full Unicode support.
- **Easily target extensions** - Apply rules to specific file types while ignoring others.
- **Simple setup** – Minimal setup with simple rules managed in one single or multiple `.ls-lint.yml` files.
- **Performance** – Super fast, running instantly on even large projects.
- **Learn more** – Full documentation [here](https://ls-lint.org/2.3/getting-started/introduction.html#key-facts).

## How to Use ls-lint?

### 1. Install ls-lint

```sh
npm install --save-dev @ls-lint
```

### 2. Create a .ls-lint.yml file

Your ls-lint configuration should be located in a `.ls-lint.yml` file in your project root directory. This file provides two main options:

- **ls:** Defines the structure of your project directories, specifying rules for extensions, sub-extensions, and directories.
- **ignore:** Allows you to exclude specific files and directories from the linting process.

<br />

```yaml
ls:
    ...

ignore:
    ...
```

### 3. Setting up the rules

Here are some example rules to standardize how `React` components are structured. This configuration ensures consistency in the `src/components/` folder using standard glob patterns.

```yaml
ls:
  src/components/*/:
    .dir: PascalCase          # Folders must be PascalCase
    .module.scss: PascalCase  # SCSS module files must be PascalCase
    .tsx: PascalCase          # React components (.tsx) must be PascalCase
    .test.tsx: PascalCase     # Test files (.test.tsx) must be PascalCase
    .ts: camelCase            # Other TypeScript files should use camelCase

ignore:
  - node_modules  # Ignore dependencies
```

### **Good vs Bad Examples**

Here’s a comparison of good and bad naming conventions for a `Foobar` React component:

✅ **Good:**
```
src/components/Foobar/
  ├── Foobar.tsx
  ├── Foobar.module.scss
  ├── Foobar.test.tsx
  ├── index.ts
```
<br />

❌ **Bad:**
```
src/components/foobarComponent/
  ├── foobar_component.tsx
  ├── foobar_component.test.tsx
  ├── Index.ts
```

### **How Errors Look in ls-lint**

Run `npx ls-lint` from the root. If a file or folder doesn’t match the expected rules, `ls-lint` will throw an error. Here’s an example:

```
ERROR: "src/components/foobar_component" failed for .dir rules: PascalCase
ERROR: "src/components/foobarComponent/foobar_component.tsx" failed for .tsx rules: PascalCase
ERROR: "src/components/foobarComponent/foobar_component.test.tsx" failed for .test.tsx rules: PascalCase
ERROR: "src/components/foobarComponent/Index.tsx" failed for .ts rules: camelCase
```

### **Key Takeaways:**

- **`.dir: PascalCase`** → All directories must follow PascalCase.
- **`.module.scss: PascalCase`** → SCSS module files must use PascalCase.
- **`.tsx: PascalCase`** → React component files (.tsx) must follow PascalCase.
- **`.test.tsx: PascalCase`** → Test files (.test.tsx) must also use PascalCase.
- **`.ts: camelCase`** → Regular TypeScript files should be in camelCase.

### **Ignored Files (ignore section)**

- The `node_modules` directory is completely ignored by `ls-lint`.
- Instead of using PascalCase, you can define your own patterns using regex. Read more about the rules [here](https://ls-lint.org/2.3/configuration/the-rules.html).


## **Cons of ls-lint**

Every great tool has its drawbacks, and `ls-lint` is no exception. Here are a couple of things to keep in mind:

- **YAML-Only Configuration** – Unlike ESLint, which supports JS and JSON formats, `ls-lint` only uses `.yml` for configuration. This may feel less familiar or convenient for frontend developers used to JSON-based tooling.
- **No Custom Error Messages** – Unlike tools like [`eslint-plugin-check-file`](https://github.com/dukeluo/eslint-plugin-check-file), `ls-lint` does not support custom error messages. This means you're limited to its default error outputs, which can sometimes be harder to interpret.

<br />

And there you have it—**ls-lint, the sheriff your file names didn’t know they needed! 🤠**

No more chaotic file names, no more endless debates in code reviews. Set your rules, run `ls-lint`, and let it handle the nitpicking—so you can focus on building cool stuff.

**Happy Reading!**

