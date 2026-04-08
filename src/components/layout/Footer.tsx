import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { Mail, MapPin } from 'lucide-react'
import type { ReactNode } from 'react'

const footerLinks = {
  product: [
    { label: 'Warmtepompen', to: '/projecten/warmtepomp' },
    { label: 'Ramen & Deuren', to: '/projecten/ramen-deuren' },
    { label: 'Dakisolatie', to: '/projecten/dakisolatie' },
    { label: 'Hoe het werkt', to: '/hoe-het-werkt' },
  ],
  calculators: [
    { label: 'Warmtepomp calculator', to: '/calculator/warmtepomp' },
    { label: 'Ramen & deuren calculator', to: '/calculator/ramen-deuren' },
    { label: 'Dakisolatie calculator', to: '/calculator/dakisolatie' },
  ],
  kenniscentrum: [
    { label: 'Blog', to: '/blog' },
    { label: 'Prijsgids warmtepompen', to: '/gids/warmtepomp-kosten-2025' },
    { label: 'Premies 2025', to: '/gids/warmtepomp-premies-2025' },
    { label: 'Offerte checklist', to: '/gids/offerte-checklist' },
  ],
  installateurs: [
    { label: 'Word partner', to: '/voor-vaklui' },
    { label: 'Inloggen als installateur', to: '/supplier/login' },
  ],
  wettelijk: [
    { label: 'Privacybeleid', to: '#' },
    { label: 'Algemene voorwaarden', to: '#' },
    { label: 'Cookiebeleid', to: '#' },
  ],
}

export function Footer() {
  return (
    <footer
      className="relative w-full"
      style={{
        clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)',
        height: 'auto',
        minHeight: '560px',
      }}
    >
      <div className="fixed bottom-0 left-0 right-0" style={{ minHeight: '560px' }}>
        <div className="relative flex min-h-[560px] w-full flex-col justify-between bg-primary-800">
          {/* Radial gradient decoration */}
          <div aria-hidden className="absolute inset-0 isolate z-0 overflow-hidden">
            <div className="absolute -top-40 -left-20 h-[500px] w-[300px] -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(109,89,176,0.12)_0%,transparent_100%)]" />
            <div className="absolute -top-60 right-0 h-[400px] w-[250px] -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(109,89,176,0.08)_0%,transparent_100%)]" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-12 lg:flex-row">
              {/* Brand column */}
              <AnimatedContainer className="w-full max-w-xs space-y-5 shrink-0">
                <img src="/logo-white.png" alt="Planora" className="h-7" />
                <p className="text-sm text-primary-300 leading-relaxed">
                  Het slimste beslissingsplatform voor woningprojecten in België. Vergelijk offertes en beslis met vertrouwen.
                </p>
                <div className="flex flex-col gap-2">
                  <a href="mailto:info@planora.be" className="flex items-center gap-2 text-sm text-primary-300 hover:text-white transition-colors">
                    <Mail size={14} />
                    info@planora.be
                  </a>
                  <span className="flex items-center gap-2 text-sm text-primary-300">
                    <MapPin size={14} />
                    België
                  </span>
                </div>
              </AnimatedContainer>

              {/* Link columns */}
              <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
                <AnimatedContainer delay={0.1}>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-primary-400">Product</h4>
                  <ul className="mt-4 space-y-2.5">
                    {footerLinks.product.map((l) => (
                      <li key={l.label}>
                        <Link to={l.to} className="text-sm text-primary-300 hover:text-white transition-colors">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AnimatedContainer>

                <AnimatedContainer delay={0.15}>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-primary-400">Calculators</h4>
                  <ul className="mt-4 space-y-2.5">
                    {footerLinks.calculators.map((l) => (
                      <li key={l.label}>
                        <Link to={l.to} className="text-sm text-primary-300 hover:text-white transition-colors">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AnimatedContainer>

                <AnimatedContainer delay={0.2}>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-primary-400">Kenniscentrum</h4>
                  <ul className="mt-4 space-y-2.5">
                    {footerLinks.kenniscentrum.map((l) => (
                      <li key={l.label}>
                        <Link to={l.to} className="text-sm text-primary-300 hover:text-white transition-colors">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AnimatedContainer>

                <AnimatedContainer delay={0.25}>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-primary-400">Voor installateurs</h4>
                  <ul className="mt-4 space-y-2.5">
                    {footerLinks.installateurs.map((l) => (
                      <li key={l.label}>
                        <Link to={l.to} className="text-sm text-primary-300 hover:text-white transition-colors">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AnimatedContainer>

                <AnimatedContainer delay={0.3}>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-primary-400">Wettelijk</h4>
                  <ul className="mt-4 space-y-2.5">
                    {footerLinks.wettelijk.map((l) => (
                      <li key={l.label}>
                        <Link to={l.to} className="text-sm text-primary-300 hover:text-white transition-colors">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AnimatedContainer>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="relative z-10 border-t border-primary-700">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-sm text-primary-400 sm:flex-row sm:px-6 lg:px-8">
              <p>&copy; {new Date().getFullYear()} Planora. Alle rechten voorbehouden.</p>
              <p className="flex items-center gap-1.5">
                <img src="/favicon.png" alt="" className="h-4 w-4 rounded-sm" />
                Gemaakt in België
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function AnimatedContainer({ delay = 0.1, children, className }: { delay?: number; children: ReactNode; className?: string }) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
