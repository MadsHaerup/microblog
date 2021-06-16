import { Layout } from '../sections/Layout'
import { signIn, useSession } from 'next-auth/client';
import Link from 'next/link';
import { BookOpenIcon, PencilIcon } from '@heroicons/react/outline';

export default function Home() {
  const [ session, loading ] = useSession()

  return (
    <>
      <Layout>
        <section className="flex flex-col justify-center items-center space-y-10 mt-12 sm:mt-24 md:mt-32">
          <div className="space-y-4 max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-7xl font-bold capitalize">
              <span className="block">The blogging platform</span>
              <span className="block">for devs</span>
            </h1>
            <h2 className="text-xl sm:text-2xl">Start your dev blog</h2>
          </div>
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          {loading ? null : !session ? (
            <button 
            type="button"
            onClick={signIn}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md border-2 border-blue-600 hover:border-blue-700 text-lg sm:text-xl focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 whitespace-nowrap"
            > start your blog for free
            </button>) : (
              <Link href="/">
              <a className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md border-2 border-blue-600 hover:border-blue-700 text-lg sm:text-xl focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 whitespace-nowrap">
                <PencilIcon className="w-6 h-6 flex-shrink-0 mr-2"/>
                <span>Write a blog post</span>
              </a>
              </Link>
            )}
            <Link href="/posts">
            <a className="w-full bg-transparent text-blue-600 px-6 py-3 rounded-md text-lg sm:text-xl border-2 border-blue-600 focus:outline-none whitespace-nowrap flex justify-center items-center space-x-2">
              <BookOpenIcon className="w-6 h-6 flex-shrink-0" />
              <span>Read the blog</span>
            </a>
          </Link>
        </div>
        </section>
      </Layout>
    </>
  )
}
