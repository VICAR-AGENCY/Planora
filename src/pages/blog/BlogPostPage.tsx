import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Clock, User } from 'lucide-react'
import { blogPosts, getPostBySlug, type BlogPost } from '@/lib/blog/posts'

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

function getRelatedPosts(current: BlogPost): BlogPost[] {
  return blogPosts
    .filter((p) => p.slug !== current.slug)
    .filter((p) => p.category === current.category)
    .slice(0, 2)
    .concat(
      blogPosts
        .filter((p) => p.slug !== current.slug && p.category !== current.category)
        .slice(0, 2)
    )
    .slice(0, 3)
}

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold text-neutral-900">
          Artikel niet gevonden
        </h1>
        <p className="mt-4 text-neutral-600">
          Dit artikel bestaat niet of werd verplaatst.
        </p>
        <Link
          to="/blog"
          className="mt-8 inline-flex items-center gap-2 text-primary-700 font-semibold hover:text-primary-600 transition-colors"
        >
          <ArrowLeft size={18} />
          Terug naar kenniscentrum
        </Link>
      </div>
    )
  }

  const relatedPosts = getRelatedPosts(post)

  return (
    <>
      {/* Hero image */}
      <div className="relative h-64 sm:h-80 lg:h-96 bg-neutral-100">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Article */}
      <article className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* Back link */}
        <Link
          to="/blog"
          className="mt-8 inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-primary-700 transition-colors"
        >
          <ArrowLeft size={16} />
          Kenniscentrum
        </Link>

        {/* Category badge */}
        <div className="mt-6">
          <span className="inline-flex rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
            {categoryLabels[post.category]}
          </span>
        </div>

        {/* Title */}
        <h1 className="mt-4 text-3xl font-bold text-neutral-900 sm:text-4xl lg:text-5xl leading-tight">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-neutral-500 border-b border-neutral-200 pb-6">
          <span className="flex items-center gap-1.5">
            <User size={16} />
            {post.author}
          </span>
          <span>{formatDate(post.publishedAt)}</span>
          <span className="flex items-center gap-1.5">
            <Clock size={16} />
            {post.readTime} min leestijd
          </span>
        </div>

        {/* Content */}
        <div
          className="prose prose-neutral mt-10 max-w-none prose-headings:text-neutral-900 prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-neutral-700 prose-p:leading-relaxed prose-li:text-neutral-700 prose-strong:text-neutral-900"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* CTA in-article */}
        <div className="mt-12 rounded-2xl bg-primary-50 p-8 text-center">
          <h3 className="text-xl font-bold text-neutral-900">
            Wil je dit project starten?
          </h3>
          <p className="mt-2 text-neutral-600">
            Ontvang gratis advies op maat en vergelijk offertes van geverifieerde
            vaklui.
          </p>
          <Link
            to="/app/nieuw-project"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-8 py-3 text-base font-semibold text-white shadow-lg hover:bg-primary-700 transition-colors"
          >
            Start je project
            <ArrowRight size={18} />
          </Link>
        </div>
      </article>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-neutral-50 mt-16 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-8">
              Gerelateerde artikels
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  to={`/blog/${related.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-shadow hover:shadow-lg"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-neutral-100">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <span className="mb-3 inline-flex rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
                      {categoryLabels[related.category]}
                    </span>
                    <h3 className="mt-2 text-lg font-bold text-neutral-900 group-hover:text-primary-700 transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                    <p className="mt-2 text-sm text-neutral-600 line-clamp-2">
                      {related.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-xs text-neutral-400">
                      <Clock size={14} />
                      {related.readTime} min
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
