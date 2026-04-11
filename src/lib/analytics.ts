import posthog from 'posthog-js'

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY as string | undefined
const POSTHOG_HOST = (import.meta.env.VITE_POSTHOG_HOST as string | undefined) ?? 'https://eu.i.posthog.com'

let initialized = false

export function initAnalytics() {
  if (initialized || !POSTHOG_KEY) return
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    person_profiles: 'identified_only',
    capture_pageview: true,
    capture_pageleave: true,
  })
  initialized = true
}

export function track(event: string, properties?: Record<string, unknown>) {
  if (!initialized) return
  posthog.capture(event, properties)
}

// Typed event helpers
export const analytics = {
  calculatorStart: (projectType: string) =>
    track('calculator_start', { project_type: projectType }),

  calculatorComplete: (projectType: string, results: Record<string, unknown>) =>
    track('calculator_complete', { project_type: projectType, ...results }),

  leadFormOpen: (source: string, projectType?: string) =>
    track('lead_form_open', { source, project_type: projectType }),

  leadSubmitted: (source: string, projectType?: string) =>
    track('lead_submitted', { source, project_type: projectType }),
}
