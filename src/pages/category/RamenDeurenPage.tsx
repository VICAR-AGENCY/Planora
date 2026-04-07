import { DoorOpen } from 'lucide-react'
import { CategoryLandingPage, type CategoryConfig } from './CategoryLandingPage'

const config: CategoryConfig = {
  slug: 'ramen-deuren',
  title: 'Ramen & Deuren',
  subtitle: 'Investeer in comfort en energiebesparing',
  description: 'Nieuwe ramen en deuren verbeteren je isolatie, comfort en veiligheid. Vergelijk offertes van gecertificeerde schrijnwerkers in jouw regio.',
  icon: DoorOpen,
  priceRange: '€5.000 – €20.000',
  premiumRange: 'Tot €4.000',
  faqs: [
    {
      question: 'Wanneer moeten ramen vervangen worden?',
      answer: 'Als je enkele beglazing of oude dubbele beglazing hebt (>20 jaar), condens tussen de ruiten ziet, of tocht ervaart, is het tijd voor vervanging.',
    },
    {
      question: 'Wat is het verschil tussen PVC, aluminium en hout?',
      answer: 'PVC is het goedkoopst en onderhoudsvriendelijk. Aluminium is slank en modern maar duurder. Hout biedt de beste isolatie maar vraagt onderhoud.',
    },
    {
      question: 'Welke premies zijn er voor nieuwe ramen?',
      answer: 'Via MijnVerbouwPremie kan je in Vlaanderen tot €4.000 premie krijgen voor hoogrendementsbeglazing, afhankelijk van je inkomenscategorie.',
    },
    {
      question: 'Hoelang duurt de plaatsing?',
      answer: 'Voor een gemiddelde woning duurt de vervanging van alle ramen 2-5 werkdagen. De exacte duur hangt af van het aantal ramen en de complexiteit.',
    },
  ],
}

export function RamenDeurenPage() {
  return <CategoryLandingPage config={config} />
}
