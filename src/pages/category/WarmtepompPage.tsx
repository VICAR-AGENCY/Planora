import { Flame } from 'lucide-react'
import { CategoryLandingPage, type CategoryConfig } from './CategoryLandingPage'

const config: CategoryConfig = {
  slug: 'warmtepomp',
  title: 'Warmtepompen',
  subtitle: 'De slimste investering voor je verwarming',
  description: 'Bespaar tot 60% op je verwarmingskosten met een warmtepomp. Planora helpt je kiezen tussen lucht-water, grond-water en hybride systemen.',
  icon: Flame,
  calculatorLink: '/calculator/warmtepomp',
  priceRange: '€5.000 – €25.000',
  premiumRange: 'Tot €7.500',
  faqs: [
    {
      question: 'Welk type warmtepomp is het beste voor mijn woning?',
      answer: 'Dat hangt af van je woningtype, isolatie en budget. Een lucht-water warmtepomp is het populairst en meest betaalbaar. Grond-water is efficiënter maar duurder. Een hybride systeem combineert een warmtepomp met je bestaande gasketel.',
    },
    {
      question: 'Hoeveel kan ik besparen met een warmtepomp?',
      answer: 'Gemiddeld bespaar je 40-60% op je verwarmingskosten. De exacte besparing hangt af van je huidige verwarmingssysteem, isolatie en energieprijzen.',
    },
    {
      question: 'Welke premies zijn er beschikbaar?',
      answer: 'In Vlaanderen kan je via MijnVerbouwPremie tot €7.500 krijgen. Daarbovenop is er een federale belastingvermindering van tot €1.396. Sommige gemeenten bieden extra premies.',
    },
    {
      question: 'Hoe lang duurt de installatie?',
      answer: 'Een lucht-water warmtepomp is meestal in 2-3 dagen geïnstalleerd. Een grond-water systeem duurt langer door de boorwerken (1-2 weken).',
    },
  ],
}

export function WarmtepompPage() {
  return <CategoryLandingPage config={config} />
}
