import { Link } from 'react-router-dom'
import { CTASection } from '@/components/marketing/CTASection'

export function WindowPremiumPage() {
  return (
    <>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
          Ramen premies in Vlaanderen 2025
        </h1>
        <p className="mt-4 text-lg text-neutral-600">
          Alle premies en subsidies voor nieuwe ramen in Vlaanderen: MijnVerbouwPremie, voorwaarden en aanvraagprocedure uitgelegd.
        </p>

        <div className="prose prose-neutral mt-12 max-w-none">
          <h2>MijnVerbouwPremie voor ramen</h2>
          <p>
            De Vlaamse overheid biedt via MijnVerbouwPremie aanzienlijke premies voor het plaatsen van hoogrendementsbeglazing. Het bedrag hangt af van je inkomenscategorie en de oppervlakte van de geplaatste beglazing.
          </p>

          <h3>Bedragen per inkomenscategorie (2025)</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Categorie</th>
                  <th className="text-left">Premie per m²</th>
                  <th className="text-left">Maximum</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Categorie I (laag inkomen)</td>
                  <td>€110 per m²</td>
                  <td>€4.400</td>
                </tr>
                <tr>
                  <td>Categorie II (middeninkomen)</td>
                  <td>€55 per m²</td>
                  <td>€2.200</td>
                </tr>
                <tr>
                  <td>Categorie III (hoog inkomen)</td>
                  <td>€35 per m²</td>
                  <td>€1.400</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Voorwaarden voor de premie</h2>
          <ul>
            <li><strong>Woningtype</strong> — De woning moet minstens 15 jaar oud zijn</li>
            <li><strong>U-waarde glas</strong> — Maximaal 1,0 W/m²K (hoogrendementsbeglazing)</li>
            <li><strong>U-waarde profiel</strong> — Maximaal 1,5 W/m²K voor het raamkozijn</li>
            <li><strong>Uitvoering</strong> — Werken moeten uitgevoerd worden door een aannemer met BTW-nummer</li>
            <li><strong>Facturen</strong> — Maximaal 2 jaar oude facturen komen in aanmerking</li>
          </ul>

          <h2>Inkomenscategorieën bepalen</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Categorie</th>
                  <th className="text-left">Gezamenlijk belastbaar inkomen</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Categorie I</td>
                  <td>Tot €28.230 (+ €5.060 per persoon ten laste)</td>
                </tr>
                <tr>
                  <td>Categorie II</td>
                  <td>€28.231 - €56.460 (+ €5.060 per persoon ten laste)</td>
                </tr>
                <tr>
                  <td>Categorie III</td>
                  <td>Boven €56.460 (+ €5.060 per persoon ten laste)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Aanvraagprocedure</h2>
          <ol>
            <li><strong>Vraag offertes aan</strong> — Vergelijk minstens 3 offertes van erkende schrijnwerkers</li>
            <li><strong>Laat de werken uitvoeren</strong> — Zorg dat je facturen de technische specificaties vermelden</li>
            <li><strong>Dien je aanvraag in</strong> — Via het MijnVerbouwPremie-portaal binnen 24 maanden na factuurdatum</li>
            <li><strong>Wacht op uitbetaling</strong> — Gemiddeld 4-8 weken na goedkeuring</li>
          </ol>

          <h2>Gemeentelijke premies</h2>
          <p>
            Veel Vlaamse gemeenten bieden bijkomende premies voor energiebesparende maatregelen. De bedragen variëren sterk per gemeente:
          </p>
          <ul>
            <li><strong>Antwerpen</strong> — Tot €1.000 extra via Klimaatpremie</li>
            <li><strong>Gent</strong> — Tot €800 via Energielening+</li>
            <li><strong>Brugge</strong> — Tot €500 voor hoogrendementsbeglazing</li>
          </ul>
          <p className="text-sm text-neutral-500">
            Check altijd de website van jouw gemeente voor de meest actuele informatie.
          </p>

          <h2>Tips om je premie te maximaliseren</h2>
          <ul>
            <li>Combineer ramen met andere werken (dakisolatie, warmtepomp) voor extra premies</li>
            <li>Kies voor triple glas om zeker aan de U-waarde voorwaarden te voldoen</li>
            <li>Vraag je aannemer om de technische specificaties duidelijk op de factuur te vermelden</li>
            <li>Dien je aanvraag in binnen 24 maanden na de laatste factuur</li>
          </ul>

          <h2>Bereken je besparing</h2>
          <p>
            Wil je weten hoeveel premie je kunt krijgen? Gebruik onze{' '}
            <Link to="/calculator/raamprijs" className="text-primary-700 hover:text-primary-600 font-medium">
              raamprijs calculator
            </Link>{' '}
            voor een schatting inclusief premies, of{' '}
            <Link to="/app/nieuw-project" className="text-primary-700 hover:text-primary-600 font-medium">
              start een project
            </Link>{' '}
            voor persoonlijk advies.
          </p>
        </div>
      </article>

      <CTASection />
    </>
  )
}
