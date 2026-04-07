import { Heart, Shield, Lightbulb, Users } from 'lucide-react'
import { TextReveal } from '@/components/animated/TextReveal'

const values = [
  { icon: Shield, title: 'Transparantie', description: 'Geen verborgen kosten, geen verkooppraatjes. Eerlijke informatie zodat jij de beste beslissing kan maken.' },
  { icon: Lightbulb, title: 'Innovatie', description: 'AI-gestuurd platform dat slimmer wordt met elke interactie. Technologie in dienst van de consument.' },
  { icon: Heart, title: 'Kwaliteit', description: 'Alleen geverifieerde, gecertificeerde installateurs. We selecteren streng zodat jij niet hoeft te twijfelen.' },
  { icon: Users, title: 'Toegankelijkheid', description: 'Complexe renovatiebeslissingen eenvoudig maken. Voor iedereen, niet alleen voor experts.' },
]

export function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1 className="text-3xl font-bold text-neutral-900 sm:text-5xl">Over Planora</h1>
          <p className="mt-6 text-lg text-neutral-600">
            Het slimste beslissingsplatform voor woningprojecten in België.
          </p>
        </div>
      </section>

      {/* Mission - TextReveal */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <TextReveal text="Wij geloven dat elke huiseigenaar recht heeft op eerlijke, transparante informatie om de beste beslissing te maken over hun woning. Daarom bouwen we Planora." />
        </div>
      </section>

      {/* Values */}
      <section className="bg-neutral-50 py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-neutral-900 text-center sm:text-3xl">Onze waarden</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {values.map((v) => (
              <div key={v.title} className="rounded-xl bg-white border border-neutral-100 p-6">
                <v.icon className="h-8 w-8 text-primary-600" />
                <h3 className="mt-4 text-lg font-semibold text-neutral-900">{v.title}</h3>
                <p className="mt-2 text-neutral-600">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">Het team</h2>
          <p className="mt-4 text-lg text-neutral-600">
            Planora wordt gebouwd door een klein, gedreven team uit Antwerpen dat gelooft in de kracht van technologie om betere beslissingen te maken.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-700 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold text-white">Klaar om slim te beslissen?</h2>
          <p className="mt-4 text-lg text-primary-200">
            Start vandaag nog met je woningproject.
          </p>
          <a
            href="/app/nieuw-project"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-primary-700 shadow-lg hover:bg-primary-50 transition-colors"
          >
            Start je project
          </a>
        </div>
      </section>
    </>
  )
}
