import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsService } from './customers/clients.service';
import { DriversService } from './customers/drivers.service';
import { RiskService } from './customers/risk.service';
import { ProvidersDocumentsService } from './providers/providers-documents.service';
import { ExpirationGuard } from './guards/expiration.guard';
import { ModalProvidersService } from './modal/modal-providers.service';
import { PaypalService } from './customers/paypal.service';
import { StripeService } from './customers/stripe.service';
import { ZoneMapService } from './cities/zone-map.service';
import { ZoneCouponService } from './cities/zone-coupon.service';
import { AdminService } from './auth/admin.service';
import { AuthorizedGuard } from './guards/authorized.guard';
import { AngularMaterialModule } from '../angular-material.module';
import { ExcelService } from './system/excel.service';
@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  declarations: [],
  providers: [
    DriversService,
    ClientsService,
    RiskService,
    ProvidersDocumentsService,
    ExpirationGuard,
    ModalProvidersService,
    PaypalService,
    StripeService,
    ZoneMapService,
    ZoneCouponService,
    AdminService,
    AuthorizedGuard,
    ExcelService
  ]
})
export class ServicesModule { }
