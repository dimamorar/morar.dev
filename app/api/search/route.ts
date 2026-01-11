import { source } from '@/lib/source';
import { createSearchAPI } from 'fumadocs-core/search/server';

export const { GET } = createSearchAPI('advanced', {
  indexes: source.getPages().map((page) => ({
    id: page.url,
    title: page.data.title || 'Untitled',
    description: page.data.description || '',
    url: page.url,
    structuredData: {
      headings: [],
      contents: [],
    },
  })),
});
