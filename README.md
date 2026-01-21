# Easy Post 📝

A modern, clean, Static Site Generated (SSG) blog engine built for IT Nerds. 
Designed to be simple, fast, and content-focused. No database required—just Markdown.

## 🚀 Features

- **Markdown-First**: Write your posts in Markdown, drop them in the `/content` directory.
- **Static Site Generation**: Built with Next.js 16 for optimal performance, served via Nginx.
- **Modern Styling**: Clean, minimalist aesthetic using Tailwind CSS 4 and `@tailwindcss/typography`.
- **Zero Database**: No database setup or maintenance. Your file system is your CMS.
- **Syntax Highlighting**: Ready for code snippets and technical content.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Markdown Processing**: `remark`, `remark-html`, `gray-matter`
- **Package Manager**: [pnpm](https://pnpm.io/)

## 📂 Project Structure

```
easy-post/
├── app/                # Next.js App Router pages
│   ├── blog/           # Blog routes
│   │   ├── page.tsx    # /blog (Overview)
│   │   └── [slug]/     # /blog/[slug] (Individual Post)
├── content/            # Markdown blog posts go here
├── lib/                # Utility functions (markdown parsing)
├── public/             # Static assets
└── ...
```

## ⚡ Getting Started

### Prerequisites

- Node.js (LTS recommended)
- pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd easy-post
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000/blog](http://localhost:3000/blog) to see your blog.

## 🐳 Docker

Build and run the static site with Docker and Nginx:

1. Build the image:
   ```bash
   docker build -t easy-post .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 easy-post
   ```

3. Open [http://localhost:3000/blog](http://localhost:3000/blog).

## ✍️ Adding Content

1. Create a new Markdown file in the `content/` directory (e.g., `hello-world.md`).
2. Add frontmatter at the top of the file:
   ```markdown
   ---
   title: "Hello World"
   date: "2023-10-27"
   description: "My first post on Easy Post."
   ---
   
   # Welcome
   
   This is my first blog post using **Easy Post**.
   ```
3. The post will automatically appear at `/blog/hello-world`.

## 📜 License

MIT
