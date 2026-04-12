import { useState } from 'react'
import { Users, Wrench, MapPin, Tag, CheckCircle2, AlertCircle, Clock } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { useAdminUsers, useAdminSuppliers } from '@/hooks/useAdmin'

type Tab = 'particulieren' | 'vakmensen'

const CATEGORY_LABELS: Record<string, string> = {
  warmtepomp: 'Warmtepomp',
  dakisolatie: 'Dakisolatie',
  ramen_deuren: 'Ramen & Deuren',
  zonnepanelen: 'Zonnepanelen',
  muurisolatie: 'Muurisolatie',
  vloerverwarming: 'Vloerverwarming',
  ventilatie: 'Ventilatie',
  elektriciteit: 'Elektriciteit',
  sanitair: 'Sanitair',
  dakrenovatie: 'Dakrenovatie',
  tegelwerken: 'Tegelwerken',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('nl-BE', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function AdminUsersPage() {
  const [tab, setTab] = useState<Tab>('particulieren')
  const { data: users, isLoading: usersLoading } = useAdminUsers()
  const { data: suppliers, isLoading: suppliersLoading } = useAdminSuppliers()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Gebruikers</h1>
        <p className="mt-1 text-sm text-white/40">Overzicht van alle geregistreerde gebruikers op het platform.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl bg-white/5 p-1 w-fit">
        <TabButton active={tab === 'particulieren'} onClick={() => setTab('particulieren')} icon={Users} label="Particulieren" count={users?.length} />
        <TabButton active={tab === 'vakmensen'} onClick={() => setTab('vakmensen')} icon={Wrench} label="Vakmensen" count={suppliers?.length} />
      </div>

      {/* Tables */}
      {tab === 'particulieren' && (
        <HomeownersTable data={users ?? []} loading={usersLoading} />
      )}
      {tab === 'vakmensen' && (
        <SuppliersTable data={suppliers ?? []} loading={suppliersLoading} />
      )}
    </div>
  )
}

function TabButton({ active, onClick, icon: Icon, label, count }: {
  active: boolean
  onClick: () => void
  icon: typeof Users
  label: string
  count?: number
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
        active ? 'bg-primary-600 text-white' : 'text-white/50 hover:text-white'
      )}
    >
      <Icon size={14} />
      {label}
      {count !== undefined && (
        <span className={cn(
          'rounded-full px-1.5 py-0.5 text-[10px] font-bold',
          active ? 'bg-white/20 text-white' : 'bg-white/10 text-white/40'
        )}>
          {count}
        </span>
      )}
    </button>
  )
}

