import fs from 'fs';
import path from 'path';

const docsDir = 'content/docs';
const files = fs.readdirSync(docsDir).filter(f => f.endsWith('.mdx'));

files.forEach(file => {
  if (file === 'index.mdx') return; // Skip - already has frontmatter

  const filepath = path.join(docsDir, file);
  const content = fs.readFileSync(filepath, 'utf-8');

  // Check if frontmatter already exists
  if (content.trim().startsWith('---')) return;

  // Generate title from filename
  const title = file
    .replace('.mdx', '')
    .replace(/-/g, ' ')
    .replace(/vs/g, 'vs.'); // Fix "vs" to "vs."

  // Extract description from first blockquote or paragraph
  const lines = content.split('\n');
  let description = '';

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('>')) {
      description = trimmed.replace(/^>\s*/, '').substring(0, 160);
      break;
    }
    if (trimmed && !trimmed.startsWith('#')) {
      description = trimmed.substring(0, 160);
      break;
    }
  }

  if (!description) {
    description = `Documentation for ${title}`;
  }

  const frontmatter = `---
title: "${title}"
description: "${description}"
---

`;

  fs.writeFileSync(filepath, frontmatter + content);
  console.log(`✓ Added frontmatter to ${file}`);
});

console.log('\nDone!');
