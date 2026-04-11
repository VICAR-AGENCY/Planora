export interface OnboardingData {
  // Stap 1 - Bedrijf
  company_name: string
  contact_name: string
  phone: string
  website: string
  description: string

  // Stap 2 - Specialisaties
  categories: string[]

  // Stap 3 - Werkgebied
  regions: { label: string; prefix: string }[]

  // Stap 4 - Beschikbaarheid
  availability: {
    days: string[]
    time_from: string
    time_to: string
    urgent: boolean
  }
  price_category: 'low' | 'medium' | 'high' | ''
}

export const EMPTY_ONBOARDING: OnboardingData = {
  company_name: '',
  contact_name: '',
  phone: '',
  website: '',
  description: '',
  categories: [],
  regions: [],
  availability: {
    days: ['mon', 'tue', 'wed', 'thu', 'fri'],
    time_from: '08:00',
    time_to: '18:00',
    urgent: false,
  },
  price_category: '',
}
