import { Home } from 'lucide-react'
import { CategoryLandingPage, type CategoryConfig } from './CategoryLandingPage'

const config: CategoryConfig = {
  slug: 'dakisolatie',
  title: 'Dakisolatie',
  subtitle: 'De snelste weg naar een lagere energiefactuur',
  description: 'Tot 30% van je warmte verdwijnt via het dak. Dakisolatie is de meest rendabele renovatie-investering. Vergelijk installateurs en prijzen.',
  icon: Home,
  priceRange: '€3.000 – €12.000',
  premiumRange: 'Tot €5.000',
  faqs: [
    {
      question: 'Welke soorten dakisolatie zijn er?',
      answer: 'De meest voorkomende zijn: isolatie langs de binnenkant (tussen de kepers), sarking (langs de buitenkant), en vlakke dakisolatie (voor platte daken). PIR, PUR, minerale wol en cellulose zijn gangbare materialen.',
    },
    {
      question: 'Hoeveel bespaar ik met dakisolatie?',
      answer: 'Gemiddeld bespaar je 20-30% op je verwarmingskosten. De terugverdientijd is meestal 3-5 jaar, waardoor het één van de beste investeringen is.',
    },
    {
      question: 'Kan ik mijn dak isoleren zonder de dakbedekking te verwijderen?',
      answer: 'Ja, isolatie langs de binnenkant (tussen de kepers) kan zonder de dakbedekking aan te raken. Bij sarking wordt de bedekking wel tijdelijk verwijderd.',
    },
    {
      question: 'Welke premies zijn er voor dakisolatie?',
      answer: 'Via MijnVerbouwPremie kan je tot €5.000 premie krijgen voor dakisolatie in Vlaanderen. De federale belastingvermindering is ook van toepassing.',
    },
  ],
}

export function DakisolatiePage() {
  return <CategoryLandingPage config={config} />
}
