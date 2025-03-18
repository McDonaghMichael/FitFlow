import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'landing',
    loadComponent: () => import('./pages/authentication/landing/landing.page').then(m => m.LandingPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/authentication/register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'terms',
    loadComponent: () => import('./pages/authentication/terms/terms.page').then(m => m.TermsPage)
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./pages/authentication/forgot-password/forgot-password.page').then(m => m.ForgotPasswordPage)
  },
  {
    path: 'homepage',
    loadComponent: () => import('./pages/main/homepage/homepage.page').then(m => m.HomepagePage)
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/main/settings/settings.page').then(m => m.SettingsPage)
  },
  {
    path: 'fitness-data',
    loadComponent: () => import('./pages/main/settings/types/fitness-data/fitness-data.page').then(m => m.FitnessDataPage)
  },
  {
    path: 'account-management',
    loadComponent: () => import('./pages/main/settings/types/account-management/account-management.page').then(m => m.AccountManagementPage)
  },
  {
    path: 'appearance',
    loadComponent: () => import('./pages/main/settings/types/appearance/appearance.page').then(m => m.AppearancePage)
  },
  {
    path: 'goals',
    loadComponent: () => import('./pages/main/settings/types/goals/goals.page').then(m => m.GoalsPage)
  },
  {
    path: 'notifications',
    loadComponent: () => import('./pages/main/settings/types/notifications/notifications.page').then(m => m.NotificationsPage)
  },
  {
    path: 'report-issue',
    loadComponent: () => import('./pages/main/settings/types/report-issue/report-issue.page').then(m => m.ReportIssuePage)
  },
  {
    path: 'barcode-scanner',
    loadComponent: () => import('./pages/features/products/barcode-scanner/barcode-scanner.page').then(m => m.BarcodeScannerPage)
  },
  {
    path: 'enter-manually',
    loadComponent: () => import('./pages/features/products/enter-manually/enter-manually.page').then(m => m.EnterManuallyPage)
  },
  {
    path: 'product-information',
    loadComponent: () => import('./pages/features/products/product-information/product-information.page').then(m => m.ProductInformationPage)
  },
  {
    path: 'reviews',
    loadComponent: () => import('./pages/features/products/reviews/reviews.page').then(m => m.ReviewsPage)
  },
];
