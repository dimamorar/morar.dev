import { source } from '@/lib/source';
import { DocsPage, DocsBody } from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { mdxComponents } from '@/components/mdx-components';

export default async function Page({
  params,
}: {
  params: { slug?: string[] };
}) {
  const page = source.getPage(params.slug);

  if (!page) notFound();

  const MDX = page.data.exports.default;

  return (
    <DocsPage toc={page.data.exports.toc}>
      <DocsBody>
        <h1>{page.data.title}</h1>
        <MDX components={mdxComponents} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.getPages().map((page) => ({
    slug: page.slugs,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug?: string[] };
}): Promise<Metadata> {
  const page = source.getPage(params.slug);

  if (!page) {
    return {
      title: 'Page Not Found',
    };
  }

  return {
    title: `${page.data.title} - Dmytro Morar`,
    description: page.data.description,
  };
}
