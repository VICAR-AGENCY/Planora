import type { ProjectBrief as ProjectBriefType } from '@/types/project'

interface ProjectBriefProps {
  brief: ProjectBriefType
}

export function ProjectBrief({ brief }: ProjectBriefProps) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-6">
      <h3 className="text-lg font-semibold text-neutral-900">Projectbrief</h3>
      <dl className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <dt className="text-sm text-neutral-500">Woningtype</dt>
          <dd className="font-medium text-neutral-900">{brief.property_type}</dd>
        </div>
        <div>
          <dt className="text-sm text-neutral-500">Huidige verwarming</dt>
          <dd className="font-medium text-neutral-900">{brief.current_heating}</dd>
        </div>
        <div>
          <dt className="text-sm text-neutral-500">Gewenst systeem</dt>
          <dd className="font-medium text-neutral-900">{brief.desired_system}</dd>
        </div>
        <div>
          <dt className="text-sm text-neutral-500">Oppervlakte</dt>
          <dd className="font-medium text-neutral-900">{brief.surface_area} m²</dd>
        </div>
      </dl>
    </div>
  )
}
