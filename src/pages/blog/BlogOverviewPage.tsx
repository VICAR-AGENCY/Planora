import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Clock, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { blogPosts, type BlogPost } from '@/lib/blog/posts'

const categories = [
  { key: 'alles', label: 'Alles' },
  { key: 'warmtepompen', label: 'Warmtepompen' },
  { key: 'ramen-deuren', label: 'Ramen & Deuren' },
  { key: 'dakisolatie', label: 'Dakisolatie' },
  { key: 'tips', label: 'Tips' },
  { key: 'premies', label: 'Premies' },
] as const

const categoryLabels: Record<BlogPost['category'], string> = {
  warmtepompen: 'Warmtepompen',
  'ramen-deuren': 'Ramen & Deuren',
  dakisolatie: 'Dakisolatie',
  tips: 'Tips',
  premies: 'Premies',
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('nl-BE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function BlogOverviewPage() {
  const [activeCategory, setActiveCategory] = useState('alles')

  const filteredPosts =
    activeCategory === 'alles'
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory)

  return (
    <>
      {/* Hero */}
      <section className="bg-primary-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-neutral-900 sm:text-5xl">
            Kenniscentrum
          </h1>
          <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
            Alles wat je moet weten over renoveren in België. Praktische gidsen,
            tips en actuele informatie over premies.
          </p>
        </div>
      </section>

      {/* Filter tabs + grid */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={cn(
                  'rounded-full px-5 py-2 text-sm font-medium transition-colors',
                  activeCategory === cat.key
                    ? 'bg-primary-600 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Posts grid */}
          {filteredPosts.length === 0 ? (
            <p className="text-neutral-500 text-center py-12">
              Geen artikels gevonden in deze categorie.
            </p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-shadow hover:shadow-lg"
                >
                  {/* Image */}
                  <div className="aspect-[16/10] overflow-hidden bg-neutral-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6">
                    {/* Category badge */}
                    <span className="mb-3 inline-flex w-fit rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
                      {categoryLabels[post.category]}
                    </span>

                    <h2 className="text-lg font-bold text-neutral-900 group-hover:text-primary-700 transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="mt-2 text-sm text-neutral-600 line-clamp-2 flex-1">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="mt-4 flex items-center justify-between text-xs text-neutral-400">
                      <span>{formatDate(post.publishedAt)}</span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {post.readTime} min
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-700 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">
            Klaar om je renovatie te starten?
          </h2>
          <p className="mt-4 text-lg text-primary-200">
            Ontvang gratis advies op maat en vergelijk offertes van geverifieerde
            vaklui.
          </p>
          <Link
            to="/app/nieuw-project"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-primary-700 shadow-lg hover:bg-primary-50 transition-colors"
          >
            Start je project
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  )
}
