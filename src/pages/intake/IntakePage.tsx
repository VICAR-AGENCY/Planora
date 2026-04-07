import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChatMessage } from '@/components/intake/ChatMessage'
import { ChatInput } from '@/components/intake/ChatInput'
import { useAIChat } from '@/hooks/useAIChat'
import { useIntakeStore } from '@/stores/intake-store'
import { useCreateProject } from '@/hooks/useProject'

const stepLabels: Record<string, string> = {
  greeting: 'Welkom',
  category: 'Categorie kiezen',
  property_type: 'Woningtype',
  surface: 'Oppervlakte',
  insulation: 'Isolatie',
  location: 'Locatie',
  budget: 'Budget & planning',
  summary: 'Samenvatting',
}

const stepOrder = ['greeting', 'category', 'property_type', 'surface', 'insulation', 'location', 'budget', 'summary']

export function IntakePage() {
  const { messages, isLoading, sendMessage } = useAIChat()
  const { step, addMessage, reset } = useIntakeStore()
  const scrollRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const createProject = useCreateProject()

  // Send greeting on mount
  useEffect(() => {
    if (messages.length === 0) {
      addMessage({
        id: crypto.randomUUID(),
        role: 'assistant',
        content:
          'Welkom bij Planora! Ik help je graag met je woningproject. Welk type project heb je in gedachten?\n\n• Warmtepomp\n• Ramen & deuren\n• Dakisolatie',
        timestamp: Date.now(),
      })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const currentStepIndex = stepOrder.indexOf(step)

  const handleConfirm = async () => {
    try {
      const project = await createProject.mutateAsync({
        title: 'Warmtepomp project',
        category: 'heat_pump_air_water',
        status: 'intake',
        city: 'Antwerpen',
        postal_code: '2000',
      })
      reset()
      navigate(`/app/project/${project.id}`)
    } catch {
      // Stay on page if creation fails
    }
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Step indicator */}
      <div className="border-b border-primary-100 bg-white px-4 py-3">
        <div className="mx-auto flex max-w-2xl items-center gap-2">
          {stepOrder.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                  i <= currentStepIndex
                    ? 'bg-primary-600 text-white'
                    : 'bg-primary-100 text-primary-400'
                }`}
              >
                {i + 1}
              </div>
              {i < stepOrder.length - 1 && (
                <div className={`h-px w-4 ${i < currentStepIndex ? 'bg-primary-600' : 'bg-primary-100'}`} />
              )}
            </div>
          ))}
          <span className="ml-3 text-sm font-medium text-primary-700">
            {stepLabels[step] ?? step}
          </span>
        </div>
      </div>

      {/* Chat messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl space-y-4 px-4 py-6">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="mr-3 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-100">
                <img src="/favicon.png" alt="" className="h-4 w-4" />
              </div>
              <div className="rounded-2xl rounded-bl-md bg-primary-50 px-4 py-3 text-sm text-primary-400">
                <span className="animate-pulse">Planora denkt na...</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confirm button when at summary step */}
      {step === 'summary' && (
        <div className="border-t border-primary-100 bg-primary-50 px-4 py-3">
          <div className="mx-auto max-w-2xl">
            <button
              onClick={handleConfirm}
              disabled={createProject.isPending}
              className="w-full rounded-xl bg-primary-600 py-3 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50 transition-colors"
            >
              {createProject.isPending ? 'Project aanmaken...' : 'Bevestig project'}
            </button>
          </div>
        </div>
      )}

      {/* Chat input */}
      <div className="mx-auto w-full max-w-2xl">
        <ChatInput onSend={sendMessage} disabled={isLoading} />
      </div>
    </div>
  )
}
