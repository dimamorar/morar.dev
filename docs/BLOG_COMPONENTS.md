# Essential Lexical Nodes/Components for Blog Site

This document lists all essential Lexical nodes and components that are supported in the blog serialization.

## Core Text Nodes

### 1. Paragraph
- **Type**: `paragraph`
- **Converter**: Included in `defaultHTMLConverters`
- **Output**: `<p>...</p>`

### 2. Heading (h1-h4)
- **Type**: `heading`
- **Converter**: `HeadingHTMLConverter` (custom)
- **Output**: `<h1>...</h1>`, `<h2>...</h2>`, `<h3>...</h3>`, `<h4>...</h4>`
- **Implementation**:
```typescript
import { HeadingHTMLConverter } from '@payloadcms/richtext-lexical/html';
```

### 3. Horizontal Rule
- **Type**: `horizontalRule`
- **Converter**: `HorizontalRuleHTMLConverter` (custom)
- **Output**: `<hr />`
- **Implementation**:
```typescript
import { HorizontalRuleHTMLConverter } from '@payloadcms/richtext-lexical/html';
```

### 4. Text Formatting
- **Bold**: `<strong>...</strong>` (default)
- **Italic**: `<em>...</em>` (default)
- **Underline**: `<u>...</u>` (default)

### 5. Link
- **Type**: `link`
- **Converter**: Included in `defaultHTMLConverters`
- **Output**: `<a href="...">...</a>`
- **Supports**: Internal links (to posts/pages) and external URLs

## Block Nodes

Block nodes are custom content blocks that can be inserted into the rich text editor.

### 6. Code Block
- **Type**: `block` with `blockType: 'code'`
- **Converter**: Custom converter in `blocks.code`
- **Fields**:
  - `code` (string, required): The code content
  - `language` (string, optional): Programming language (default: 'typescript')
- **Output**:
```html
<pre class="not-prose">
  <code class="language-{language}">{escapedCode}</code>
</pre>
```
- **Implementation**:
```typescript
blocks: {
  code: async ({ node, converters }) => {
    const { code, language = 'typescript' } = node.fields || {};
    const escapedCode = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
    return `<pre class="not-prose"><code class="language-${language}">${escapedCode}</code></pre>`;
  }
}
```

### 7. Banner Block
- **Type**: `block` with `blockType: 'banner'`
- **Converter**: Custom converter in `blocks.banner`
- **Fields**:
  - `content` (LexicalContent, required): Rich text content for the banner
  - `style` (string, optional): Banner style - 'info', 'warning', 'error', 'success' (default: 'info')
- **Output**:
```html
<div class="mx-auto my-8 w-full">
  <div class="border py-3 px-6 flex items-center rounded {styleClass}">
    {serializedContent}
  </div>
</div>
```
- **Style Classes**:
  - `info`: `border-border bg-card`
  - `error`: `border-error bg-error/30`
  - `success`: `border-success bg-success/30`
  - `warning`: `border-warning bg-warning/30`

### 8. Media Block
- **Type**: `block` with `blockType: 'mediaBlock'`
- **Converter**: Custom converter in `blocks.mediaBlock`
- **Fields**:
  - `media` (object, optional): Media object with `url`, `alt`, `filename`
  - `caption` (LexicalContent, optional): Rich text caption
- **Output**:
```html
<div>
  <img src="{mediaUrl}" alt="{alt}" class="border border-border rounded-[0.8rem]" />
  {caption ? `<div class="mt-6">${captionHtml}</div>` : ''}
</div>
```

## Implementation Location

All converters are implemented in:
- **File**: `/Users/apple/Projects/5_morar.dev/lib/blog.ts`
- **Function**: `serializeLexicalContent(content: CmsLexicalContent)`

## Usage Example

```typescript
import { serializeLexicalContent } from '@/lib/blog';

const html = await serializeLexicalContent(lexicalContent);
// Returns serialized HTML string with all nodes converted
```

## Adding New Block Types

To add a new block type:

1. Add converter to `blocks` object in `serializeLexicalContent`:
```typescript
blocks: {
  yourBlockType: async ({ node, converters }) => {
    const { field1, field2 } = node.fields || {};
    // Convert to HTML
    return '<div>...</div>';
  }
}
```

2. Ensure the block is registered in the CMS (5.1_cms) `BlocksFeature`

## Notes

- All nested Lexical content (e.g., in banners, media captions) is recursively serialized
- Code blocks escape HTML entities to prevent XSS
- Media URLs should be absolute or relative to the CMS base URL
- Unknown block types are logged in development mode and skipped

