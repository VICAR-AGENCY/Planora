import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, Flame, Square, Home, Users, ChevronRight, User } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useSupplier } from '@/hooks/useSupplier'
import { cn } from '@/lib/utils/cn'

const projectTypes = [
  {
    label: 'Warmtepompen',
    icon: Flame,
    description: 'Duurzaam verwarmen en koelen',
    links: [
      { label: 'Overzicht', to: '/projecten/warmtepomp' },
      { label: 'Calculator', to: '/calculator/warmtepomp' },
      { label: 'Prijsgids 2025', to: '/gids/warmtepomp-kosten-2025' },
      { label: 'Premies 2025', to: '/gids/warmtepomp-premies-2025' },
    ],
  },
  {
    label: 'Ramen & Deuren',
    icon: Square,
    description: 'Isolerend schrijnwerk',
    links: [
      { label: 'Overzicht', to: '/projecten/ramen-deuren' },
      { label: 'Calculator', to: '/calculator/raamprijs' },
      { label: 'Prijsgids 2025', to: '/gids/ramen-kosten-2025' },
      { label: 'Premies 2025', to: '/gids/ramen-premies-2025' },
    ],
  },
  {
    label: 'Dakisolatie',
    icon: Home,
    description: 'Isoleer je dak en bespaar',
    links: [
      { label: 'Overzicht', to: '/projecten/dakisolatie' },
      { label: 'Calculator', to: '/calculator/dakisolatie' },
      { label: 'Prijsgids 2025', to: '/gids/dakisolatie-kosten-2025' },
      { label: 'Premies 2025', to: '/gids/dakisolatie-premies-2025' },
    ],
  },
]

const navItems = [
  {
    label: 'Type Project',
    isMegaMenu: true,
  },
  {
    label: 'Onze Vakmensen',
    to: '/vakmensen',
    icon: Users,
  },
  {
    label: 'Hoe het werkt',
    to: '/hoe-het-werkt',
  },
  {
    label: 'Blog',
    to: '/blog',
  },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const { isAuthenticated } = useAuth()
  const { data: supplier } = useSupplier()
  const { pathname } = useLocation()
  const dashboardTo = supplier ? '/supplier/dashboard' : '/app/dashboard'

  return (
    <header className="border-b border-primary-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="shrink-0">
          <img src="/logo.png" alt="Planora" className="h-8" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) =>
            item.isMegaMenu ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setMegaMenuOpen(true)}
                onMouseLeave={() => setMegaMenuOpen(false)}
              >
                <button
                  className={cn(
                    'flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    megaMenuOpen
                      ? 'text-primary-700 bg-primary-50'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                  )}
                >
                  {item.label}
                  <ChevronDown size={14} className={cn('transition-transform', megaMenuOpen && 'rotate-180')} />
                </button>

                {/* Mega Menu */}
                {megaMenuOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50">
                    <div className="rounded-2xl border border-primary-100 bg-white shadow-xl min-w-[900px]">
                      <div className="p-6">
                        <div className="grid grid-cols-3 gap-4">
                          {projectTypes.map((project) => (
                            <div
                              key={project.label}
                              className="group rounded-xl border border-neutral-100 bg-neutral-50/50 p-4 hover:border-primary-200 hover:bg-primary-50/50 transition-all"
                            >
                              <div className="flex items-center gap-3 mb-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-600 group-hover:bg-primary-200 transition-colors">
                                  <project.icon size={20} />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-neutral-900">{project.label}</h3>
                                  <p className="text-xs text-neutral-500">{project.description}</p>
                                </div>
                              </div>
                              <div className="space-y-1">
                                {project.links.map((link) => (
                                  <Link
                                    key={link.to}
                                    to={link.to}
                                    className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-neutral-600 hover:bg-white hover:text-primary-700 transition-colors"
                                  >
                                    {link.label}
                                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-50" />
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="border-t border-primary-100 bg-neutral-50/50 px-6 py-4 rounded-b-2xl">
                        <p className="text-sm text-neutral-500">
                          Meer projecttypes komen binnenkort:{' '}
                          <span className="text-neutral-400">Dakrenovatie, Zonnepanelen, Muurisolatie, Tegelwerken...</span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                to={item.to!}
                className={cn(
                  'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  pathname === item.to
                    ? 'text-primary-700 bg-primary-50'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                )}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Desktop right */}
        <div className="hidden items-center gap-3 lg:flex">
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link
                to={dashboardTo}
                className="rounded-xl bg-primary-600 px-5 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/app/profiel"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors"
                aria-label="Profiel"
              >
                <User size={18} className="text-neutral-600" />
              </Link>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                Inloggen
              </Link>
              <Link
                to="/app/nieuw-project"
                className="rounded-xl bg-primary-600 px-5 py-2 text-sm font-medium text-white shadow-md shadow-primary-600/20 hover:bg-primary-700 transition-colors"
              >
                Start je project
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 -mr-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="border-t border-primary-100 bg-white px-4 pb-4 lg:hidden max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col gap-1 pt-3">
            {/* Type Project Section */}
            <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Type Project
            </p>
            {projectTypes.map((project) => (
              <div key={project.label} className="mb-2">
                <div className="flex items-center gap-2 px-3 py-2">
                  <project.icon size={16} className="text-primary-600" />
                  <span className="text-sm font-medium text-neutral-700">{project.label}</span>
                </div>
                <div className="ml-6 space-y-1">
                  {project.links.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="block rounded-lg px-3 py-2 text-sm text-neutral-600 hover:bg-primary-50"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <div className="border-t border-primary-100 my-2" />

            {/* Other nav items */}
            <Link
              to="/vakmensen"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-primary-50"
              onClick={() => setMobileOpen(false)}
            >
              <Users size={16} className="text-primary-600" />
              Onze Vakmensen
            </Link>
            <Link
              to="/hoe-het-werkt"
              className="rounded-lg px-3 py-2 text-sm text-neutral-600 hover:bg-primary-50"
              onClick={() => setMobileOpen(false)}
            >
              Hoe het werkt
            </Link>
            <Link
              to="/blog"
              className="rounded-lg px-3 py-2 text-sm text-neutral-600 hover:bg-primary-50"
              onClick={() => setMobileOpen(false)}
            >
              Blog
            </Link>

            <div className="mt-3 border-t border-primary-100 pt-3 flex flex-col gap-2">
              {isAuthenticated ? (
                <Link
                  to="/app/dashboard"
                  className="rounded-xl bg-primary-600 px-4 py-2.5 text-center text-sm font-medium text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="rounded-xl border border-neutral-300 px-4 py-2.5 text-center text-sm font-medium text-neutral-700"
                    onClick={() => setMobileOpen(false)}
                  >
                    Inloggen
                  </Link>
                  <Link
                    to="/app/nieuw-project"
                    className="rounded-xl bg-primary-600 px-4 py-2.5 text-center text-sm font-medium text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    Start je project
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}
