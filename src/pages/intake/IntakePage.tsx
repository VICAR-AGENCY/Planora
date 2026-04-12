import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StepView } from '@/components/intake/StepView'
import { useIntakeStore } from '@/stores/intake-store'
import { useAuthStore } from '@/stores/auth-store'
import { useCreateProject } from '@/hooks/useProject'
import type { IntakeProjectData, IntakeStep } from '@/types/intake'

const STEP_ORDER: IntakeStep[] = [
  'category', 'property_type', 'surface', 'insulation', 'location', 'budget', 'timeline', 'summary',
]

const STEP_LABELS: Record<IntakeStep, string> = {
  category: 'Project',
  property_type: 'Woning',
  surface: 'Oppervlakte',
  insulation: 'Isolatie',
  location: 'Locatie',
  budget: 'Budget',
  timeline: 'Planning',
  summary: 'Bevestiging',
}

const CATEGORY_TO_DB: Record<string, string> = {
  warmtepomp: 'heat_pump_air_water',
  ramen_deuren: 'windows_doors',
  dakisolatie: 'roof_insulation',
  dakrenovatie: 'dakrenovatie',
  zonnepanelen: 'zonnepanelen',
  muurisolatie: 'muurisolatie',
  tegelwerken: 'tegelwerken',
}

const CATEGORY_TITLE: Record<string, string> = {
  warmtepomp: 'Warmtepomp',
  ramen_deuren: 'Ramen & deuren',
  dakisolatie: 'Dakisolatie',
  dakrenovatie: 'Dakrenovatie',
  zonnepanelen: 'Zonnepanelen',
  muurisolatie: 'Muurisolatie',
  tegelwerken: 'Tegelwerken',
}

export function IntakePage() {
  const { step, projectData, updateProjectData, setStep, reset } = useIntakeStore()
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const createProject = useCreateProject()
  const [confirmError, setConfirmError] = useState<string | null>(null)

  const currentIndex = STEP_ORDER.indexOf(step)

  const handleNext = (data: Partial<IntakeProjectData>) => {
    updateProjectData(data)
    const next = STEP_ORDER[currentIndex + 1]
    if (next) setStep(next)
  }

  const handleBack = () => {
    const prev = STEP_ORDER[currentIndex - 1]
    if (prev) setStep(prev)
  }

  const handleConfirm = async () => {
    setConfirmError(null)
    try {
      const category = projectData.category ?? ''
      const project = await createProject.mutateAsync({
        user_id: user?.id,
        title: `${CATEGORY_TITLE[category] ?? 'Project'} project`,
        category: CATEGORY_TO_DB[category] ?? category,
        status: 'intake',
        city: projectData.city ?? '',
        postal_code: projectData.postal_code ?? '',
        brief: {
          property_type: projectData.property_type ?? '',
          surface_area: projectData.surface_area ?? 0,
          insulation_level: projectData.insulation_level ?? '',
          budget_range: projectData.budget_range ?? '',
          timeline: projectData.timeline ?? '',
          current_heating: '',
          desired_system: '',
          notes: '',
          photos: [],
        },
      })
      reset()
      navigate(`/app/project/${project.id}`)
    } catch (err) {
      console.error('[IntakePage] createProject error:', err)
      setConfirmError(err instanceof Error ? err.message : JSON.stringify(err))
    }
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-neutral-50">
      {/* Progress bar */}
      <div className="border-b border-neutral-200 bg-white px-4 py-3">
        <div className="mx-auto flex max-w-lg items-center gap-2">
          {STEP_ORDER.map((s, i) => (
            <div key={s} className="flex items-center gap-1.5">
              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold transition-colors ${
                  i < currentIndex
                    ? 'bg-primary-600 text-white'
                    : i === currentIndex
                    ? 'bg-primary-600 text-white ring-4 ring-primary-100'
                    : 'bg-neutral-200 text-neutral-400'
                }`}
              >
                {i + 1}
              </div>
              {i < STEP_ORDER.length - 1 && (
                <div
                  className={`h-px flex-1 transition-colors ${
                    i < currentIndex ? 'bg-primary-600' : 'bg-neutral-200'
                  }`}
                  style={{ width: '20px' }}
                />
              )}
            </div>
          ))}
          <span className="ml-2 text-xs font-medium text-primary-700">
            {STEP_LABELS[step]}
          </span>
        </div>
      </div>

      {/* Step content */}
      <div className="flex flex-1 overflow-y-auto">
        <StepView
          step={step}
          projectData={projectData}
          onNext={handleNext}
          onBack={handleBack}
          onConfirm={handleConfirm}
          isConfirming={createProject.isPending}
          confirmError={confirmError}
        />
      </div>
    </div>
  )
}
