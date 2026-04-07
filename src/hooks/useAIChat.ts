import { useCallback } from 'react'
import { useIntakeStore } from '@/stores/intake-store'
import type { IntakeMessage } from '@/types/intake'

const mockResponses: Record<string, string> = {
  greeting:
    'Welkom bij Planora! Ik help je graag met je woningproject. Welk type project heb je in gedachten?\n\n• Warmtepomp\n• Ramen & deuren\n• Dakisolatie',
  category:
    'Goed, dat is een slimme keuze! Laat me je een paar vragen stellen om een projectbrief op te stellen.\n\nWat voor type woning heb je? (vrijstaand, halfopen, rijwoning, appartement)',
  property_type:
    'Top! En wat is de geschatte oppervlakte van je woning in m²?',
  surface:
    'Begrepen. Hoe zou je de huidige isolatie van je woning omschrijven?\n\n• Goed (recent gerenoveerd/nieuwbouw)\n• Gemiddeld\n• Slecht (geen recente renovatie)',
  insulation:
    'Duidelijk. In welke stad of gemeente woon je? En wat is je postcode?',
  location:
    'Bijna klaar! Heb je een indicatie van je budget? En wanneer zou je het project willen starten?',
  budget:
    'Perfect! Ik heb nu genoeg informatie om je projectbrief samen te stellen. Wil je nog foto\'s uploaden van je woning? Dat helpt installateurs om een nauwkeuriger beeld te krijgen.\n\nOf klik op "Bevestig project" om direct verder te gaan.',
  summary:
    'Je projectbrief is klaar! Hier is een samenvatting van je project. Controleer de gegevens en klik op "Bevestig" om je project aan te maken. Wij gaan dan op zoek naar de beste installateurs in jouw regio.',
}

const stepFlow: string[] = [
  'greeting', 'category', 'property_type', 'surface', 'insulation', 'location', 'budget', 'summary',
]

export function useAIChat() {
  const { messages, isLoading, addMessage, setLoading, step, setStep } = useIntakeStore()

  const sendMessage = useCallback(
    async (content: string, photos?: string[]) => {
      const userMessage: IntakeMessage = {
        id: crypto.randomUUID(),
        role: 'user',
        content,
        photos,
        timestamp: Date.now(),
      }
      addMessage(userMessage)
      setLoading(true)

      // Simulate AI thinking delay
      await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 700))

      // Find current step index and advance
      const currentIndex = stepFlow.indexOf(step)
      const nextStep = stepFlow[Math.min(currentIndex + 1, stepFlow.length - 1)]
      setStep(nextStep as any)

      const reply = mockResponses[nextStep] ?? 'Bedankt voor die informatie! Laat me je project verder opbouwen...'

      addMessage({
        id: crypto.randomUUID(),
        role: 'assistant',
        content: reply,
        timestamp: Date.now(),
      })

      setLoading(false)
    },
    [messages, addMessage, setLoading, step, setStep]
  )

  return { messages, isLoading, sendMessage }
}
