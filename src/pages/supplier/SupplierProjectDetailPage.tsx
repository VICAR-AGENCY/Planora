import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import {
  ArrowLeft,
  MapPin,
  Home,
  Thermometer,
  Ruler,
  Clock,
  Euro,
  Send,
  Image,
} from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { supabase } from '@/lib/supabase/client'
import {
  useSupplier,
  useSubmitQuote,
  useProjectMessages,
  useSendMessage,
} from '@/hooks/useSupplier'
import { useAuth } from '@/hooks/useAuth'

export function SupplierProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const { data: supplier } = useSupplier()

  const { data: project, isLoading } = useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id!)
        .single()
      if (error) throw error
      return data
    },
    enabled: !!id,
  })

  const { data: existingQuote } = useQuery({
    queryKey: ['supplier-quote-for-project', supplier?.id, id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quotes')
        .select('*')
        .eq('supplier_id', supplier!.id)
        .eq('project_id', id!)
        .maybeSingle()
      if (error) throw error
      return data
    },
    enabled: !!supplier?.id && !!id,
  })

  const { data: messages } = useProjectMessages(id)
  const sendMessage = useSendMessage()
  const submitQuote = useSubmitQuote()

  const [quoteAmount, setQuoteAmount] = useState('')
  const [quoteNotes, setQuoteNotes] = useState('')
  const [showQuoteForm, setShowQuoteForm] = useState(false)
  const [messageText, setMessageText] = useState('')

  const brief = project?.brief as any

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="py-20 text-center">
        <p className="text-neutral-500">Project niet gevonden.</p>
        <Link
          to="/supplier/dashboard"
          className="mt-4 inline-block text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          Terug naar dashboard
        </Link>
      </div>
    )
  }

  const handleSubmitQuote = () => {
    if (!quoteAmount || !id) return
    submitQuote.mutate(
      {
        project_id: id,
        total_amount: parseFloat(quoteAmount),
        notes: quoteNotes || undefined,
      },
      {
        onSuccess: () => {
          setShowQuoteForm(false)
          setQuoteAmount('')
          setQuoteNotes('')
        },
      }
    )
  }

  const handleSendMessage = () => {
    if (!messageText.trim() || !id) return
    sendMessage.mutate(
      { projectId: id, content: messageText.trim() },
      { onSuccess: () => setMessageText('') }
    )
  }

  return (
    <div className="space-y-6">
      {/* Back navigation */}
      <Link
        to="/supplier/dashboard"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
      >
        <ArrowLeft size={16} />
        Terug naar dashboard
      </Link>

      {/* Project header */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-xl font-bold text-neutral-900">
              {project.title}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-neutral-500">
              <span className="flex items-center gap-1">
                <MapPin size={14} />
                {project.city} ({project.postal_code})
              </span>
              <span className="rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700">
                {project.category}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {new Date(project.created_at).toLocaleDateString('nl-BE')}
              </span>
            </div>
          </div>

          {existingQuote ? (
            <div className="rounded-xl bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
              Offerte ingediend ({'\u20AC'}
              {existingQuote.total_amount?.toLocaleString('nl-BE')})
            </div>
          ) : (
            <button
              onClick={() => setShowQuoteForm(!showQuoteForm)}
              className="rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-primary-600/20 hover:bg-primary-700 transition-colors"
            >
              Offerte indienen
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Project brief */}
        <div className="space-y-6 lg:col-span-2">
          {brief && (
            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold text-neutral-900">
                Projectinformatie
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoItem
                  icon={Home}
                  label="Woningtype"
                  value={brief.property_type}
                />
                <InfoItem
                  icon={Thermometer}
                  label="Huidige verwarming"
                  value={brief.current_heating}
                />
                <InfoItem
                  icon={Thermometer}
                  label="Gewenst systeem"
                  value={brief.desired_system}
                />
                <InfoItem
                  icon={Ruler}
                  label="Oppervlakte"
                  value={brief.surface_area ? `${brief.surface_area} m\u00B2` : undefined}
                />
                <InfoItem
                  icon={Home}
                  label="Isolatieniveau"
                  value={brief.insulation_level}
                />
                <InfoItem
                  icon={Clock}
                  label="Planning"
                  value={brief.timeline}
                />
                {brief.budget_range && (
                  <InfoItem
                    icon={Euro}
                    label="Budget"
                    value={`\u20AC${brief.budget_range.min?.toLocaleString('nl-BE')} - \u20AC${brief.budget_range.max?.toLocaleString('nl-BE')}`}
                  />
                )}
              </div>
              {brief.notes && (
                <div className="mt-4 rounded-xl bg-neutral-50 p-4">
                  <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
                    Opmerkingen
                  </p>
                  <p className="mt-1 text-sm text-neutral-700">
                    {brief.notes}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Photos */}
          {brief?.photos && brief.photos.length > 0 && (
            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold text-neutral-900">
                Foto's
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {brief.photos.map((url: string, i: number) => (
                  <a
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-neutral-200"
                  >
                    <img
                      src={url}
                      alt={`Projectfoto ${i + 1}`}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </a>
                ))}
              </div>
            </div>
          )}

          {(!brief?.photos || brief.photos.length === 0) && (
            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold text-neutral-900">
                Foto's
              </h2>
              <div className="flex flex-col items-center py-8 text-center">
                <Image className="h-10 w-10 text-neutral-300" />
                <p className="mt-2 text-sm text-neutral-500">
                  Geen foto's beschikbaar voor dit project.
                </p>
              </div>
            </div>
          )}

          {/* Quote form */}
          {showQuoteForm && !existingQuote && (
            <div className="rounded-2xl border-2 border-primary-200 bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold text-neutral-900">
                Offerte indienen
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                    Totaalbedrag (incl. BTW)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                      {'\u20AC'}
                    </span>
                    <input
                      type="number"
                      value={quoteAmount}
                      onChange={(e) => setQuoteAmount(e.target.value)}
                      placeholder="0,00"
                      className="w-full rounded-xl border border-neutral-300 py-2.5 pl-8 pr-4 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                    Opmerkingen (optioneel)
                  </label>
                  <textarea
                    value={quoteNotes}
                    onChange={(e) => setQuoteNotes(e.target.value)}
                    rows={3}
                    placeholder="Voeg extra details toe over je offerte..."
                    className="w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-colors resize-none"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleSubmitQuote}
                    disabled={!quoteAmount || submitQuote.isPending}
                    className="rounded-xl bg-primary-600 px-6 py-2.5 text-sm font-medium text-white shadow-md shadow-primary-600/20 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {submitQuote.isPending
                      ? 'Verzenden...'
                      : 'Offerte versturen'}
                  </button>
                  <button
                    onClick={() => setShowQuoteForm(false)}
                    className="rounded-xl border border-neutral-300 px-6 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
                  >
                    Annuleren
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Messages sidebar */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 lg:col-span-1">
          <h2 className="mb-4 text-lg font-semibold text-neutral-900">
            Berichten
          </h2>

          <div className="flex flex-col" style={{ minHeight: '300px' }}>
            {/* Messages list */}
            <div className="flex-1 space-y-3 overflow-y-auto max-h-80 mb-4">
              {!messages || messages.length === 0 ? (
                <p className="text-center text-sm text-neutral-400 py-8">
                  Nog geen berichten. Start het gesprek!
                </p>
              ) : (
                messages.map((msg: any) => {
                  const isMine = msg.sender_id === user?.id
                  return (
                    <div
                      key={msg.id}
                      className={cn(
                        'rounded-xl px-3 py-2 text-sm',
                        isMine
                          ? 'ml-6 bg-primary-50 text-primary-900'
                          : 'mr-6 bg-neutral-100 text-neutral-800'
                      )}
                    >
                      <p>{msg.content}</p>
                      <p className="mt-1 text-[10px] text-neutral-400">
                        {new Date(msg.created_at).toLocaleString('nl-BE', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  )
                })
              )}
            </div>

            {/* Message input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Typ een bericht..."
                className="flex-1 rounded-xl border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-colors"
              />
              <button
                onClick={handleSendMessage}
                disabled={!messageText.trim() || sendMessage.isPending}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Home
  label: string
  value?: string
}) {
  if (!value) return null
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-50">
        <Icon size={14} className="text-primary-600" />
      </div>
      <div>
        <p className="text-xs text-neutral-400">{label}</p>
        <p className="text-sm font-medium text-neutral-900">{value}</p>
      </div>
    </div>
  )
}
