import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../material.module';

// Components
import { InvoicesComponent } from './invoices/invoices.component';
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';

const routes: Routes = [
  { path: '', component: InvoicesComponent },
  { path: 'new', component: InvoiceFormComponent },
  { path: ':id', component: InvoiceDetailComponent },
  { path: ':id/edit', component: InvoiceFormComponent },
  { path: ':id/payment', component: PaymentFormComponent }
];

@NgModule({
  // declarations: [
  //   InvoicesComponent,
  //   InvoiceFormComponent,
  //   InvoiceDetailComponent,
  //   PaymentFormComponent
  // ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule
  ]
})
export class BillingModule { }