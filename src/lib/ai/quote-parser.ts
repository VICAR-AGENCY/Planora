import type { ParsedQuote } from '@/types/quote'

export async function parseQuotePDF(pdfUrl: string): Promise<ParsedQuote> {
  const response = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-quote-parse`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pdf_url: pdfUrl }),
    }
  )

  if (!response.ok) throw new Error('Quote parsing failed')
  return response.json() as Promise<ParsedQuote>
}
