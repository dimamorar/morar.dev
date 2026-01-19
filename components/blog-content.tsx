"use client";

import parse, { type DOMNode, type Element } from "html-react-parser";
import { CodeBlock } from "./code-block";
import { ImageWithSkeleton } from "./image-with-skeleton";

interface BlogContentProps {
  html: string;
}

const extractText = (node: DOMNode): string => {
  if (node.type === "text") {
    return "data" in node && typeof node.data === "string" ? node.data : "";
  }
  if ("children" in node && Array.isArray(node.children)) {
    return node.children.map((child) => extractText(child as DOMNode)).join("");
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

const parseDimension = (value?: string): number | undefined => {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

export function BlogContent({ html }: BlogContentProps) {
  const content = parse(html, {
    replace: (node) => {
      if (node.type !== "tag") return;
      const element = node as Element;
      if (element.name === "img") {
        const width = parseDimension(element.attribs?.width);
        const height = parseDimension(element.attribs?.height);
        const loading =
          (element.attribs?.loading as "eager" | "lazy") || "lazy";

        return (
          <ImageWithSkeleton
            src={element.attribs?.src || ""}
            alt={element.attribs?.alt || ""}
            width={width}
            height={height}
            className={element.attribs?.class}
            loading={loading}
            sizes="100vw"
          />
        );
      }
      if (element.name !== "pre") return;

      const codeChild = element.children.find(
        (child) => child.type === "tag" && (child as Element).name === "code"
      ) as Element | undefined;

      if (!codeChild) return;

      const language = getLanguage(codeChild.attribs?.class);
      const code = codeChild.children
        .map((child) => extractText(child as DOMNode))
        .join("");
      return <CodeBlock code={code} language={language} />;
    },
  });

  return <div>{content}</div>;
}
