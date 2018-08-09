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
import { HttpClientModule } from '@angular/common/http';
import { EmployersComponent } from './pages/employers/employers.component';
import { PagesRoutingModule } from './pages.routes';
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
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
  EmployersComponent
]
})
export class PagesModule { }
