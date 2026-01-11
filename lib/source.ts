import { loader } from 'fumadocs-core/source';
import type { LoaderConfig, LoaderOutput } from 'fumadocs-core/source';

// Temporary workaround: Create a basic source without fumadocs-mdx
// This will allow the build to succeed, but won't render the full MDX content
// We'll need to upgrade Next.js or use a different approach for full functionality

const source: LoaderOutput = {
  getPage: (slugs?: string[]) => {
    // Placeholder - will need to implement proper MDX loading
    return null as any;
  },
  getPages: () => {
    // Placeholder - will return empty array for now
    return [];
  },
  pageTree: {
    name: 'Docs',
    children: [],
  },
};

export { source };
