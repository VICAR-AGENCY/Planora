import { Link } from 'react-router-dom'
import { CTASection } from '@/components/marketing/CTASection'

export function RoofInsulationCostPage() {
  return (
    <>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
          Dakisolatie prijzen in 2025: complete kostengids voor België
        </h1>
        <p className="mt-4 text-lg text-neutral-600">
          Wat kost dakisolatie in België? Van binnenisolatie tot sarking: alle prijzen per m², materiaalkosten en installatiekosten op een rij.
        </p>

        <div className="prose prose-neutral mt-12 max-w-none">
          <h2>Gemiddelde prijzen per isolatiemethode</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Methode</th>
                  <th className="text-left">Prijs per m² (incl. plaatsing)</th>
                  <th className="text-left">Geschikt voor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Binnenisolatie (tussen kepers)</td>
                  <td>€25 - €50</td>
                  <td>Hellend dak</td>
                </tr>
                <tr>
                  <td>Sarking (buitenisolatie)</td>
                  <td>€100 - €180</td>
                  <td>Hellend dak</td>
                </tr>
                <tr>
                  <td>PUR-schuim spuiten</td>
                  <td>€30 - €60</td>
                  <td>Hellend dak</td>
                </tr>
                <tr>
                  <td>Plat dak isolatie (PIR/EPS)</td>
                  <td>€50 - €100</td>
                  <td>Plat dak</td>
                </tr>
                <tr>
                  <td>Zoldervloerisolatie</td>
                  <td>€15 - €35</td>
                  <td>Ongebruikte zolder</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Prijzen per isolatiemateriaal</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Materiaal</th>
                  <th className="text-left">Lambda-waarde</th>
                  <th className="text-left">Prijs per m² (materiaal)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Minerale wol (glaswol/rotswol)</td>
                  <td>0,032 - 0,040</td>
                  <td>€8 - €20</td>
                </tr>
                <tr>
                  <td>PIR/PUR platen</td>
                  <td>0,022 - 0,028</td>
                  <td>€15 - €35</td>
                </tr>
                <tr>
                  <td>Cellulose (inblazen)</td>
                  <td>0,038 - 0,042</td>
                  <td>€10 - €18</td>
                </tr>
                <tr>
                  <td>EPS (piepschuim)</td>
                  <td>0,032 - 0,038</td>
                  <td>€6 - €15</td>
                </tr>
                <tr>
                  <td>Houtvezel</td>
                  <td>0,038 - 0,050</td>
                  <td>€20 - €40</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Wat bepaalt de prijs?</h2>
          <ul>
            <li><strong>Isolatiemethode</strong> — sarking is het duurst maar meest efficiënt</li>
            <li><strong>Oppervlakte</strong> — grotere oppervlaktes hebben lagere m² prijzen</li>
            <li><strong>Isolatiedikte</strong> — dikkere isolatie (hogere Rd-waarde) kost meer</li>
            <li><strong>Daktype</strong> — platte daken zijn vaak eenvoudiger te isoleren</li>
            <li><strong>Toegankelijkheid</strong> — moeilijk bereikbare daken verhogen de prijs</li>
            <li><strong>Huidige staat</strong> — oude isolatie verwijderen kost extra</li>
          </ul>

          <h2>Voorbeeldprijzen voor een gemiddelde woning</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Scenario</th>
                  <th className="text-left">Oppervlakte</th>
                  <th className="text-left">Geschatte totaalprijs</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Rijwoning - binnenisolatie</td>
                  <td>60-80 m²</td>
                  <td>€2.000 - €4.000</td>
                </tr>
                <tr>
                  <td>Rijwoning - sarking</td>
                  <td>60-80 m²</td>
                  <td>€6.000 - €14.000</td>
                </tr>
                <tr>
                  <td>Half-open bebouwing - binnenisolatie</td>
                  <td>80-120 m²</td>
                  <td>€2.500 - €6.000</td>
                </tr>
                <tr>
                  <td>Vrijstaande woning - binnenisolatie</td>
                  <td>120-200 m²</td>
                  <td>€4.000 - €10.000</td>
                </tr>
                <tr>
                  <td>Vrijstaande woning - sarking</td>
                  <td>120-200 m²</td>
                  <td>€12.000 - €36.000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Minimale Rd-waarde voor premies</h2>
          <p>
            Om in aanmerking te komen voor premies moet je dakisolatie voldoen aan minimale Rd-waardes:
          </p>
          <ul>
            <li><strong>Hellend dak</strong> — minimaal Rd 4,5 m²K/W</li>
            <li><strong>Plat dak</strong> — minimaal Rd 4,0 m²K/W</li>
            <li><strong>Zoldervloer</strong> — minimaal Rd 4,0 m²K/W</li>
          </ul>

          <h2>Extra kosten om rekening mee te houden</h2>
          <ul>
            <li><strong>Dampscherm</strong> — €3 - €8 per m²</li>
            <li><strong>Afwerking (gipskarton, OSB)</strong> — €15 - €30 per m²</li>
            <li><strong>Oude isolatie verwijderen</strong> — €5 - €15 per m²</li>
            <li><strong>Stellingen (bij sarking)</strong> — €500 - €1.500</li>
            <li><strong>Nieuwe dakbedekking (bij sarking)</strong> — €40 - €100 per m²</li>
          </ul>

          <h2>Bereken jouw situatie</h2>
          <p>
            Wil je weten wat dakisolatie exact kost voor jouw woning? Gebruik onze{' '}
            <Link to="/calculator/dakisolatie" className="text-primary-700 hover:text-primary-600 font-medium">
              gratis dakisolatie calculator
            </Link>{' '}
            of{' '}
            <Link to="/app/nieuw-project" className="text-primary-700 hover:text-primary-600 font-medium">
              start een project
            </Link>{' '}
            voor een persoonlijke kostenraming met offertes van lokale isolatiebedrijven.
          </p>
        </div>
      </article>

      <CTASection />
    </>
  )
}
