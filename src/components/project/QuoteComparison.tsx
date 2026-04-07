import { formatEUR } from '@/lib/utils/format'
import type { Quote } from '@/types/quote'

interface QuoteComparisonProps {
  quotes: Quote[]
}

export function QuoteComparison({ quotes }: QuoteComparisonProps) {
  if (quotes.length === 0) {
    return (
      <div className="rounded-xl border border-neutral-200 bg-white p-8 text-center text-neutral-400">
        Nog geen offertes ontvangen.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-neutral-200">
      <table className="w-full text-left text-sm">
        <thead className="border-b bg-neutral-50">
          <tr>
            <th className="px-4 py-3 font-medium text-neutral-500">Leverancier</th>
            <th className="px-4 py-3 font-medium text-neutral-500">Totaal</th>
            <th className="px-4 py-3 font-medium text-neutral-500">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {quotes.map((quote) => (
            <tr key={quote.id} className="bg-white">
              <td className="px-4 py-3 font-medium text-neutral-900">{quote.supplier_id}</td>
              <td className="px-4 py-3">{quote.total_amount ? formatEUR(quote.total_amount) : '–'}</td>
              <td className="px-4 py-3">
                <span className="rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-700">
                  {quote.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
