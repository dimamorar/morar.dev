interface BlogContentProps {
  html: string;
}

export function BlogContent({ html }: BlogContentProps) {
  // Server-rendered HTML. No client-side parsing = no hydration-time tree shape changes.
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
