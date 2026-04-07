import { Link } from 'react-router-dom'
import { FileText, ArrowRight, Euro } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { useSupplierQuotes } from '@/hooks/useSupplier'

const statusLabels: Record<string, string> = {
  pending: 'In afwachting',
  submitted: 'Ingediend',
  accepted: 'Geaccepteerd',
  rejected: 'Afgewezen',
}

const statusColors: Record<string, string> = {
  pending: 'bg-neutral-100 text-neutral-600',
  submitted: 'bg-blue-100 text-blue-800',
  accepted: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
}

export function SupplierQuotesPage() {
  const { data: quotes, isLoading } = useSupplierQuotes()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Mijn offertes</h1>
        <p className="mt-1 text-neutral-500">
          Overzicht van al je ingediende offertes en hun status.
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
        </div>
      ) : !quotes || quotes.length === 0 ? (
        <div className="rounded-2xl border border-neutral-200 bg-white py-16 text-center">
          <FileText className="mx-auto h-12 w-12 text-neutral-300" />
          <h2 className="mt-4 text-lg font-semibold text-neutral-900">
            Nog geen offertes
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            Bekijk je projectmatches en dien je eerste offerte in.
          </p>
          <Link
            to="/supplier/dashboard"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-primary-700 transition-colors"
          >
            Naar dashboard
            <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quotes.map((quote: any) => (
            <Link
              key={quote.id}
              to={`/supplier/projecten/${quote.project_id}`}
              className="group rounded-2xl border border-neutral-200 bg-white p-5 hover:border-primary-200 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50">
                  <FileText size={18} className="text-primary-600" />
                </div>
                <span
                  className={cn(
                    'rounded-full px-2.5 py-0.5 text-xs font-medium',
                    statusColors[quote.status] ?? statusColors.pending
                  )}
                >
                  {statusLabels[quote.status] ?? quote.status}
                </span>
              </div>

              <div className="mt-4">
                <h3 className="font-medium text-neutral-900 group-hover:text-primary-700 transition-colors">
                  {quote.project?.title ?? 'Onbekend project'}
                </h3>
                <p className="mt-0.5 text-sm text-neutral-500">
                  {[quote.project?.city, quote.project?.category]
                    .filter(Boolean)
                    .join(' \u2022 ')}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3">
                <div className="flex items-center gap-1.5 text-sm text-neutral-500">
                  <Euro size={14} />
                  <span className="font-semibold text-neutral-900">
                    {quote.total_amount
                      ? `\u20AC${quote.total_amount.toLocaleString('nl-BE')}`
                      : '\u2014'}
                  </span>
                </div>
                <span className="text-xs text-neutral-400">
                  {new Date(quote.created_at).toLocaleDateString('nl-BE')}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
