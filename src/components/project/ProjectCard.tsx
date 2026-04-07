import { Link } from 'react-router-dom'
import type { Project } from '@/types/project'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      to={`/dashboard/project/${project.id}`}
      className="block rounded-xl border border-neutral-200 bg-white p-5 hover:shadow-md transition-shadow"
    >
      <h3 className="font-semibold text-neutral-900">{project.title}</h3>
      <p className="mt-1 text-sm text-neutral-500">{project.city}</p>
      <span className="mt-3 inline-block rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-700">
        {project.status}
      </span>
    </Link>
  )
}
