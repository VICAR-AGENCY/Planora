import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, FileText, MessageCircle, CheckCircle2, Search, BarChart3, Trophy } from 'lucide-react'
import { useProject } from '@/hooks/useProject'

const STATUS_STEPS = [
  { key: 'intake', label: 'Intake', icon: FileText },
  { key: 'matching', label: 'Matching', icon: Search },
  { key: 'comparing', label: 'Offertes', icon: BarChart3 },
  { key: 'decided', label: 'Beslist', icon: Trophy },
  { key: 'completed', label: 'Afgerond', icon: CheckCircle2 },
]

const statusIndex: Record<string, number> = {
  intake: 0,
  ready: 1,
  matching: 1,
  comparing: 2,
  decided: 3,
  completed: 4,
}

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: project, isLoading } = useProject(id ?? '')

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 animate-pulse rounded bg-neutral-200" />
        <div className="h-4 w-32 animate-pulse rounded bg-neutral-100" />
        <div className="mt-8 h-20 animate-pulse rounded-xl bg-neutral-100" />
        <div className="mt-4 h-48 animate-pulse rounded-xl bg-neutral-100" />
      </div>
    )
  }

  if (!project) {
    return <p className="py-20 text-center text-neutral-500">Project niet gevonden.</p>
  }

  const currentStep = statusIndex[project.status] ?? 0

  return (
    <div>
      {/* Back link */}
      <Link to="/app/dashboard" className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 mb-6">
        <ArrowLeft size={16} />
        Terug naar dashboard
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">{project.title}</h1>
          <p className="mt-1 text-neutral-500">{project.city} — {project.category}</p>
        </div>
      </div>

      {/* Status stepper */}
      <div className="mt-8 rounded-xl border border-neutral-100 bg-white p-6">
        <div className="flex items-center justify-between">
          {STATUS_STEPS.map((step, i) => (
            <div key={step.key} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    i <= currentStep
                      ? 'bg-primary-600 text-white'
                      : 'bg-neutral-100 text-neutral-400'
                  }`}
                >
                  <step.icon size={18} />
                </div>
                <span className={`mt-2 text-xs font-medium ${i <= currentStep ? 'text-primary-700' : 'text-neutral-400'}`}>
                  {step.label}
                </span>
              </div>
              {i < STATUS_STEPS.length - 1 && (
                <div className={`mx-2 h-px w-8 sm:w-16 ${i < currentStep ? 'bg-primary-600' : 'bg-neutral-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Project brief */}
      {project.brief && (
        <div className="mt-6 rounded-xl border border-neutral-100 bg-white p-6">
          <h2 className="text-lg font-semibold text-neutral-900">Projectbrief</h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-neutral-500">Woningtype</dt>
              <dd className="font-medium text-neutral-900">{project.brief.property_type}</dd>
            </div>
            <div>
              <dt className="text-sm text-neutral-500">Huidige verwarming</dt>
              <dd className="font-medium text-neutral-900">{project.brief.current_heating}</dd>
            </div>
            <div>
              <dt className="text-sm text-neutral-500">Gewenst systeem</dt>
              <dd className="font-medium text-neutral-900">{project.brief.desired_system}</dd>
            </div>
            <div>
              <dt className="text-sm text-neutral-500">Oppervlakte</dt>
              <dd className="font-medium text-neutral-900">{project.brief.surface_area} m²</dd>
            </div>
          </dl>
          {project.brief.photos && project.brief.photos.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-neutral-500 mb-3">Foto's</h3>
              <div className="flex gap-3 overflow-x-auto">
                {project.brief.photos.map((url, i) => (
                  <img key={i} src={url} alt={`Foto ${i + 1}`} className="h-24 w-24 rounded-xl object-cover shrink-0" />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Link
          to={`/app/project/${project.id}/offertes`}
          className="flex items-center gap-4 rounded-xl border border-neutral-100 bg-white p-5 hover:shadow-md transition-shadow"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50">
            <BarChart3 size={20} className="text-primary-600" />
          </div>
          <div>
            <p className="font-semibold text-neutral-900">Offertes vergelijken</p>
            <p className="text-sm text-neutral-500">Bekijk en vergelijk ontvangen offertes</p>
          </div>
        </Link>
        <Link
          to="/app/berichten"
          className="flex items-center gap-4 rounded-xl border border-neutral-100 bg-white p-5 hover:shadow-md transition-shadow"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-50">
            <MessageCircle size={20} className="text-accent-600" />
          </div>
          <div>
            <p className="font-semibold text-neutral-900">Berichten</p>
            <p className="text-sm text-neutral-500">Communiceer met installateurs</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
