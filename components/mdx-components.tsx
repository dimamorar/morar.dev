import type { ReactElement, ReactNode } from "react";
import { isValidElement } from "react";
import { CodeBlock } from "./code-block";
import type { MDXComponents } from "mdx/types";

const extractText = (node: unknown): string => {
  if (node == null) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (isValidElement(node)) {
    const element = node as ReactElement<{ children?: ReactNode }>;
    return extractText(element.props.children);
  }
  if (typeof node === "object" && "value" in (node as any)) {
    return String((node as any).value);
  }
  return "";
};

export const mdxComponents: MDXComponents = {
  // Code blocks - use existing CodeBlock component
  pre: ({ children, ...props }: any) => {
    // Extract code and language from MDX structure
    const code = extractText(children?.props?.children);
    const className = children?.props?.className || "";
    const language = className.replace("language-", "") || "text";

    return <CodeBlock code={code} language={language} />;
  },

  // Blockquotes - styled for definitions/emphasis
  blockquote: ({ children }: any) => (
    <blockquote className="border-l-4 border-accent pl-4 italic my-4 text-muted-foreground">
      {children}
    </blockquote>
  ),

  // Headings - preserve emoji, add proper spacing
  h1: ({ children }: any) => (
    <h1 className="text-3xl font-bold mt-8 mb-4 tracking-tight">{children}</h1>
  ),

  // Headings - preserve emoji, add proper spacing
  h2: ({ children }: any) => (
    <h2 className="text-2xl font-bold mt-8 mb-4 tracking-tight">{children}</h2>
  ),

  h3: ({ children }: any) => (
    <h3 className="text-xl font-semibold mt-6 mb-3 tracking-tight">
      {children}
    </h3>
  ),

  // Tables - responsive wrapper
  table: ({ children }: any) => (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full border-collapse">{children}</table>
    </div>
  ),
};
