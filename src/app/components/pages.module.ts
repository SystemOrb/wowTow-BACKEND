import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './pages/admin/admin.component';
import { LegalComponent } from './pages/legal/legal.component';
import { CitiesComponent } from './pages/cities/cities.component';
import { RiskComponent } from './pages/risk/risk.component';
import { PaypalComponent } from './pages/paypal/paypal.component';
import { StripeComponent } from './pages/stripe/stripe.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployersComponent } from './pages/employers/employers.component';
import { PagesRoutingModule } from './pages.routes';
import { CustomersComponent } from './pages/customers/customers.component';
import { ProfileComponent } from './pages/customers/profile.component';
import { ProfileDriverComponent } from './pages/admin/profile-driver.component';
import { AveragePipe } from '../services/pipes/average.pipe';
import { StatusPipe } from '../services/pipes/status.pipe';
import { RiskInfoComponent } from './pages/risk/risk-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageUrlPipe } from '../services/pipes/image-url.pipe';
import { LegalPageComponent } from './pages/legal/legal-page.component';
import { ProvidersComponent } from './shared/modal/providers.component';
import { InvoiceStripeComponent } from './pages/stripe/invoice-stripe.component';
import { ZonemapComponent } from './pages/cities/zonemap.component';
import { AgmCoreModule } from '@agm/core';
import { ModalCouponComponent } from './shared/modal/coupons/modal-coupon.component';
import { RedirectComponent } from './static/redirect/redirect.component';
import { PaypalInvoiceComponent } from './pages/paypal/paypal-invoice.component';
import { TrackComponent } from './pages/cities/track/track.component';
import { AngularMaterialModule } from '../angular-material.module';
import { NoImagePipe } from '../services/pipes/no-image.pipe';
import { SharedModule } from './shared/shared.module';
import { CarsComponent } from './pages/prices/cars/cars.component';
import { SystemFeeComponent } from './pages/prices/system-fee/system-fee.component';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD_Wa-G_BsewEAJAZSvoNUk95JBSO1F4XU'
    })
  ],
  declarations: [
  AdminComponent,
  LegalComponent,
  CitiesComponent,
  RiskComponent,
  PaypalComponent,
  StripeComponent,
  DashboardComponent,
  EmployersComponent,
  CustomersComponent,
  ProfileComponent,
  ProfileDriverComponent,
  AveragePipe,
  StatusPipe,
  ImageUrlPipe,
  RiskInfoComponent,
  LegalPageComponent,
  ProvidersComponent,
  InvoiceStripeComponent,
  ZonemapComponent,
  ModalCouponComponent,
  RedirectComponent,
  PaypalInvoiceComponent,
  TrackComponent,
  CarsComponent,
  SystemFeeComponent
]
})
export class PagesModule { }
