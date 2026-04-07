export interface WindowItem {
  id: string
  name: string
  width: number // in cm
  height: number // in cm
  material: 'pvc' | 'aluminium' | 'wood'
  glazing: 'double' | 'triple'
  opening: 'fixed' | 'draaikip' | 'schuif'
}

export interface WindowPriceInput {
  windows: WindowItem[]
  includeInstallation: boolean
  includeDemolition: boolean
  includeFinishing: boolean
}

export interface WindowPriceResult {
  windows: {
    item: WindowItem
    area: number // m²
    basePrice: number
    materialCost: number
    glazingCost: number
    openingCost: number
    totalPrice: number
  }[]
  subtotal: number
  installationCost: number
  demolitionCost: number
  finishingCost: number
  totalBeforeVAT: number
  vat: number
  totalWithVAT: number
  estimatedPremium: number
  pricePerM2: number
}

// Prijzen per m² gebaseerd op Belgische marktprijzen 2025
const materialPricePerM2 = {
  pvc: 450,
  aluminium: 650,
  wood: 750,
}

const glazingPricePerM2 = {
  double: 150,
  triple: 280,
}

const openingMultiplier = {
  fixed: 1.0,
  draaikip: 1.35,
  schuif: 1.5,
}

const installationPerWindow = 180
const demolitionPerWindow = 120
const finishingPerWindow = 85

export function calculateWindowPrice(input: WindowPriceInput): WindowPriceResult {
  const windowResults = input.windows.map((item) => {
    const area = (item.width * item.height) / 10000 // cm² to m²
    const basePrice = area * 200 // Basis arbeid/overhead

    const materialCost = area * materialPricePerM2[item.material]
    const glazingCost = area * glazingPricePerM2[item.glazing]
    const openingMultiplierValue = openingMultiplier[item.opening]

    const totalPrice = Math.round(
      (basePrice + materialCost + glazingCost) * openingMultiplierValue
    )

    return {
      item,
      area: Math.round(area * 100) / 100,
      basePrice: Math.round(basePrice),
      materialCost: Math.round(materialCost),
      glazingCost: Math.round(glazingCost),
      openingCost: Math.round((basePrice + materialCost + glazingCost) * (openingMultiplierValue - 1)),
      totalPrice,
    }
  })

  const subtotal = windowResults.reduce((sum, w) => sum + w.totalPrice, 0)
  const windowCount = input.windows.length

  const installationCost = input.includeInstallation ? windowCount * installationPerWindow : 0
  const demolitionCost = input.includeDemolition ? windowCount * demolitionPerWindow : 0
  const finishingCost = input.includeFinishing ? windowCount * finishingPerWindow : 0

  const totalBeforeVAT = subtotal + installationCost + demolitionCost + finishingCost
  const vat = Math.round(totalBeforeVAT * 0.06) // 6% BTW voor renovatie
  const totalWithVAT = totalBeforeVAT + vat

  const totalArea = windowResults.reduce((sum, w) => sum + w.area, 0)
  const pricePerM2 = totalArea > 0 ? Math.round(totalWithVAT / totalArea) : 0

  // Vlaamse premie: tot €400 per raam, max €4000
  const estimatedPremium = Math.min(windowCount * 400, 4000)

  return {
    windows: windowResults,
    subtotal,
    installationCost,
    demolitionCost,
    finishingCost,
    totalBeforeVAT,
    vat,
    totalWithVAT,
    estimatedPremium,
    pricePerM2,
  }
}

export function generateWindowId(): string {
  return Math.random().toString(36).substring(2, 9)
}

export function createDefaultWindow(index: number): WindowItem {
  return {
    id: generateWindowId(),
    name: `Raam ${index}`,
    width: 100,
    height: 120,
    material: 'pvc',
    glazing: 'double',
    opening: 'draaikip',
  }
}
