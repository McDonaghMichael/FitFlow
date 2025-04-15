import { Routes } from '@angular/router';
import {AuthGuard} from "./guards/auth/auth.guard";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/main/homepage/homepage.page').then(m => m.HomepagePage)
  },
  {
    path: 'homepage',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/main/homepage/homepage.page').then(m => m.HomepagePage)
  },
  {
    path: 'authentication/landing',
    loadComponent: () => import('./pages/authentication/landing/landing.page').then(m => m.LandingPage)
  },
  {
    path: 'authentication/register',
    loadComponent: () => import('./pages/authentication/register/register.page').then(m => m.RegisterPage)
  },{
    path: 'authentication/login',
    loadComponent: () => import('./pages/authentication/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'authentication/terms',
    loadComponent: () => import('./pages/authentication/terms/terms.page').then(m => m.TermsPage)
  },
  {
    path: 'authentication/forgot-password',
    loadComponent: () => import('./pages/authentication/forgot-password/forgot-password.page').then(m => m.ForgotPasswordPage)
  },
  {
    path: 'settings',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/main/settings/settings.page').then(m => m.SettingsPage)
  },
  {
    path: 'settings/fitness-data',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/main/settings/types/fitness-data/fitness-data.page').then(m => m.FitnessDataPage)
  },
  {
    path: 'settings/account-management',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/main/settings/types/account-management/account-management.page').then(m => m.AccountManagementPage)
  },
  {
    path: 'settings/appearance',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/main/settings/types/appearance/appearance.page').then(m => m.AppearancePage)
  },
  {
    path: 'settings/goals',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/main/settings/types/goals/goals.page').then(m => m.GoalsPage)
  },
  {
    path: 'settings/notifications',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/main/settings/types/notifications/notifications.page').then(m => m.NotificationsPage)
  },
  {
    path: 'settings/report-issue',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/main/settings/types/report-issue/report-issue.page').then(m => m.ReportIssuePage)
  },
  {
    path: 'product/barcode-scanner',

    loadComponent: () => import('./pages/features/products/barcode-scanner/barcode-scanner.page').then(m => m.BarcodeScannerPage)
  },
  {
    path: 'product/enter-manually',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/features/products/enter-manually/enter-manually.page').then(m => m.EnterManuallyPage)
  },
  {
    path: 'product/product-information',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/features/products/product-information/product-information.page').then(m => m.ProductInformationPage)
  },
  {
    path: 'product/reviews',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/features/products/reviews/reviews.page').then(m => m.ReviewsPage)
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/main/profile/profile.page').then(m => m.ProfilePage)
  },
];
