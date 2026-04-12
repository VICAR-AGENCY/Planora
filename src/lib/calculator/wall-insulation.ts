export interface WallInsulationInput {
  wallType: 'cavity' | 'exterior' | 'interior'
  surfaceArea: number // 30-300 m²
  houseType: 'row' | 'semi' | 'detached'
}

export function calculateWallInsulation(input: WallInsulationInput) {
  const pricePerM2 = {
    cavity: 25,
    exterior: 90,
    interior: 55,
  }

  const houseMultiplier = {
    row: 0.9,
    semi: 1.0,
    detached: 1.1,
  }[input.houseType]

  const base = pricePerM2[input.wallType] * input.surfaceArea * houseMultiplier

  const equipMin = Math.round(base * 0.85)
  const equipMax = Math.round(base * 1.15)
  const installMin = Math.round(input.surfaceArea * 10 * 0.9)
  const installMax = Math.round(input.surfaceArea * 20 * 1.1)

  return {
    surfaceArea: input.surfaceArea,
    equipmentCost: { min: equipMin, max: equipMax },
    installationCost: { min: installMin, max: installMax },
    totalCost: { min: equipMin + installMin, max: equipMax + installMax },
    annualSavings: { min: Math.round(input.surfaceArea * 3), max: Math.round(input.surfaceArea * 7) },
    paybackYears: { min: 5, max: 12 },
    estimatedPremium: Math.min(Math.round(input.surfaceArea * 15), 4000),
  }
}
