import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { BlankComponent } from './features/blank/blank.component';
import { AuthenticationRoutes } from './features/authentication/authentication.routes';
import { PatientsComponent } from './features/patients/patients.component';
import { PatientFormComponent } from './features/patients/patient-form/patient-form.component';
import { PatientDetailComponent } from './features/patients/patient-detail/patient-detail.component';
import { AppointmentsComponent } from './features/appointments/appointments.component';
import { AppointmentFormComponent } from './features/appointments/appointment-form/appointment-form.component';
import { AppointmentDetailComponent } from './features/appointments/appointment-detail/appointment-detail.component';
import { InvoicesComponent } from './features/billing/invoices/invoices.component';
import { InvoiceFormComponent } from './features/billing/invoice-form/invoice-form.component';
import { InvoiceDetailComponent } from './features/billing/invoice-detail/invoice-detail.component';
import { MyProfileComponent } from './features/user-profile/my-profile/my-profile.component';
// import { ProcessfilesComponent } from './features/processfiles/processfiles.component';

export const appRoutes: Routes = [
  // Dashboard routes
  { path: 'dashboard', component: DashboardComponent },
  // Patient routes
  { path: '', redirectTo: '/authentication/login', pathMatch: 'full' },


  // { path: 'processfiles', component: ProcessfilesComponent },

  //Processed Files Routes
  // {
  //   path: 'processfiles',
  //   loadChildren: () =>
  //     import('./features/processfiles/processfiles.routes').then((m) => m.ProcessFilesRoutes),
  // },

  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./features/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
      },
    ],
  },
 
      // Patient routes
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'patients', component: PatientsComponent },
    { path: 'patients/new', component: PatientFormComponent },
    { path: 'patients/:id', component: PatientDetailComponent },
    { path: 'patients/:id/edit', component: PatientFormComponent },
    
    // Appointments routes
    { path: 'appointments', component: AppointmentsComponent },
    { path: 'appointments/new', component: AppointmentFormComponent },
    { path: 'appointments/:id', component: AppointmentDetailComponent },
    { path: 'appointments/:id/edit', component: AppointmentFormComponent },
  
    // Billing routes
    //{ path: 'billing/new', component: PaymentFormComponent },
    { path: 'billing', component: InvoicesComponent },
    { path: 'billing/new', component: InvoiceFormComponent },
    { path: 'billing/:id', component: InvoiceDetailComponent },
    { path: 'billing/:id/edit', component: InvoiceFormComponent },
 
    { path: 'my-profile', component: MyProfileComponent },

  //  {
  //       path: '',
  //       redirectTo: '/authentication/login',
  //       pathMatch: 'full',
  //     },

  //  { path: '**', redirectTo: '/dashboard' } // fallback
];
