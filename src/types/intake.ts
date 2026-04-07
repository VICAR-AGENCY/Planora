export type MessageRole = 'user' | 'assistant' | 'system'

export interface IntakeMessage {
  id: string
  role: MessageRole
  content: string
  photos?: string[]
  timestamp: number
}

export interface IntakeState {
  messages: IntakeMessage[]
  isLoading: boolean
  projectData: Partial<IntakeProjectData>
  step: IntakeStep
}

export interface IntakeProjectData {
  property_type: string
  current_heating: string
  desired_system: string
  surface_area: number
  insulation_level: string
  budget_range: { min: number; max: number }
  timeline: string
  city: string
  postal_code: string
  photos: string[]
}

export type IntakeStep = 'greeting' | 'property' | 'heating' | 'preferences' | 'budget' | 'summary' | 'confirmed'
