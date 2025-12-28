import { getCollectionUrl } from './payload';
import { convertLexicalToHTML, defaultHTMLConverters } from '@payloadcms/richtext-lexical';

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
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  authors: CmsAuthor[] | string[];
  populatedAuthors?: CmsAuthor[];
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
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const url = getCollectionUrl(
      'posts',
      'where[_status][equals]=published&depth=1&sort=-publishedAt'
    );

    const response = await fetch(url, {
      next: { revalidate: 3600 },
    } as RequestInit);

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }

    const data: CmsPostResponse = await response.json();
    
    return Promise.all(data.docs.map(transformPost));
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}


export async function getLatestPost(): Promise<BlogPost | null> {
  try {
    const url = getCollectionUrl(
      'posts',
      'where[_status][equals]=published&depth=1&sort=-publishedAt&limit=1'
    );

    const response = await fetch(url, {
      next: { revalidate: 3600 },
    } as RequestInit);

    if (!response.ok) {
      throw new Error(`Failed to fetch latest post: ${response.statusText}`);
    }

    const data: CmsPostResponse = await response.json();
    
    if (data.docs.length === 0) {
      return null;
    }

    return transformPost(data.docs[0]);
  } catch (error) {
    console.error('Error fetching latest post:', error);
    return null;
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const url = getCollectionUrl(
      'posts',
      `where[slug][equals]=${slug}&where[_status][equals]=published&depth=1`
    );

    const response = await fetch(url, {
      next: { revalidate: 3600 },
    } as RequestInit);

    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.statusText}`);
    }

    const data: CmsPostResponse = await response.json();
    
    if (data.docs.length === 0) {
      return null;
    }

    return transformPost(data.docs[0]);
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function serializeLexicalContent(content: CmsLexicalContent): Promise<string> {
  try {
    const html = await convertLexicalToHTML({
      converters: defaultHTMLConverters,
      data: content as any,
    });
    return html;
  } catch (error) {
    console.error('Error serializing Lexical content:', error);
    return '';
  }
}

async function transformPost(post: CmsPost): Promise<BlogPost> {
  const serializedContent = await serializeLexicalContent(post.content);
  
  // Calculate reading time from serialized HTML (strip HTML tags for text)
  const textContent = serializedContent.replace(/<[^>]*>/g, ' ').trim();
  const wordCount = textContent.split(/\s+/).filter(word => word.length > 0).length;
  // Average reading speed: 200 words per minute
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));
  
  // Extract excerpt from content (first 200 characters of text)
  const excerpt = textContent.substring(0, 200).replace(/\s+/g, ' ');
  
  // Handle authors (can be populated objects or IDs)
  const authors: CmsAuthor[] = post.populatedAuthors || 
    (Array.isArray(post.authors) && typeof post.authors[0] === 'object' 
      ? post.authors as CmsAuthor[] 
      : []);

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
    excerpt: excerpt.length < textContent.length ? `${excerpt}...` : excerpt,
  };
}

export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await getAllPosts();
  return posts.map(post => post.slug);
}

