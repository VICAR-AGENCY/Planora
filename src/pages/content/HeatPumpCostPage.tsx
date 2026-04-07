import { Link } from 'react-router-dom'
import { CTASection } from '@/components/marketing/CTASection'

export function HeatPumpCostPage() {
  return (
    <>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
          Warmtepomp kosten in 2025: complete prijsgids voor België
        </h1>
        <p className="mt-4 text-lg text-neutral-600">
          Wat kost een warmtepomp in België? Van lucht-water tot grond-water: alle prijzen, premies en terugverdientijden op een rij.
        </p>

        <div className="prose prose-neutral mt-12 max-w-none">
          <h2>Gemiddelde prijzen per type warmtepomp</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Type</th>
                  <th className="text-left">Prijs (incl. installatie)</th>
                  <th className="text-left">Terugverdientijd</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Lucht-water warmtepomp</td>
                  <td>€8.000 – €16.000</td>
                  <td>5 – 10 jaar</td>
                </tr>
                <tr>
                  <td>Grond-water warmtepomp</td>
                  <td>€15.000 – €25.000</td>
                  <td>8 – 14 jaar</td>
                </tr>
                <tr>
                  <td>Hybride warmtepomp</td>
                  <td>€5.000 – €9.000</td>
                  <td>4 – 8 jaar</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Wat bepaalt de prijs?</h2>
          <ul>
            <li><strong>Vermogen (kW)</strong> — afhankelijk van oppervlakte en isolatie</li>
            <li><strong>Type systeem</strong> — grond-water is duurder maar efficiënter</li>
            <li><strong>Complexiteit installatie</strong> — bestaande leidingen, boorwerken</li>
            <li><strong>Merk en model</strong> — Daikin, Vaillant, Mitsubishi, etc.</li>
          </ul>

          <h2>Premies in Vlaanderen (2025)</h2>
          <p>
            Via <strong>MijnVerbouwPremie</strong> kan je tot €7.500 premie krijgen, afhankelijk van je inkomenscategorie en het type warmtepomp.
          </p>

          <h2>Bereken jouw situatie</h2>
          <p>
            Wil je weten wat een warmtepomp exact kost voor jouw woning? Gebruik onze{' '}
            <Link to="/calculator/warmtepomp" className="text-primary-700 hover:text-primary-600 font-medium">
              gratis calculator
            </Link>{' '}
            of{' '}
            <Link to="/app/nieuw-project" className="text-primary-700 hover:text-primary-600 font-medium">
              start een project
            </Link>{' '}
            voor een persoonlijke kostenraming.
          </p>
        </div>
      </article>

      <CTASection />
    </>
  )
}
