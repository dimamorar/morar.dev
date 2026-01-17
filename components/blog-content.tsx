"use client";

import parse, { type DOMNode, type Element } from "html-react-parser";
import { CodeBlock } from "./code-block";

interface BlogContentProps {
  html: string;
}

const extractText = (node: DOMNode): string => {
  if (node.type === "text") {
    return (node as unknown as { data?: string }).data ?? "";
  }
  if ("children" in node && Array.isArray(node.children)) {
    return node.children.map(extractText).join("");
  }
  return "";
};

const getLanguage = (className?: string): string => {
  if (!className) return "text";
  const languageClass = className
    .split(" ")
    .find((name) => name.startsWith("language-"));
  return languageClass ? languageClass.replace("language-", "") : "text";
};

export function BlogContent({ html }: BlogContentProps) {
  const content = parse(html, {
    replace: (node) => {
      if (node.type !== "tag") return;
      const element = node as Element;
      if (element.name !== "pre") return;

      const codeChild = element.children.find(
        (child) => child.type === "tag" && (child as Element).name === "code"
      ) as Element | undefined;

      if (!codeChild) return;

      const language = getLanguage(codeChild.attribs?.class);
      const code = codeChild.children.map(extractText).join("");
      return <CodeBlock code={code} language={language} />;
    },
  });

  return <div>{content}</div>;
}
