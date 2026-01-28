import Link from 'next/link';
import { getSortedPostsData } from '../lib/posts';
import { ThemeToggle } from './components/theme-toggle';

export default function BlogIndex() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="max-w-4xl mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8 font-mono">
      <div className="flex justify-between items-center mb-8 md:mb-12 border-b-2 border-gray-200 dark:border-gray-700 pb-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          /var/log/blog
        </h1>
        <ThemeToggle />
      </div>
      <div className="grid gap-6">
        {allPostsData.map(({ slug, title, date, description, draft }) => (
          <Link
            key={slug}
            href={`/${slug}`}
            className="group block p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-200"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2 sm:gap-0">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {title}
              </h2>
              <div className="flex gap-2 items-center">
                {draft === true && (
                  <span className="text-xs font-mono text-yellow-800 dark:text-yellow-200 bg-yellow-100 dark:bg-yellow-900 px-2 py-1 rounded w-fit">
                    DRAFT
                  </span>
                )}
                {date && (
                  <span className="text-xs font-mono text-gray-500 dark:text-gray-500 bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded w-fit">
                    {date}
                  </span>
                )}
              </div>
            </div>
            {description && (
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                {description}
              </p>
            )}
            <div className="text-sm text-gray-600 dark:text-gray-400 font-mono">
              Read more_
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
