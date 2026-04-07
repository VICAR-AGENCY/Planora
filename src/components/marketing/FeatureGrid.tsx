import { MessageSquare, Camera, FileSearch, Calculator, Users, TrendingDown } from 'lucide-react'

const features = [
  {
    icon: MessageSquare,
    title: 'Vertel wat je nodig hebt',
    description: 'Chat met onze AI-assistent. Geen saaie formulieren — gewoon een gesprek over je project.',
  },
  {
    icon: Camera,
    title: 'Upload een foto',
    description: 'Maak een foto van je woning of verwarmingssysteem. AI analyseert en adviseert.',
  },
  {
    icon: Calculator,
    title: 'Ken je kosten',
    description: 'Krijg direct een realistische kostenraming en premie-berekening voor jouw situatie.',
  },
  {
    icon: Users,
    title: 'Matched met installateurs',
    description: 'Wij selecteren de beste installateurs in jouw regio op basis van jouw projectbrief.',
  },
  {
    icon: FileSearch,
    title: 'Vergelijk offertes slim',
    description: 'AI parseert offertes en toont ze zij-aan-zij — geen appels met peren meer.',
  },
  {
    icon: TrendingDown,
    title: 'Bespaar met premies',
    description: 'Automatische berekening van MijnVerbouwPremie en federale belastingvoordelen.',
  },
]

export function FeatureGrid() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
            Alles wat je nodig hebt, op één plek
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            Van eerste idee tot getekende offerte — Planora begeleidt elke stap.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-xl border border-primary-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50">
                <feature.icon className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-neutral-900">{feature.title}</h3>
              <p className="mt-2 text-sm text-neutral-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
