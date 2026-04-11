export type ProjectStatus = 'intake' | 'ready' | 'matching' | 'comparing' | 'decided' | 'completed'

export interface Project {
  id: string
  user_id: string
  title: string
  category: string
  status: ProjectStatus
  city: string
  postal_code: string
  brief: ProjectBrief | null
  created_at: string
  updated_at: string
}

export interface ProjectBrief {
  property_type: string
  current_heating: string
  desired_system: string
  surface_area: number
  insulation_level: string
  budget_range: string
  timeline: string
  notes: string
  photos: string[]
}
