"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/esm/styles/prism";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import css from "react-syntax-highlighter/dist/esm/languages/prism/css";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import markdown from "react-syntax-highlighter/dist/esm/languages/prism/markdown";

// Register languages
SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("shell", bash);
SyntaxHighlighter.registerLanguage("markdown", markdown);

interface CodeBlockProps {
  code: string;
  language: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const normalizedLanguage = language.toLowerCase().replace(/^language-/, "");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div className="not-prose my-4 relative overflow-hidden rounded-lg border border-border">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 z-10 p-2 rounded-md bg-[#2E3440] hover:bg-[#3B4252] text-[#D8DEE9] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
        aria-label="Copy code"
        title="Copy code"
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </button>
      <SyntaxHighlighter
        language={normalizedLanguage || "text"}
        style={nord}
        customStyle={{
          background: "#2E3440",
          color: "#D8DEE9",
          fontFamily: "JetBrains Mono, monospace",
          fontSize: "1rem",
          lineHeight: "1.5",
          padding: "1rem",
          margin: 0,
        }}
        codeTagProps={{
          style: {
            fontFamily: "JetBrains Mono, var(--font-mono)",
          },
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
