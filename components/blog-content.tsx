"use client";

import { useMemo } from "react";
import { CodeBlock } from "./code-block";

interface ContentSegment {
  type: "html" | "code";
  content: string;
  language?: string;
}

interface BlogContentProps {
  html: string;
}

export function BlogContent({ html }: BlogContentProps) {
  const segments = useMemo(() => {
    const result: ContentSegment[] = [];
    let lastIndex = 0;

    // Regex to match <pre class="not-prose"><code class="language-xyz">...</code></pre>
    // Also supports data attributes: <pre data-code-block="true"><code data-language="xyz">...</code></pre>
    const codeBlockRegex =
      /<pre\s+(?:class="not-prose"|data-code-block="true")[^>]*><code[^>]*(?:class="language-([^"]+)"|data-language="([^"]+)")[^>]*>([\s\S]*?)<\/code><\/pre>/g;

    let match;
    while ((match = codeBlockRegex.exec(html)) !== null) {
      // Add HTML segment before this code block
      if (match.index > lastIndex) {
        result.push({
          type: "html",
          content: html.substring(lastIndex, match.index),
        });
      }

      // Extract language from either class="language-xyz" (match[1]) or data-language="xyz" (match[2])
      const language = match[1] || match[2] || "text";
      const escapedCode = match[3];

      // Unescape HTML entities
      const code = escapedCode
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&#x27;/g, "'")
        .replace(/&#x2F;/g, "/");

      result.push({
        type: "code",
        content: code,
        language,
      });

      lastIndex = match.index + match[0].length;
    }

    // Add remaining HTML after last code block
    if (lastIndex < html.length) {
      result.push({
        type: "html",
        content: html.substring(lastIndex),
      });
    }

    // If no code blocks found, return entire HTML as single segment
    if (result.length === 0) {
      result.push({
        type: "html",
        content: html,
      });
    }

    return result;
  }, [html]);

  return (
    <>
      {segments.map((segment, index) => {
        if (segment.type === "code") {
          return (
            <CodeBlock
              key={`code-${index}`}
              code={segment.content}
              language={segment.language || "text"}
            />
          );
        }

        return (
          <div
            key={`html-${index}`}
            dangerouslySetInnerHTML={{ __html: segment.content }}
          />
        );
      })}
    </>
  );
}
