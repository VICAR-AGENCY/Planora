export interface TilingInput {
  tileType: 'floor' | 'wall' | 'both'
  surfaceArea: number // 5-100 m²
  tileQuality: 'standard' | 'premium' | 'luxury'
}

export function calculateTiling(input: TilingInput) {
  const materialPerM2 = {
    standard: 25,
    premium: 55,
    luxury: 110,
  }

  const typeMultiplier = {
    floor: 1.0,
    wall: 1.15,
    both: 1.0, // average
  }[input.tileType]

  const material = materialPerM2[input.tileQuality] * input.surfaceArea * typeMultiplier

  const laborPerM2 = {
    floor: 35,
    wall: 45,
    both: 40,
  }[input.tileType]

  const labor = laborPerM2 * input.surfaceArea

  const equipMin = Math.round(material * 0.9)
  const equipMax = Math.round(material * 1.1)
  const installMin = Math.round(labor * 0.9)
  const installMax = Math.round(labor * 1.1)

  return {
    surfaceArea: input.surfaceArea,
    equipmentCost: { min: equipMin, max: equipMax },
    installationCost: { min: installMin, max: installMax },
    totalCost: { min: equipMin + installMin, max: equipMax + installMax },
  }
}
