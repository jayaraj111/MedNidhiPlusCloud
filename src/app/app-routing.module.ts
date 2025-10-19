import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { 
    path: 'dashboard', 
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule) 
  },
  { 
    path: 'patients', 
    loadChildren: () => import('./features/patients/patients.module').then(m => m.PatientsModule) 
  },
  { 
    path: 'appointments', 
    loadChildren: () => import('./features/appointments/appointments.module').then(m => m.AppointmentsModule) 
  },
  { 
    path: 'billing', 
    loadChildren: () => import('./features/billing/billing.module').then(m => m.BillingModule) 
  },
  // { 
  //   path: 'reports', 
  //   loadChildren: () => import('./features/reports/reports.module').then(m => m.ReportsModule) 
  // },
  // { 
  //   path: 'settings', 
  //   loadChildren: () => import('./features/settings/settings.module').then(m => m.SettingsModule) 
  // },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }