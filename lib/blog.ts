import { getCollectionUrl } from "./payload";
import {
  convertLexicalToHTML,
  defaultHTMLConverters,
} from "@payloadcms/richtext-lexical/html";

export interface CmsAuthor {
  id: string;
  name: string;
}

export interface CmsMedia {
  id: string;
  url: string;
  filename: string;
  mimeType: string;
  width?: number;
  height?: number;
  alt?: string;
  caption?: string;
}

export interface CmsLexicalContent {
  root: {
    children: unknown[];
    direction: string | null;
    format: string;
    indent: number;
    type: string;
    version: number;
  };
}

export interface CmsPost {
  id: string;
  title: string;
  slug: string;
  content: CmsLexicalContent;
  excerpt?: string | null;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  authors: CmsAuthor[] | string[];
  populatedAuthors?: CmsAuthor[];
  cover?: CmsMedia | string;
  populatedCover?: CmsMedia;
  meta?: {
    title?: string;
    description?: string;
  };
}

export interface CmsPostResponse {
  docs: CmsPost[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page?: number;
  pagingCounter?: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage?: number | null;
  nextPage?: number | null;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string; // Serialized HTML
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  authors: CmsAuthor[];
  readingTime: number; // in minutes
  excerpt?: string;
  cover?: CmsMedia;
}

// In dev mode, bypass cache to always get fresh data
const fetchOptions: RequestInit =
  process.env.NODE_ENV === "development"
    ? { cache: "no-store" }
    : { next: { revalidate: 3600 } };

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const url = getCollectionUrl(
      "posts",
      "where[_status][equals]=published&depth=1&sort=-publishedAt"
    );

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }

    const data: CmsPostResponse = await response.json();

    return Promise.all(data.docs.map(transformPost));
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function getLatestPost(): Promise<BlogPost | null> {
  const posts = await getLatestPosts(1);
  return posts.length > 0 ? posts[0] : null;
}

export async function getLatestPosts(limit: number = 3): Promise<BlogPost[]> {
  try {
    const url = getCollectionUrl(
      "posts",
      `where[_status][equals]=published&depth=1&sort=-publishedAt&limit=${limit}`
    );

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      throw new Error(`Failed to fetch latest posts: ${response.statusText}`);
    }

    const data: CmsPostResponse = await response.json();
    return Promise.all(data.docs.map(transformPost));
  } catch (error) {
    console.error("Error fetching latest posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const url = getCollectionUrl(
      "posts",
      `where[slug][equals]=${slug}&where[_status][equals]=published&depth=1`
    );

    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.statusText}`);
    }
    
    const data: CmsPostResponse = await response.json();

    if (data.docs.length === 0) {
      return null;
    }
    return transformPost(data.docs[0]);
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

// Helper to serialize nested Lexical content synchronously
function serializeNestedContent(content: any, converters: any): string {
  if (!content || !content.root) return "";
  return convertLexicalToHTML({
    converters,
    data: content,
  });
}

export function serializeLexicalContent(content: CmsLexicalContent): string {
  try {

    // Merge default converters with custom block converters
    // Note: defaultHTMLConverters already includes HeadingHTMLConverter and HorizontalRuleHTMLConverter
    const converters: any = {
      ...defaultHTMLConverters,
      // Block converters are keyed by blockType in the blocks property
      blocks: {
        ...(defaultHTMLConverters as any).blocks,
        // Code block converter (synchronous)
        code: ({ node, converters: conv, nodesToHTML }: any) => {
          // node.fields contains the block data, including blockType
          const fields = node.fields || {};
          const { code, language = "typescript" } = fields;

          if (process.env.NODE_ENV === "development" && !code) {
            console.warn("Code block missing code field:", fields);
          }
          if (!code) return "";

          const escapedCode = String(code)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

          // Add data attributes for easier parsing while maintaining backward compatibility
          return `<pre class="not-prose" data-code-block="true"><code class="language-${language}" data-language="${language}">${escapedCode}</code></pre>`;
        },
        // Banner block converter (synchronous)
        banner: ({ node, converters: conv, nodesToHTML }: any) => {
          const fields = node.fields || {};
          const { content: bannerContent, style = "info" } = fields;

          if (process.env.NODE_ENV === "development" && !bannerContent) {
            console.warn("Banner block missing content field:", fields);
          }
          if (!bannerContent) return "";

          const contentHtml = serializeNestedContent(bannerContent, conv);
          const styleClasses: Record<string, string> = {
            info: "border-border bg-card",
            error: "border-error bg-error/30",
            success: "border-success bg-success/30",
            warning: "border-warning bg-warning/30",
          };

          return `<div class="mx-auto my-8 w-full"><div class="border py-3 px-6 flex items-center rounded ${
            styleClasses[style] || styleClasses.info
          }">${contentHtml}</div></div>`;
        },
        // Media block converter (synchronous)
        mediaBlock: ({ node, converters: conv, nodesToHTML }: any) => {
          const fields = node.fields || {};
          const { media, caption } = fields;

          if (process.env.NODE_ENV === "development" && !media) {
            console.warn("Media block missing media field:", fields);
          }

          let html = "<div>";

          if (media && typeof media === "object") {
            const mediaUrl = media.url || "";
            const alt = (media.alt || media.filename || "").replace(
              /"/g,
              "&quot;"
            );
            const captionText = caption
              ? serializeNestedContent(caption, conv)
              : "";

            html += `<img src="http://localhost:3001${mediaUrl}" alt="${alt}" class="border border-border mb-2 mt-2 aspect-video w-full rounded-md object-cover" />`;
            if (captionText) {
              html += `<div class="mt-6">${captionText}</div>`;
            }
          } 

          html += "</div>";
          return html;
        },
      },
      // Unknown node handler - logs and returns empty for debugging
      unknown: ({ node }: any) => {
        if (process.env.NODE_ENV === "development") {
          console.warn("Unknown node type in Lexical content:", {
            type: node.type,
            blockType: node.fields?.blockType,
            keys: Object.keys(node),
          });
        }
        return "";
      },
    };

    const html = convertLexicalToHTML({
      converters,
      data: content as any,
    });

    // Debug: Log if HTML is empty but content exists
    if (
      process.env.NODE_ENV === "development" &&
      !html &&
      content?.root?.children?.length > 0
    ) {
      console.warn("Serialized HTML is empty but content has children:", {
        childrenTypes: content.root.children.map((c: any) => ({
          type: c.type,
          blockType: c.fields?.blockType,
        })),
      });
    }

    return html;
  } catch (error) {
    console.error("Error serializing Lexical content:", error);
    // Log the error details in development
    if (process.env.NODE_ENV === "development") {
      console.error(
        "Content that failed to serialize:",
        JSON.stringify(content, null, 2)
      );
      if (error instanceof Error) {
        console.error("Error stack:", error.stack);
      }
    }
    return "";
  }
}

async function transformPost(post: CmsPost): Promise<BlogPost> {
  const serializedContent = serializeLexicalContent(post.content);

  // Calculate reading time from serialized HTML (strip HTML tags for text)
  const textContent = serializedContent.replace(/<[^>]*>/g, " ").trim();
  const wordCount = textContent
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
  // Average reading speed: 200 words per minute
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  // Prefer CMS-provided excerpt; fallback to auto-generated from content
  const cmsExcerpt =
    typeof post.excerpt === "string" ? post.excerpt.trim() : "";
  const autoExcerpt = textContent.substring(0, 200).replace(/\s+/g, " ");
  const finalExcerpt =
    cmsExcerpt ||
    (autoExcerpt.length < textContent.length
      ? `${autoExcerpt}...`
      : autoExcerpt);

  // Handle authors (can be populated objects or IDs)
  const authors: CmsAuthor[] =
    post.populatedAuthors ||
    (Array.isArray(post.authors) && typeof post.authors[0] === "object"
      ? (post.authors as CmsAuthor[])
      : []);

  // Handle cover (can be populated object or ID)
  const cover: CmsMedia | undefined =
    post.populatedCover ||
    (post.cover && typeof post.cover === "object"
      ? (post.cover as CmsMedia)
      : undefined);

  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    content: serializedContent,
    publishedAt: post.publishedAt,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    authors,
    readingTime: readingTimeMinutes,
    excerpt: finalExcerpt,
    cover,
  };
}

export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await getAllPosts();
  return posts.map((post) => post.slug);
}
