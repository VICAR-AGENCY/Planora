import { CTASection } from '@/components/marketing/CTASection'

export function HeatPumpPremiumPage() {
  return (
    <>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
          Warmtepomp premies in Vlaanderen 2025
        </h1>
        <p className="mt-4 text-lg text-neutral-600">
          Alle premies en subsidies voor warmtepompen in Vlaanderen: MijnVerbouwPremie, federale belastingvermindering en gemeentelijke premies.
        </p>

        <div className="prose prose-neutral mt-12 max-w-none">
          <h2>MijnVerbouwPremie</h2>
          <p>
            De Vlaamse overheid biedt via MijnVerbouwPremie substantiële premies voor het plaatsen van een warmtepomp. Het bedrag hangt af van je inkomenscategorie.
          </p>

          <h3>Bedragen per inkomenscategorie</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Categorie</th>
                  <th className="text-left">Lucht-water</th>
                  <th className="text-left">Grond-water</th>
                  <th className="text-left">Hybride</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Laag inkomen</td>
                  <td>€5.500</td>
                  <td>€7.500</td>
                  <td>€3.500</td>
                </tr>
                <tr>
                  <td>Middeninkomen</td>
                  <td>€3.500</td>
                  <td>€5.000</td>
                  <td>€2.000</td>
                </tr>
                <tr>
                  <td>Hoog inkomen</td>
                  <td>€2.500</td>
                  <td>€3.500</td>
                  <td>€1.500</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Federale belastingvermindering</h2>
          <p>
            Bovenop de Vlaamse premie heb je recht op een federale belastingvermindering van 40% op de eerste €3.490 aan uitgaven per woning. Dat komt neer op maximaal €1.396.
          </p>

          <h2>Gemeentelijke premies</h2>
          <p>
            Veel Vlaamse gemeenten bieden bijkomende premies. Check bij jouw gemeente of er extra ondersteuning beschikbaar is.
          </p>
        </div>
      </article>

      <CTASection />
    </>
  )
}
