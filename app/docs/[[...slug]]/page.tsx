import { Metadata } from "next";
import Link from "next/link";
import { DocsSidebar } from "@/components/docs-sidebar";

export const metadata: Metadata = {
  title: "Docs - Dmytro Morar",
  description: "Documentation and guides by Dmytro Morar.",
};

const sections = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Quick Start", href: "/docs/quick-start" },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      { title: "Architecture", href: "/docs/architecture" },
      { title: "Configuration", href: "/docs/configuration" },
      { title: "Best Practices", href: "/docs/best-practices" },
    ],
  },
  {
    title: "Advanced",
    items: [
      { title: "Performance", href: "/docs/performance" },
      { title: "Testing", href: "/docs/testing" },
      { title: "Deployment", href: "/docs/deployment" },
    ],
  },
];

const docsContent: Record<
  string,
  { title: string; content: string }
> = {
  "": {
    title: "Introduction",
    content: `
Welcome to my documentation. Here you'll find guides, tutorials, and reference material for various topics I've written about.

## What's Here

This documentation covers various technical topics including:

- **Development guides** - Step-by-step tutorials for common tasks
- **Architecture patterns** - Best practices for building scalable applications
- **Tool configurations** - How to set up and configure development tools

## Navigation

Use the sidebar to navigate between different sections. Each section contains related articles organized by topic.

## Contributing

If you find any errors or have suggestions for improvement, feel free to open an issue on GitHub.
    `,
  },
  installation: {
    title: "Installation",
    content: `
This guide covers how to set up your development environment.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18 or later
- npm or yarn package manager
- Git

## Installation Steps

1. Clone the repository:

\`\`\`bash
git clone https://github.com/username/project.git
cd project
\`\`\`

2. Install dependencies:

\`\`\`bash
npm install
\`\`\`

3. Start the development server:

\`\`\`bash
npm run dev
\`\`\`

## Verification

After installation, open http://localhost:3000 in your browser to verify everything is working correctly.
    `,
  },
  "quick-start": {
    title: "Quick Start",
    content: `
Get up and running in under 5 minutes with this quick start guide.

## Create a New Project

The fastest way to get started is using the project template:

\`\`\`bash
npx create-next-app@latest my-project
cd my-project
npm run dev
\`\`\`

## Project Structure

Your new project will have the following structure:

\`\`\`
my-project/
├── app/
│   ├── components/
│   ├── pages/
│   └── layout.tsx
├── public/
└── package.json
\`\`\`

## Next Steps

Now that you have a running project, explore the following:

1. Read the Architecture guide to understand the project structure
2. Check out the Configuration options
3. Learn about Best Practices for development
    `,
  },
  architecture: {
    title: "Architecture",
    content: `
This section covers the architectural patterns and decisions used in modern web applications.

## Component Architecture

Modern React applications use a component-based architecture where UI is broken down into reusable, composable pieces.

## State Management

Choose the right state management solution based on your application's needs.
    `,
  },
  configuration: {
    title: "Configuration",
    content: `
Learn how to configure your development environment and tools.

## Environment Variables

Set up environment variables for different environments.
    `,
  },
  "best-practices": {
    title: "Best Practices",
    content: `
Follow these best practices to write maintainable and scalable code.

## Code Organization

Keep your code organized and follow consistent patterns.
    `,
  },
  performance: {
    title: "Performance",
    content: `
Optimize your application for better performance.

## Performance Tips

Learn techniques to improve your application's performance.
    `,
  },
  testing: {
    title: "Testing",
    content: `
Write effective tests for your application.

## Testing Strategies

Learn different testing strategies and when to use them.
    `,
  },
  deployment: {
    title: "Deployment",
    content: `
Deploy your application to production.

## Deployment Options

Explore different deployment platforms and strategies.
    `,
  },
};

export default function Docs({
  params,
}: {
  params: { slug?: string[] };
}) {
  const slug = params.slug?.join("/") || "";
  const doc = docsContent[slug] || docsContent[""];

  return (
    <div className="container-wide py-12 md:py-16">
      <div className="flex gap-12">
        <DocsSidebar sections={sections} />

        <div className="flex-1 min-w-0">
          <article className="prose">
            <h1>{doc.title}</h1>
            <div className="whitespace-pre-line">{doc.content}</div>
          </article>

          <div className="border-t mt-12 pt-6">
            <div className="flex items-center justify-between text-sm">
              <Link
                href="/docs"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Previous
              </Link>
              <Link
                href="/docs/installation"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Next →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

