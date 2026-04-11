export type MessageRole = 'user' | 'assistant' | 'system'

export interface IntakeMessage {
  id: string
  role: MessageRole
  content: string
  photos?: string[]
  timestamp: number
}

export type IntakeStep =
  | 'category'
  | 'property_type'
  | 'surface'
  | 'insulation'
  | 'location'
  | 'budget'
  | 'timeline'
  | 'summary'

export interface IntakeProjectData {
  category: string         // 'warmtepomp' | 'ramen_deuren' | 'dakisolatie'
  property_type: string    // 'vrijstaand' | 'halfopen' | 'rijwoning' | 'appartement'
  surface_area: number
  insulation_level: string // 'goed' | 'gemiddeld' | 'slecht'
  budget_range: string     // '<10000' | '10000-15000' | '15000-25000' | '>25000'
  timeline: string         // 'zo_snel_mogelijk' | 'dit_jaar' | 'volgend_jaar' | 'nog_niet_zeker'
  city: string
  postal_code: string
  lat?: number
  lon?: number
  photos: string[]
}

export interface IntakeState {
  projectData: Partial<IntakeProjectData>
  step: IntakeStep
}
