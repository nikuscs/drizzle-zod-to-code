# Drizzle Zod To Code

![Logo](./.github/logo.png)

Generate JavaScript/TypeScript code for Drizzle Zod schemas

[![npm](https://img.shields.io/npm/v/@lucaconlaq/drizzle-zod-to-code)](https://www.npmjs.com/package/@lucaconlaq/zod-to-code)
[![biome](https://img.shields.io/badge/code_style-biome-56BEB8)](https://biomejs.dev)
[![vitest](https://img.shields.io/badge/tested_with-vitest-6E9FEC)](https://vitest.dev)

---

## ✨ What does it do

This library was born in response to a recurring need discussed in [drizzle-orm issue #941](https://github.com/drizzle-team/drizzle-orm/issues/941): generating static validation schemas (i.e. Zod) from Drizzle ORM models without bundling Drizzle into the client.

- 🔄 It extracts schema logic from your Drizzle models and outputs Zod code using [`zod-to-code`](https://www.github.com/lucaconlaq/zod-to-code).
- 🔐 This keeps your frontend secure by removing ORM logic from client builds.
- 🧩 Great for full-stack apps that share validation between backend and frontend.

---

## ⚠️ Why dynamic Zod is not ideal

Dynamic (runtime-generated) Zod schemas come with serious two major drawbacks:

- 🧱 **Not tree-shakeable** – They pull in all of Drizzle, bloating your frontend.
- 🔐 **Security risk** – ORM logic exposed on the client increases attack surface.

Static generation solves all of this. That’s what `drizzle-zod-to-code` does.

---

## 🚀 Installation

```bash
npm i @lucaconlaq/drizzle-zod-to-code
```

---
