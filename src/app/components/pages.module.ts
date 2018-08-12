import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './static/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LegalComponent } from './pages/legal/legal.component';
import { CitiesComponent } from './pages/cities/cities.component';
import { RiskComponent } from './pages/risk/risk.component';
import { PaypalComponent } from './pages/paypal/paypal.component';
import { StripeComponent } from './pages/stripe/stripe.component';
import { CouponsComponent } from './pages/cities/coupons/coupons.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployersComponent } from './pages/employers/employers.component';
import { PagesRoutingModule } from './pages.routes';
import { CustomersComponent } from './pages/customers/customers.component';
import { ProfileComponent } from './pages/customers/profile.component';
import { ProfileDriverComponent } from './pages/admin/profile-driver.component';
@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule
  ],
  declarations: [
  LoginComponent,
  AdminComponent,
  LegalComponent,
  CitiesComponent,
  RiskComponent,
  PaypalComponent,
  StripeComponent,
  CouponsComponent,
  DashboardComponent,
  EmployersComponent,
  CustomersComponent,
  ProfileComponent,
  ProfileDriverComponent
]
})
export class PagesModule { }
