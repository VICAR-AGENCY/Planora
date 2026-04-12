export interface SolarPanelInput {
  roofOrientation: 'south' | 'east_west' | 'north'
  panelCount: number // 4-30
  batteryStorage: boolean
}

export function calculateSolarPanels(input: SolarPanelInput) {
  const wattPeakPerPanel = 400 // Wp per panel
  const pricePerPanel = 350 // installed
  const batteryPrice = 5000

  const orientationFactor = {
    south: 1.0,
    east_west: 0.85,
    north: 0.65,
  }[input.roofOrientation]

  const annualKwhPerKwp = 900 // Belgium average for south orientation
  const totalKwp = (input.panelCount * wattPeakPerPanel) / 1000
  const annualProduction = Math.round(totalKwp * annualKwhPerKwp * orientationFactor)

  const panelCost = input.panelCount * pricePerPanel
  const batteryCost = input.batteryStorage ? batteryPrice : 0
  const totalMin = Math.round((panelCost + batteryCost) * 0.9)
  const totalMax = Math.round((panelCost + batteryCost) * 1.1)

  const electricityPrice = 0.28 // €/kWh
  const selfConsumptionRate = input.batteryStorage ? 0.75 : 0.5
  const annualSavingsMin = Math.round(annualProduction * selfConsumptionRate * electricityPrice * 0.85)
  const annualSavingsMax = Math.round(annualProduction * selfConsumptionRate * electricityPrice * 1.15)

  const paybackMin = Math.round(totalMin / annualSavingsMax)
  const paybackMax = Math.round(totalMax / annualSavingsMin)

  return {
    panelCount: input.panelCount,
    totalKwp,
    annualProduction,
    totalCost: { min: totalMin, max: totalMax },
    annualSavings: { min: annualSavingsMin, max: annualSavingsMax },
    paybackYears: { min: paybackMin, max: paybackMax },
    estimatedPremium: 0, // Vlaamse premies afgeschaft, maar BTW 6%
  }
}
