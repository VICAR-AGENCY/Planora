import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, AlertTriangle, CheckCircle2, Shield } from 'lucide-react'
import { useQuotes } from '@/hooks/useQuotes'
import { formatEUR } from '@/lib/utils/format'

export function QuoteComparisonPage() {
  const { id } = useParams<{ id: string }>()
  const { data: quotes, isLoading } = useQuotes(id ?? '')

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 animate-pulse rounded bg-neutral-200" />
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 animate-pulse rounded-xl bg-neutral-100" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <Link to={`/app/project/${id}`} className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 mb-6">
        <ArrowLeft size={16} />
        Terug naar project
      </Link>

      <h1 className="text-2xl font-bold text-neutral-900">Offertes vergelijken</h1>
      <p className="mt-1 text-neutral-500">Vergelijk de ontvangen offertes zij-aan-zij.</p>

      {!quotes?.length ? (
        <div className="mt-12 rounded-2xl border-2 border-dashed border-primary-200 bg-primary-50/50 p-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-100">
            <AlertTriangle className="h-8 w-8 text-primary-400" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-neutral-900">Nog geen offertes</h3>
          <p className="mt-2 text-neutral-500 max-w-md mx-auto">
            We zijn bezig de beste installateurs in jouw regio te matchen. Je ontvangt een melding zodra er offertes binnenkomen.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {quotes.map((quote) => (
            <div key={quote.id} className="rounded-xl border border-neutral-100 bg-white overflow-hidden">
              {/* Header */}
              <div className="border-b border-neutral-100 bg-neutral-50 p-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-neutral-900">{quote.supplier?.company_name ?? 'Leverancier'}</h3>
                  {quote.supplier?.verified && (
                    <Shield size={14} className="text-primary-500" />
                  )}
                </div>
                {quote.supplier?.rating && (
                  <p className="mt-0.5 text-sm text-neutral-500">
                    {quote.supplier.rating.toFixed(1)} sterren
                  </p>
                )}
              </div>

              {/* Body */}
              <div className="p-4 space-y-4">
                {quote.parsed_data ? (
                  <>
                    {/* Line items */}
                    <div className="space-y-2">
                      {quote.parsed_data.line_items.slice(0, 4).map((item, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="text-neutral-600 truncate mr-2">{item.description}</span>
                          <span className="font-medium text-neutral-900 shrink-0">{formatEUR(item.total)}</span>
                        </div>
                      ))}
                    </div>

                    {/* Total */}
                    <div className="border-t border-neutral-100 pt-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-500">Excl. BTW</span>
                        <span className="font-medium">{formatEUR(quote.parsed_data.total_excl_vat)}</span>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <span className="text-neutral-500">BTW</span>
                        <span className="font-medium">{formatEUR(quote.parsed_data.vat_amount)}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-base mt-2">
                        <span>Totaal</span>
                        <span className="text-primary-700">{formatEUR(quote.parsed_data.total_incl_vat)}</span>
                      </div>
                    </div>

                    {/* Warranty & duration */}
                    <div className="flex gap-3 text-xs text-neutral-500">
                      {quote.parsed_data.warranty_years && (
                        <span className="flex items-center gap-1">
                          <CheckCircle2 size={12} />
                          {quote.parsed_data.warranty_years} jaar garantie
                        </span>
                      )}
                      {quote.parsed_data.estimated_duration && (
                        <span>{quote.parsed_data.estimated_duration}</span>
                      )}
                    </div>

                    {/* AI flags */}
                    {quote.parsed_data.notes.length > 0 && (
                      <div className="rounded-lg bg-warm-50 p-3">
                        <p className="text-xs font-medium text-warm-500 mb-1">AI opmerkingen</p>
                        {quote.parsed_data.notes.map((note, i) => (
                          <p key={i} className="text-xs text-warm-500">{note}</p>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="py-4 text-center">
                    <p className="text-sm text-neutral-400">
                      {quote.total_amount
                        ? `Totaal: ${formatEUR(quote.total_amount)}`
                        : 'Offerte in behandeling'}
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-neutral-100 p-4">
                <button className="w-full rounded-xl bg-primary-600 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 transition-colors">
                  Kies deze installateur
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
