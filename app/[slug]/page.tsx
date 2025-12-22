import { getPostData, getAllPostSlugs } from '../../lib/posts';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ThemeToggle } from '../components/theme-toggle';

export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths.map((path) => ({
    slug: path.params.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const postData = await getPostData(slug);
  
  return {
    title: postData.title,
    description: postData.description || `Read ${postData.title}`,
    openGraph: {
      title: postData.title,
      description: postData.description || `Read ${postData.title}`,
      type: 'article',
      publishedTime: postData.date,
    },
  };
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const postData = await getPostData(slug);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <nav className="max-w-4xl mx-auto py-4 md:py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline font-mono">
          &larr; cd ..
        </Link>
        <ThemeToggle />
      </nav>
      <article className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <header className="mb-8 md:mb-12 border-b border-gray-200 dark:border-gray-800 pb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white tracking-tight">
            {postData.title}
          </h1>
          {postData.description && (
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
              {postData.description}
            </p>
          )}
          {postData.date && (
            <p className="text-gray-500 dark:text-gray-400 font-mono text-sm">
              Posted on {postData.date}
            </p>
          )}
        </header>
        <div
          className="prose md:prose-lg dark:prose-invert max-w-none font-sans prose-headings:font-bold prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-code:text-pink-600 dark:prose-code:text-pink-400 prose-pre:bg-gray-900 dark:prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </article>
    </div>
  );
}
