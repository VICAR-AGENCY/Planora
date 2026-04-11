import { create } from 'zustand'
import type { IntakeProjectData, IntakeStep } from '@/types/intake'

interface IntakeStore {
  projectData: Partial<IntakeProjectData>
  step: IntakeStep
  updateProjectData: (data: Partial<IntakeProjectData>) => void
  setStep: (step: IntakeStep) => void
  reset: () => void
}

export const useIntakeStore = create<IntakeStore>((set) => ({
  projectData: {},
  step: 'category',
  updateProjectData: (data) =>
    set((state) => ({ projectData: { ...state.projectData, ...data } })),
  setStep: (step) => set({ step }),
  reset: () => set({ projectData: {}, step: 'category' }),
}))
