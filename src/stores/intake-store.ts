import { create } from 'zustand'
import type { IntakeMessage, IntakeProjectData, IntakeStep } from '@/types/intake'

interface IntakeStore {
  messages: IntakeMessage[]
  isLoading: boolean
  projectData: Partial<IntakeProjectData>
  step: IntakeStep
  addMessage: (message: IntakeMessage) => void
  setLoading: (loading: boolean) => void
  updateProjectData: (data: Partial<IntakeProjectData>) => void
  setStep: (step: IntakeStep) => void
  reset: () => void
}

export const useIntakeStore = create<IntakeStore>((set) => ({
  messages: [],
  isLoading: false,
  projectData: {},
  step: 'greeting',
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setLoading: (isLoading) => set({ isLoading }),
  updateProjectData: (data) =>
    set((state) => ({ projectData: { ...state.projectData, ...data } })),
  setStep: (step) => set({ step }),
  reset: () =>
    set({ messages: [], isLoading: false, projectData: {}, step: 'greeting' }),
}))
