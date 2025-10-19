import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PatientsComponent } from './features/patients/patients.component';
import { PatientDetailComponent } from './features/patients/patient-detail/patient-detail.component';
import { PaymentFormComponent } from './features/billing/payment-form/payment-form.component';
import { AppointmentDetailComponent } from './features/appointments/appointment-detail/appointment-detail.component';
import { AppointmentFormComponent } from './features/appointments/appointment-form/appointment-form.component';
import { PatientFormComponent } from './features/patients/patient-form/patient-form.component';
import { AppointmentsComponent } from './features/appointments/appointments.component';
import { InvoicesComponent } from './features/billing/invoices/invoices.component';
import { InvoiceFormComponent } from './features/billing/invoice-form/invoice-form.component';
import { InvoiceDetailComponent } from './features/billing/invoice-detail/invoice-detail.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const appRoutes: Routes = [
    // Dashboard routes
  { path: 'dashboard', component: DashboardComponent },
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

  { path: '**', redirectTo: '/dashboard' } // fallback
];