function HomeownersTable({ data, loading }: { data: ReturnType<typeof useAdminUsers>['data'] & object[], loading: boolean }) {
  if (loading) return <TableSkeleton cols={5} />

  return (
    <div className="overflow-hidden rounded-2xl border border-white/8">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/8 bg-white/3">
            <Th>Naam</Th>
            <Th>E-mail</Th>
            <Th>Stad</Th>
            <Th>Postcode</Th>
            <Th>Geregistreerd</Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {data.length === 0 && (
            <tr><td colSpan={5} className="px-5 py-10 text-center text-sm text-white/30">Geen particulieren gevonden.</td></tr>
          )}
          {data.map((user) => (
            <tr key={user.id} className="transition-colors hover:bg-white/3">
              <Td>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-xs font-bold text-blue-400">
                    {(user.full_name ?? user.email).charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium text-white">{user.full_name ?? <span className="text-white/30 italic">Geen naam</span>}</span>
                </div>
              </Td>
              <Td><span className="text-white/60">{user.email}</span></Td>
              <Td><span className="text-white/60">{user.city ?? '—'}</span></Td>
              <Td><span className="text-white/60">{user.postal_code ?? '—'}</span></Td>
              <Td>
                <span className="flex items-center gap-1.5 text-white/40 text-xs">
                  <Clock size={11} />
                  {formatDate(user.created_at)}
                </span>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function SuppliersTable({ data, loading }: { data: ReturnType<typeof useAdminSuppliers>['data'] & object[], loading: boolean }) {
  if (loading) return <TableSkeleton cols={6} />

  return (
    <div className="overflow-hidden rounded-2xl border border-white/8">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/8 bg-white/3">
            <Th>Bedrijf</Th>
            <Th>Contact</Th>
            <Th>Regio's</Th>
            <Th>Categorieën</Th>
            <Th>Status</Th>
            <Th>Geregistreerd</Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {data.length === 0 && (
            <tr><td colSpan={6} className="px-5 py-10 text-center text-sm text-white/30">Geen vakmensen gevonden.</td></tr>
          )}
          {data.map((sup) => (
            <tr key={sup.id} className="transition-colors hover:bg-white/3">
              <Td>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-500/15 text-xs font-bold text-primary-400">
                    {(sup.company_name ?? sup.contact_name ?? 'V').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-white">{sup.company_name ?? <span className="italic text-white/30">Geen naam</span>}</p>
                    <p className="text-xs text-white/30">{sup.email}</p>
                  </div>
                </div>
              </Td>
              <Td><span className="text-white/60">{sup.contact_name ?? '—'}</span></Td>
              <Td>
                <div className="flex flex-wrap gap-1">
                  {sup.supplier_regions.slice(0, 3).map((r) => (
                    <span key={r.postal_code_prefix} className="flex items-center gap-0.5 rounded-full bg-white/8 px-2 py-0.5 text-[10px] text-white/50">
                      <MapPin size={9} />
                      {r.city}
                    </span>
                  ))}
                  {sup.supplier_regions.length > 3 && (
                    <span className="rounded-full bg-white/8 px-2 py-0.5 text-[10px] text-white/40">
                      +{sup.supplier_regions.length - 3}
                    </span>
                  )}
                  {sup.supplier_regions.length === 0 && <span className="text-white/20 text-xs">—</span>}
                </div>
              </Td>
              <Td>
                <div className="flex flex-wrap gap-1">
                  {sup.supplier_categories.slice(0, 2).map((c) => (
                    <span key={c.category} className="flex items-center gap-0.5 rounded-full bg-white/8 px-2 py-0.5 text-[10px] text-white/50">
                      <Tag size={9} />
                      {CATEGORY_LABELS[c.category] ?? c.category}
                    </span>
                  ))}
                  {sup.supplier_categories.length > 2 && (
                    <span className="rounded-full bg-white/8 px-2 py-0.5 text-[10px] text-white/40">
                      +{sup.supplier_categories.length - 2}
                    </span>
                  )}
                  {sup.supplier_categories.length === 0 && <span className="text-white/20 text-xs">—</span>}
                </div>
              </Td>
              <Td>
                <div className="flex flex-col gap-1">
                  {sup.onboarding_completed ? (
                    <Badge color="green" icon={CheckCircle2}>Voltooid</Badge>
                  ) : (
                    <Badge color="amber" icon={AlertCircle}>Onvolledig</Badge>
                  )}
                  {sup.verified ? (
                    <Badge color="blue" icon={CheckCircle2}>Geverifieerd</Badge>
                  ) : (
                    <Badge color="neutral" icon={Clock}>Niet geverifieerd</Badge>
                  )}
                </div>
              </Td>
              <Td>
                <span className="flex items-center gap-1.5 text-white/40 text-xs">
                  <Clock size={11} />
                  {formatDate(sup.created_at)}
                </span>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/30">
      {children}
    </th>
  )
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-5 py-3.5">{children}</td>
}

function Badge({
  children,
  color,
  icon: Icon,
}: {
  children: React.ReactNode
  color: 'green' | 'amber' | 'blue' | 'neutral'
  icon: typeof CheckCircle2
}) {
  const styles = {
    green:   'bg-green-500/15 text-green-400',
    amber:   'bg-amber-500/15 text-amber-400',
    blue:    'bg-blue-500/15 text-blue-400',
    neutral: 'bg-white/8 text-white/30',
  }[color]

  return (
    <span className={cn('flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold', styles)}>
      <Icon size={9} />
      {children}
    </span>
  )
}

function TableSkeleton({ cols }: { cols: number }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/8">
      <div className="border-b border-white/8 bg-white/3 px-5 py-3">
        <div className="h-4 w-48 animate-pulse rounded bg-white/10" />
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex gap-6 border-b border-white/5 px-5 py-4">
          {Array.from({ length: cols }).map((_, j) => (
            <div key={j} className="h-4 flex-1 animate-pulse rounded bg-white/5" />
          ))}
        </div>
      ))}
    </div>
  )
}
