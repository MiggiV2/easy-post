import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

const postsDirectory = path.join(process.cwd(), 'content');

export interface PostData {
  slug: string;
  title: string;
  date?: string;
  contentHtml?: string;
  [key: string]: any;
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export function getSortedPostsData(): PostData[] {
  // Get file names under /content
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const slug = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Fallback title if not in frontmatter
    let title = matterResult.data.title;
    if (!title) {
      const firstLine = matterResult.content.split('\n')[0];
      title = firstLine.replace(/^#\s+/, '') || slug;
    }

    return {
      slug,
      title,
      ...matterResult.data,
    };
  });
  
  return allPostsData;
}

export async function getPostData(slug: string): Promise<PostData & { contentHtml: string }> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(remarkGfm)
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  let title = matterResult.data.title;
  if (!title) {
      const firstLine = matterResult.content.split('\n')[0];
      title = firstLine.replace(/^#\s+/, '') || slug;
  }

  return {
    slug,
    contentHtml,
    title,
    ...matterResult.data,
  };
}
