export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  category: 'warmtepompen' | 'ramen-deuren' | 'dakisolatie' | 'tips' | 'premies'
  image: string
  author: string
  publishedAt: string
  readTime: number
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'warmtepomp-kiezen-2025',
    title: 'Hoe kies je de juiste warmtepomp in 2025?',
    excerpt: 'Lucht-water, grond-water of hybride? We leggen de verschillen uit en helpen je kiezen.',
    content: `<h2>De drie types warmtepompen</h2><p>Bij het kiezen van een warmtepomp zijn er drie hoofdtypes...</p><h3>1. Lucht-water warmtepomp</h3><p>De meest populaire keuze in België. Een lucht-water warmtepomp haalt energie uit de buitenlucht en zet deze om in warmte voor je verwarming en warm water. Prijsrange: €8.000 - €16.000 inclusief installatie.</p><h3>2. Grond-water warmtepomp</h3><p>Efficiënter maar duurder. Via boringen in de grond wordt constante temperatuur benut. Ideaal voor grotere woningen. Prijsrange: €15.000 - €25.000.</p><h3>3. Hybride warmtepomp</h3><p>De slimme tussenvorm: combineert een kleinere warmtepomp met je bestaande gasketel. Perfect als eerste stap. Prijsrange: €5.000 - €9.000.</p><h2>Waar moet je op letten?</h2><ul><li><strong>COP-waarde:</strong> Hoe hoger, hoe efficiënter (minimaal 3.0)</li><li><strong>Geluidsniveau:</strong> Belangrijk bij lucht-water systemen</li><li><strong>Compatibiliteit:</strong> Check of je radiatoren geschikt zijn</li></ul>`,
    category: 'warmtepompen',
    image: '/warmtepomp.webp',
    author: 'Planora Team',
    publishedAt: '2025-12-15',
    readTime: 5,
  },
  {
    slug: 'premies-vlaanderen-2025-complete-gids',
    title: 'Alle renovatiepremies in Vlaanderen 2025: complete gids',
    excerpt: 'MijnVerbouwPremie, federale belastingvoordelen en gemeentelijke premies — alles wat je moet weten.',
    content: `<h2>MijnVerbouwPremie 2025</h2><p>De Vlaamse overheid biedt via MijnVerbouwPremie substantiële premies voor energetische renovaties. De bedragen hangen af van je inkomenscategorie en het type werken.</p><h3>Warmtepompen</h3><p>Lucht-water: €2.500 - €5.500 | Grond-water: €3.500 - €7.500 | Hybride: €1.500 - €3.500</p><h3>Dakisolatie</h3><p>Tot €5.000 afhankelijk van oppervlakte en inkomen.</p><h3>Ramen & Deuren</h3><p>Tot €4.000 voor hoogrendementsbeglazing.</p><h2>Federale belastingvermindering</h2><p>40% op de eerste €3.490 per woning = max €1.396 per jaar.</p>`,
    category: 'premies',
    image: '/dakisolatie.webp',
    author: 'Planora Team',
    publishedAt: '2025-11-28',
    readTime: 7,
  },
  {
    slug: 'dakisolatie-beste-investering',
    title: 'Waarom dakisolatie de beste renovatie-investering is',
    excerpt: 'Tot 30% warmteverlies via je dak. Dakisolatie heeft de kortste terugverdientijd van alle renovaties.',
    content: `<h2>30% van je warmte verdwijnt via het dak</h2><p>Een ongeïsoleerd dak is de grootste bron van warmteverlies in je woning. Dakisolatie is daarom de meest rendabele investering die je kan doen.</p><h2>Terugverdientijd: 3-5 jaar</h2><p>Met een investering van €3.000 - €12.000 en een jaarlijkse besparing van €800 - €2.000, verdien je de investering snel terug.</p><h2>Soorten dakisolatie</h2><ul><li><strong>Binnenisolatie:</strong> Tussen de kepers, goedkoopst</li><li><strong>Sarking:</strong> Langs de buitenkant, beste prestatie</li><li><strong>Plat dak:</strong> PIR- of PUR-isolatie</li></ul>`,
    category: 'dakisolatie',
    image: '/dakisolatie.webp',
    author: 'Planora Team',
    publishedAt: '2025-11-10',
    readTime: 4,
  },
  {
    slug: 'nieuwe-ramen-wanneer-vervangen',
    title: 'Wanneer moet je je ramen vervangen? 5 signalen',
    excerpt: 'Tocht, condensatie of hoge energierekening? Dit zijn de signalen dat je ramen aan vervanging toe zijn.',
    content: `<h2>5 signalen dat je ramen aan vervanging toe zijn</h2><h3>1. Enkele beglazing</h3><p>Heb je nog enkele beglazing? Dan verlies je tot 5x meer warmte dan met moderne driedubbele beglazing.</p><h3>2. Condensatie tussen de ruiten</h3><p>Vocht tussen dubbele beglazing betekent dat de afdichting kapot is.</p><h3>3. Tocht bij gesloten ramen</h3><p>Verouderde profielen laten lucht door.</p><h3>4. Moeilijk openen/sluiten</h3><p>Verzakte of verweerde profielen gaan niet meer soepel.</p><h3>5. Hoge energierekening</h3><p>Ramen zijn verantwoordelijk voor 15-25% van het warmteverlies.</p>`,
    category: 'ramen-deuren',
    image: '/ramen-deuren.jpg',
    author: 'Planora Team',
    publishedAt: '2025-10-22',
    readTime: 4,
  },
  {
    slug: 'offerte-vergelijken-tips',
    title: '7 tips om offertes eerlijk te vergelijken',
    excerpt: 'Vergelijk geen appels met peren. Deze 7 tips helpen je de juiste installateur te kiezen.',
    content: `<h2>Offertes vergelijken: zo doe je het goed</h2><h3>1. Vergelijk totaalprijzen inclusief BTW</h3><p>Let op het BTW-tarief: 6% bij renovatie ouder dan 10 jaar, anders 21%.</p><h3>2. Check wat er wel en niet inbegrepen is</h3><p>Sommige offertes vermelden plaatsingskosten apart.</p><h3>3. Vraag naar garantievoorwaarden</h3><p>Hoeveel jaar op het toestel? En op de installatie?</p><h3>4. Controleer certificaten</h3><p>Is de installateur erkend? Heeft hij de juiste labels?</p><h3>5. Vergelijk merken en modellen</h3><p>Niet elk merk presteert even goed.</p><h3>6. Vraag referenties</h3><p>Een goede installateur deelt graag contactgegevens van tevreden klanten.</p><h3>7. Gebruik Planora</h3><p>Wij normaliseren offertes zodat je echt appels met appels vergelijkt.</p>`,
    category: 'tips',
    image: '/warmtepomp.webp',
    author: 'Planora Team',
    publishedAt: '2025-10-05',
    readTime: 5,
  },
  {
    slug: 'warmtepomp-en-vloerverwarming',
    title: 'Warmtepomp en vloerverwarming: de perfecte combinatie',
    excerpt: 'Waarom vloerverwarming het rendement van je warmtepomp tot 30% kan verhogen.',
    content: `<h2>Waarom vloerverwarming en warmtepompen zo goed samengaan</h2><p>Een warmtepomp werkt het efficiëntst bij lage aanvoertemperaturen (30-35°C). Vloerverwarming werkt precies op die temperaturen — in tegenstelling tot radiatoren die 50-70°C nodig hebben.</p><h2>Tot 30% beter rendement</h2><p>Door de lagere watertemperatuur kan de warmtepomp een hogere COP bereiken, wat direct resulteert in lager energieverbruik.</p><h2>Kosten</h2><p>Vloerverwarming kost €40-80/m² bij renovatie. Bij nieuwbouw is het verschil met radiatoren minimaal.</p>`,
    category: 'warmtepompen',
    image: '/warmtepomp.webp',
    author: 'Planora Team',
    publishedAt: '2025-09-18',
    readTime: 4,
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(p => p.slug === slug)
}

export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(p => p.category === category)
}
