export interface PremiumInput {
  systemType: 'air-water' | 'ground-water' | 'hybrid'
  region: 'flanders' | 'wallonia' | 'brussels'
  incomeCategory: 'low' | 'medium' | 'high'
}

export interface PremiumEstimate {
  mijnVerbouwPremie: number
  federalTaxCredit: number
  totalPremium: number
  description: string
}

// MijnVerbouwPremie bedragen 2024-2025 (Vlaanderen)
const FLANDERS_PREMIUMS: Record<string, Record<string, number>> = {
  'air-water': { low: 5500, medium: 3500, high: 2500 },
  'ground-water': { low: 7500, medium: 5000, high: 3500 },
  'hybrid': { low: 3500, medium: 2000, high: 1500 },
}

export function calculatePremium(input: PremiumInput): PremiumEstimate {
  let mijnVerbouwPremie = 0
  let federalTaxCredit = 0
  let description = ''

  if (input.region === 'flanders') {
    mijnVerbouwPremie = FLANDERS_PREMIUMS[input.systemType]?.[input.incomeCategory] ?? 0
    description = 'MijnVerbouwPremie (Vlaanderen)'
  }

  // Federal tax credit: 40% of first €3,490 per dwelling (2024)
  federalTaxCredit = Math.round(3490 * 0.4)

  return {
    mijnVerbouwPremie,
    federalTaxCredit,
    totalPremium: mijnVerbouwPremie + federalTaxCredit,
    description: description || 'Federale belastingvermindering',
  }
}
