import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { PublicLayout } from '@/components/layout/PublicLayout'
import { AppLayout } from '@/components/layout/AppLayout'
import { SupplierLayout } from '@/components/layout/SupplierLayout'
import { AdminLayout } from '@/components/layout/AdminLayout'

// Public pages
import { HomePage } from '@/pages/marketing/HomePage'
import { HowItWorksPage } from '@/pages/marketing/HowItWorksPage'
import { AboutPage } from '@/pages/marketing/AboutPage'
import { VakmannenPage } from '@/pages/marketing/VakmannenPage'
import { WarmtepompPage } from '@/pages/category/WarmtepompPage'
import { RamenDeurenPage } from '@/pages/category/RamenDeurenPage'
import { DakisolatiePage } from '@/pages/category/DakisolatiePage'
import { HeatPumpCalculatorPage } from '@/pages/calculator/HeatPumpCalculatorPage'
import { WindowPriceCalculatorPage } from '@/pages/calculator/WindowPriceCalculatorPage'
import { RoofInsulationCalculatorPage } from '@/pages/calculator/RoofInsulationCalculatorPage'

// Blog pages
import { BlogOverviewPage } from '@/pages/blog/BlogOverviewPage'
import { BlogPostPage } from '@/pages/blog/BlogPostPage'

// Content/SEO pages
import { HeatPumpCostPage } from '@/pages/content/HeatPumpCostPage'
import { HeatPumpPremiumPage } from '@/pages/content/HeatPumpPremiumPage'
import { WindowCostPage } from '@/pages/content/WindowCostPage'
import { WindowPremiumPage } from '@/pages/content/WindowPremiumPage'
import { RoofInsulationCostPage } from '@/pages/content/RoofInsulationCostPage'
import { RoofInsulationPremiumPage } from '@/pages/content/RoofInsulationPremiumPage'
import { QuoteChecklistPage } from '@/pages/content/QuoteChecklistPage'

// Auth pages
import { LoginPage } from '@/pages/auth/LoginPage'
import { RegisterPage } from '@/pages/auth/RegisterPage'
import { CallbackPage } from '@/pages/auth/CallbackPage'

// Supplier pages
import { SupplierLandingPage } from '@/pages/supplier/SupplierLandingPage'
import { SupplierLoginPage } from '@/pages/supplier/SupplierLoginPage'
import { SupplierRegisterPage } from '@/pages/supplier/SupplierRegisterPage'
import { SupplierDashboardPage } from '@/pages/supplier/SupplierDashboardPage'
import { SupplierProjectDetailPage } from '@/pages/supplier/SupplierProjectDetailPage'
import { SupplierQuotesPage } from '@/pages/supplier/SupplierQuotesPage'
import { SupplierProfilePage } from '@/pages/supplier/SupplierProfilePage'
import { SupplierOnboardingPage } from '@/pages/supplier/SupplierOnboardingPage'

// Consumer app pages
import { IntakePage } from '@/pages/intake/IntakePage'
import { DashboardPage } from '@/pages/dashboard/DashboardPage'
import { ProjectDetailPage } from '@/pages/dashboard/ProjectDetailPage'
import { QuoteComparisonPage } from '@/pages/dashboard/QuoteComparisonPage'
import { MessagesPage } from '@/pages/messages/MessagesPage'
import { ProfilePage } from '@/pages/profile/ProfilePage'

// Admin pages
import { AdminLoginPage } from '@/pages/admin/AdminLoginPage'
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage'
import { AdminUsersPage } from '@/pages/admin/AdminUsersPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60 * 5 },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public pages with Header + Footer */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/projecten/warmtepomp" element={<WarmtepompPage />} />
            <Route path="/projecten/ramen-deuren" element={<RamenDeurenPage />} />
            <Route path="/projecten/dakisolatie" element={<DakisolatiePage />} />
            <Route path="/calculator/warmtepomp" element={<HeatPumpCalculatorPage />} />
            <Route path="/calculator/raamprijs" element={<WindowPriceCalculatorPage />} />
            <Route path="/calculator/dakisolatie" element={<RoofInsulationCalculatorPage />} />
            <Route path="/hoe-het-werkt" element={<HowItWorksPage />} />
            <Route path="/over-planora" element={<AboutPage />} />
            <Route path="/vakmensen" element={<VakmannenPage />} />
            <Route path="/gids/warmtepomp-kosten-2025" element={<HeatPumpCostPage />} />
            <Route path="/gids/warmtepomp-premies-2025" element={<HeatPumpPremiumPage />} />
            <Route path="/gids/ramen-kosten-2025" element={<WindowCostPage />} />
            <Route path="/gids/ramen-premies-2025" element={<WindowPremiumPage />} />
            <Route path="/gids/dakisolatie-kosten-2025" element={<RoofInsulationCostPage />} />
            <Route path="/gids/dakisolatie-premies-2025" element={<RoofInsulationPremiumPage />} />
            <Route path="/gids/offerte-checklist" element={<QuoteChecklistPage />} />
            <Route path="/blog" element={<BlogOverviewPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/voor-vaklui" element={<SupplierLandingPage />} />
          </Route>

          {/* Auth (no layout) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registreren" element={<RegisterPage />} />
          <Route path="/auth/callback" element={<CallbackPage />} />
          <Route path="/supplier/login" element={<SupplierLoginPage />} />
          <Route path="/supplier/registreren" element={<SupplierRegisterPage />} />
          <Route path="/supplier/onboarding" element={<SupplierOnboardingPage />} />

          {/* Supplier Dashboard (protected, role: supplier) */}
          <Route element={<SupplierLayout />}>
            <Route path="/supplier/dashboard" element={<SupplierDashboardPage />} />
            <Route path="/supplier/projecten" element={<SupplierDashboardPage />} />
            <Route path="/supplier/projecten/:id" element={<SupplierProjectDetailPage />} />
            <Route path="/supplier/offertes" element={<SupplierQuotesPage />} />
            <Route path="/supplier/berichten" element={<MessagesPage />} />
            <Route path="/supplier/profiel" element={<SupplierProfilePage />} />
          </Route>

          {/* Consumer App (protected) */}
          <Route element={<AppLayout />}>
            <Route path="/app/nieuw-project" element={<IntakePage />} />
            <Route path="/app/dashboard" element={<DashboardPage />} />
            <Route path="/app/project/:id" element={<ProjectDetailPage />} />
            <Route path="/app/project/:id/offertes" element={<QuoteComparisonPage />} />
            <Route path="/app/berichten" element={<MessagesPage />} />
            <Route path="/app/profiel" element={<ProfilePage />} />
          </Route>

          {/* Admin (protected, role: admin) */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/gebruikers" element={<AdminUsersPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
