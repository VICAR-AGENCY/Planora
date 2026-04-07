export interface HeatPumpInput {
  propertyType: 'detached' | 'semi-detached' | 'terraced' | 'apartment'
  surfaceArea: number
  insulationLevel: 'good' | 'average' | 'poor'
  systemType: 'air-water' | 'ground-water' | 'hybrid'
}

export interface HeatPumpEstimate {
  equipmentCost: { min: number; max: number }
  installationCost: { min: number; max: number }
  totalCost: { min: number; max: number }
  annualSavings: { min: number; max: number }
  paybackYears: { min: number; max: number }
  recommendedPower: number // kW
}

const COST_PER_KW: Record<string, { min: number; max: number }> = {
  'air-water': { min: 800, max: 1200 },
  'ground-water': { min: 1200, max: 1800 },
  'hybrid': { min: 600, max: 1000 },
}

const INSULATION_FACTOR: Record<string, number> = {
  good: 0.04,
  average: 0.06,
  poor: 0.08,
}

const INSTALLATION_BASE: Record<string, { min: number; max: number }> = {
  'air-water': { min: 2500, max: 4500 },
  'ground-water': { min: 5000, max: 10000 },
  'hybrid': { min: 2000, max: 3500 },
}

export function calculateHeatPump(input: HeatPumpInput): HeatPumpEstimate {
  const factor = INSULATION_FACTOR[input.insulationLevel]
  const recommendedPower = Math.ceil(input.surfaceArea * factor)

  const costPerKw = COST_PER_KW[input.systemType]
  const equipmentCost = {
    min: recommendedPower * costPerKw.min,
    max: recommendedPower * costPerKw.max,
  }

  const installationCost = INSTALLATION_BASE[input.systemType]

  const totalCost = {
    min: equipmentCost.min + installationCost.min,
    max: equipmentCost.max + installationCost.max,
  }

  // Rough annual savings estimate (vs gas heating)
  const currentCostPerM2 = input.insulationLevel === 'good' ? 12 : input.insulationLevel === 'average' ? 16 : 22
  const heatPumpCostPerM2 = currentCostPerM2 * 0.35 // COP ~3 efficiency
  const annualSavingsPerM2 = currentCostPerM2 - heatPumpCostPerM2

  const annualSavings = {
    min: Math.round(input.surfaceArea * annualSavingsPerM2 * 0.8),
    max: Math.round(input.surfaceArea * annualSavingsPerM2 * 1.2),
  }

  const paybackYears = {
    min: Math.round(totalCost.min / annualSavings.max),
    max: Math.round(totalCost.max / annualSavings.min),
  }

  return { equipmentCost, installationCost, totalCost, annualSavings, paybackYears, recommendedPower }
}
