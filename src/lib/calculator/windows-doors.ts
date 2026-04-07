export interface WindowsDoorInput {
  windowCount: number // 1-20
  windowType: 'pvc' | 'aluminium' | 'wood'
  glazingType: 'double' | 'triple'
  doorCount: number // 0-5
}

export function calculateWindowsDoors(input: WindowsDoorInput) {
  const pricePerWindow = {
    pvc: { double: 800, triple: 1100 },
    aluminium: { double: 1200, triple: 1600 },
    wood: { double: 1400, triple: 1900 },
  }

  const doorPrice = { double: 1800, triple: 2400 }

  const baseWindowPrice = pricePerWindow[input.windowType][input.glazingType]
  const baseDoorPrice = doorPrice[input.glazingType]

  const installPerWindow = 250
  const installPerDoor = 400

  const equipMin = (baseWindowPrice * input.windowCount + baseDoorPrice * input.doorCount) * 0.9
  const equipMax = (baseWindowPrice * input.windowCount + baseDoorPrice * input.doorCount) * 1.15
  const installMin = (installPerWindow * input.windowCount + installPerDoor * input.doorCount) * 0.9
  const installMax = (installPerWindow * input.windowCount + installPerDoor * input.doorCount) * 1.1

  return {
    windowCount: input.windowCount,
    doorCount: input.doorCount,
    equipmentCost: { min: Math.round(equipMin), max: Math.round(equipMax) },
    installationCost: { min: Math.round(installMin), max: Math.round(installMax) },
    totalCost: { min: Math.round(equipMin + installMin), max: Math.round(equipMax + installMax) },
    annualSavings: { min: Math.round(input.windowCount * 60), max: Math.round(input.windowCount * 120) },
    paybackYears: { min: 6, max: 12 },
    estimatedPremium: Math.min(input.windowCount * 400, 4000),
  }
}
