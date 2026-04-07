import { Link } from 'react-router-dom'
import { CTASection } from '@/components/marketing/CTASection'

export function RoofInsulationPremiumPage() {
  return (
    <>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
          Dakisolatie premies in 2025: alle subsidies in Vlaanderen
        </h1>
        <p className="mt-4 text-lg text-neutral-600">
          Dakisolatie is de meest gesubsidieerde renovatiemaatregel. Ontdek welke premies je kan krijgen via MijnVerbouwPremie, gemeentelijke subsidies en fiscale voordelen.
        </p>

        <div className="prose prose-neutral mt-12 max-w-none">
          <h2>MijnVerbouwPremie voor dakisolatie</h2>
          <p>
            De Vlaamse overheid geeft aanzienlijke premies voor dakisolatie via MijnVerbouwPremie. De hoogte hangt af van je inkomenscategorie.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Categorie</th>
                  <th className="text-left">Inkomen (gezamenlijk)</th>
                  <th className="text-left">Premie per m²</th>
                  <th className="text-left">Maximum</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Categorie 1</td>
                  <td>Tot €26.170</td>
                  <td>€20/m²</td>
                  <td>Geen limiet</td>
                </tr>
                <tr>
                  <td>Categorie 2</td>
                  <td>€26.170 - €52.340</td>
                  <td>€14/m²</td>
                  <td>€4.900</td>
                </tr>
                <tr>
                  <td>Categorie 3</td>
                  <td>€52.340 - €78.510</td>
                  <td>€8/m²</td>
                  <td>€2.800</td>
                </tr>
                <tr>
                  <td>Categorie 4</td>
                  <td>Meer dan €78.510</td>
                  <td>Geen</td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="rounded-lg bg-accent-50 border border-accent-200 p-4 my-6">
            <p className="text-accent-800 font-medium mb-2">Rekenvoorbeeld</p>
            <p className="text-accent-700 text-sm">
              Een gezin in categorie 2 laat 100 m² dakisolatie plaatsen. 
              De premie bedraagt 100 × €14 = €1.400. Bij een totaalprijs van €5.000 betaal je nog €3.600.
            </p>
          </div>

          <h2>Voorwaarden MijnVerbouwPremie</h2>
          <ul>
            <li><strong>Minimale Rd-waarde</strong> — 4,5 m²K/W voor hellend dak, 4,0 m²K/W voor plat dak</li>
            <li><strong>Erkende aannemer</strong> — werken moeten door een geregistreerd aannemer worden uitgevoerd</li>
            <li><strong>Woning ouder dan 15 jaar</strong> — bouwaanvraag dateert van voor 2010</li>
            <li><strong>Hoofdverblijfplaats</strong> — je moet zelf in de woning wonen (of gaan wonen binnen 2 jaar)</li>
            <li><strong>Aanvraagtermijn</strong> — binnen 24 maanden na eindfactuur aanvragen</li>
          </ul>

          <h2>Totaalrenovatiebonus</h2>
          <p>
            Combineer dakisolatie met andere energiebesparende maatregelen en krijg een extra bonus:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Aantal maatregelen</th>
                  <th className="text-left">Extra bonus</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2 maatregelen</td>
                  <td>€500</td>
                </tr>
                <tr>
                  <td>3 maatregelen</td>
                  <td>€1.000</td>
                </tr>
                <tr>
                  <td>4+ maatregelen</td>
                  <td>€1.500</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Gemeentelijke premies</h2>
          <p>
            Veel Vlaamse gemeenten geven extra premies bovenop MijnVerbouwPremie:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Gemeente</th>
                  <th className="text-left">Extra premie dakisolatie</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Antwerpen</td>
                  <td>€5/m² (max €500)</td>
                </tr>
                <tr>
                  <td>Gent</td>
                  <td>€6/m² (max €600)</td>
                </tr>
                <tr>
                  <td>Brugge</td>
                  <td>€4/m² (max €400)</td>
                </tr>
                <tr>
                  <td>Leuven</td>
                  <td>€5/m² (max €500)</td>
                </tr>
                <tr>
                  <td>Mechelen</td>
                  <td>€4/m² (max €400)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-neutral-500 mt-2">
            Neem contact op met je gemeente voor actuele bedragen en voorwaarden.
          </p>

          <h2>Federale belastingvermindering</h2>
          <p>
            Naast de Vlaamse premie kan je ook federale belastingvermindering krijgen:
          </p>
          <ul>
            <li><strong>30% belastingvermindering</strong> op isolatiewerken</li>
            <li><strong>Maximum €3.550</strong> per woning per jaar (2025)</li>
            <li><strong>Werken door aannemer</strong> — btw-attest verplicht</li>
            <li><strong>Woning ouder dan 5 jaar</strong></li>
          </ul>

          <h2>Netbeheerder premies</h2>
          <p>
            Sommige netbeheerders (Fluvius) bieden bijkomende premies of voordelen:
          </p>
          <ul>
            <li><strong>Energielening</strong> — 0% lening tot €15.000 voor dakisolatie</li>
            <li><strong>Gratis energiescan</strong> — advies over isolatiemogelijkheden</li>
          </ul>

          <h2>Aanvraagproces</h2>
          <ol>
            <li><strong>Offertes verzamelen</strong> — vraag minstens 3 offertes aan</li>
            <li><strong>Werken laten uitvoeren</strong> — bewaar alle facturen</li>
            <li><strong>EPC-attest</strong> — laat na de werken een nieuw EPC opmaken</li>
            <li><strong>Aanvraag indienen</strong> — via mijnverbouwpremie.be binnen 24 maanden</li>
            <li><strong>Wachten op uitbetaling</strong> — meestal binnen 4 maanden</li>
          </ol>

          <h2>Bereken jouw premie</h2>
          <p>
            Wil je weten hoeveel premie je kan krijgen voor dakisolatie? Gebruik onze{' '}
            <Link to="/calculator/dakisolatie" className="text-primary-700 hover:text-primary-600 font-medium">
              gratis dakisolatie calculator
            </Link>{' '}
            of{' '}
            <Link to="/app/nieuw-project" className="text-primary-700 hover:text-primary-600 font-medium">
              start een project
            </Link>{' '}
            voor een persoonlijke berekening inclusief alle beschikbare premies.
          </p>
        </div>
      </article>

      <CTASection />
    </>
  )
}
