import { Link } from 'react-router-dom'
import { CTASection } from '@/components/marketing/CTASection'

export function WindowCostPage() {
  return (
    <>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
          Ramen prijzen in 2025: complete kostengids voor België
        </h1>
        <p className="mt-4 text-lg text-neutral-600">
          Wat kosten nieuwe ramen in België? Van PVC tot aluminium en hout: alle prijzen per m², installatiekosten en factoren die de prijs bepalen.
        </p>

        <div className="prose prose-neutral mt-12 max-w-none">
          <h2>Gemiddelde prijzen per materiaal</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Materiaal</th>
                  <th className="text-left">Prijs per m² (incl. plaatsing)</th>
                  <th className="text-left">Levensduur</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>PVC ramen</td>
                  <td>€350 - €550</td>
                  <td>30-40 jaar</td>
                </tr>
                <tr>
                  <td>Aluminium ramen</td>
                  <td>€500 - €800</td>
                  <td>40-50 jaar</td>
                </tr>
                <tr>
                  <td>Houten ramen</td>
                  <td>€600 - €900</td>
                  <td>50+ jaar (met onderhoud)</td>
                </tr>
                <tr>
                  <td>Hout-aluminium ramen</td>
                  <td>€700 - €1.100</td>
                  <td>50+ jaar</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Prijzen per type beglazing</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Glastype</th>
                  <th className="text-left">U-waarde</th>
                  <th className="text-left">Meerprijs t.o.v. dubbel glas</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Dubbel glas (HR++)</td>
                  <td>1,0 - 1,2 W/m²K</td>
                  <td>Basisprijs</td>
                </tr>
                <tr>
                  <td>Triple glas</td>
                  <td>0,5 - 0,7 W/m²K</td>
                  <td>+€50 - €100 per m²</td>
                </tr>
                <tr>
                  <td>Akoestisch glas</td>
                  <td>Variabel</td>
                  <td>+€30 - €60 per m²</td>
                </tr>
                <tr>
                  <td>Veiligheidsglas</td>
                  <td>Variabel</td>
                  <td>+€40 - €80 per m²</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Wat bepaalt de prijs?</h2>
          <ul>
            <li><strong>Materiaal</strong> — PVC is het goedkoopst, hout-aluminium het duurst</li>
            <li><strong>Afmetingen</strong> — grotere ramen zijn proportioneel duurder</li>
            <li><strong>Type beglazing</strong> — triple glas isoleert beter maar kost meer</li>
            <li><strong>Openingstype</strong> — draai-kipramen zijn duurder dan vaste ramen</li>
            <li><strong>Kleur en afwerking</strong> — speciale kleuren kosten extra</li>
            <li><strong>Complexiteit</strong> — renovatie is duurder dan nieuwbouw</li>
          </ul>

          <h2>Voorbeeldprijzen voor een gemiddelde woning</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Scenario</th>
                  <th className="text-left">Geschatte totaalprijs</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Rijwoning (8-10 ramen, PVC)</td>
                  <td>€6.000 - €10.000</td>
                </tr>
                <tr>
                  <td>Half-open bebouwing (12-15 ramen, PVC)</td>
                  <td>€9.000 - €15.000</td>
                </tr>
                <tr>
                  <td>Vrijstaande woning (15-20 ramen, PVC)</td>
                  <td>€12.000 - €22.000</td>
                </tr>
                <tr>
                  <td>Vrijstaande woning (15-20 ramen, aluminium)</td>
                  <td>€18.000 - €35.000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Extra kosten om rekening mee te houden</h2>
          <ul>
            <li><strong>Afbraak oude ramen</strong> — €50 - €100 per raam</li>
            <li><strong>Afwerking (pleisterwerk, schilderwerk)</strong> — €200 - €500 totaal</li>
            <li><strong>Rolluiken</strong> — €300 - €800 per raam</li>
            <li><strong>Vensterbankken</strong> — €50 - €150 per raam</li>
          </ul>

          <h2>Bereken jouw situatie</h2>
          <p>
            Wil je weten wat nieuwe ramen exact kosten voor jouw woning? Gebruik onze{' '}
            <Link to="/calculator/raamprijs" className="text-primary-700 hover:text-primary-600 font-medium">
              gratis raamprijs calculator
            </Link>{' '}
            of{' '}
            <Link to="/app/nieuw-project" className="text-primary-700 hover:text-primary-600 font-medium">
              start een project
            </Link>{' '}
            voor een persoonlijke kostenraming met offertes van lokale schrijnwerkers.
          </p>
        </div>
      </article>

      <CTASection />
    </>
  )
}
