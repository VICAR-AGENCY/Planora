export interface RoofInsulationInput {
  roofType: 'pitched' | 'flat'
  surfaceArea: number // 30-300 m²
  insulationMethod: 'interior' | 'sarking' | 'spray'
  currentInsulation: 'none' | 'thin' | 'old'
}

export function calculateRoofInsulation(input: RoofInsulationInput) {
  const pricePerM2 = {
    interior: { pitched: 45, flat: 40 },
    sarking: { pitched: 90, flat: 75 },
    spray: { pitched: 35, flat: 30 },
  }

  const base = pricePerM2[input.insulationMethod][input.roofType] * input.surfaceArea
  const multiplier = input.currentInsulation === 'none' ? 1.0 : input.currentInsulation === 'thin' ? 0.9 : 0.85

  const equipMin = Math.round(base * multiplier * 0.85)
  const equipMax = Math.round(base * multiplier * 1.15)
  const installMin = Math.round(input.surfaceArea * 15 * 0.9)
  const installMax = Math.round(input.surfaceArea * 25 * 1.1)

  return {
    surfaceArea: input.surfaceArea,
    equipmentCost: { min: equipMin, max: equipMax },
    installationCost: { min: installMin, max: installMax },
    totalCost: { min: equipMin + installMin, max: equipMax + installMax },
    annualSavings: { min: Math.round(input.surfaceArea * 4), max: Math.round(input.surfaceArea * 8) },
    paybackYears: { min: 3, max: 6 },
    estimatedPremium: Math.min(Math.round(input.surfaceArea * 20), 5000),
  }
}
