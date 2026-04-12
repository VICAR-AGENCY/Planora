export interface DakrenovatieInput {
  roofType: 'pitched' | 'flat'
  surfaceArea: number // 30-300 m²
  scope: 'partial' | 'full'
  material: 'tiles' | 'slate' | 'metal'
}

export function calculateDakrenovatie(input: DakrenovatieInput) {
  const pricePerM2 = {
    tiles: { pitched: 80, flat: 70 },
    slate: { pitched: 120, flat: 100 },
    metal: { pitched: 95, flat: 85 },
  }

  const scopeMultiplier = input.scope === 'partial' ? 0.6 : 1.0
  const base = pricePerM2[input.material][input.roofType] * input.surfaceArea * scopeMultiplier

  const equipMin = Math.round(base * 0.85)
  const equipMax = Math.round(base * 1.15)
  const installMin = Math.round(input.surfaceArea * scopeMultiplier * 20 * 0.9)
  const installMax = Math.round(input.surfaceArea * scopeMultiplier * 35 * 1.1)

  const totalMin = equipMin + installMin
  const totalMax = equipMax + installMax

  return {
    surfaceArea: input.surfaceArea,
    scope: input.scope,
    equipmentCost: { min: equipMin, max: equipMax },
    installationCost: { min: installMin, max: installMax },
    totalCost: { min: totalMin, max: totalMax },
    annualSavings: { min: Math.round(input.surfaceArea * 2), max: Math.round(input.surfaceArea * 5) },
    paybackYears: { min: 15, max: 25 },
    estimatedPremium: Math.min(Math.round(totalMin * 0.1), 3000),
  }
}
