import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// import { PageNotFoundComponent } from './';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LegalComponent } from './pages/legal/legal.component';
import { EmployersComponent } from './pages/employers/employers.component';
import { CitiesComponent } from './pages/cities/cities.component';
import { RiskComponent } from './pages/risk/risk.component';
import { StripeComponent } from './pages/stripe/stripe.component';
import { PaypalComponent } from './pages/paypal/paypal.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { ProfileComponent } from './pages/customers/profile.component';
import { ProfileDriverComponent } from './pages/admin/profile-driver.component';
import { RiskInfoComponent } from './pages/risk/risk-info.component';
import { LegalPageComponent } from './pages/legal/legal-page.component';
import { ExpirationGuard } from '../services/guards/expiration.guard';
import { InvoiceStripeComponent } from './pages/stripe/invoice-stripe.component';
import { ZonemapComponent } from './pages/cities/zonemap.component';
import { RedirectComponent } from './static/redirect/redirect.component';
import { PaypalInvoiceComponent } from './pages/paypal/paypal-invoice.component';
import { TrackComponent } from './pages/cities/track/track.component';
import { CarsComponent } from './pages/prices/cars/cars.component';
import { SystemFeeComponent } from './pages/prices/system-fee/system-fee.component';

const routes: Routes = [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'admin/drivers', component: AdminComponent, data: {title: 'System Admins'}},
    {
          path: 'admin/drivers/profile/:id', canActivate: [ExpirationGuard],
          component: ProfileDriverComponent,
          data: {title: 'wowTow Employer Driver profile'}},
    {
        path: 'admin/customers',
         component: CustomersComponent, data: {title: 'Customers'}},
    {
        path: 'admin/customers/profile/:id',
         component: ProfileComponent, data: {title: 'Customer Profile'}},
    {
        path: 'admin/documents',
         canActivate: [ExpirationGuard], component: LegalComponent, data: {title: 'Privacy documents management'}},
    {
        path: 'admin/documents/:docKey',
         canActivate: [ExpirationGuard], component: LegalPageComponent, data: {title: 'Privacy Document info'}},
    {
        path: 'admin/membership',
         canActivate: [ExpirationGuard], component: EmployersComponent, data: {title: 'Service Providers management'}},
    {
        path: 'admin/cities',
         component: CitiesComponent, data: {title: 'Cities management'}},
    {
        path: 'admin/services/track',
        component: TrackComponent, data: {title: 'Track Services'}},
    {
        path: 'admin/system/cars',
        component: CarsComponent, data: {title: 'Database vehicles'}
    },
    {
        path: 'admin/system/fee',
        component: SystemFeeComponent, data: {title: 'Wootow Prices System'}
    },
    {
        path: 'admin/cities/:zone',
         component: ZonemapComponent, data: {title: 'Cities management'}},
    {
        path: 'admin/controls/risk',
         component: RiskComponent, data: {title: 'Controls Risks'}},
    {
        path: 'admin/controls/risk/:riskKey',
         component: RiskInfoComponent, data: {title: 'Control Risk'}},
    {
        path: 'admin/payments/stripe',
         component: StripeComponent, data: {title: 'Orders'}},
    {
        path: 'admin/payments/stripe/invoice/:stripeKey',
         component: InvoiceStripeComponent, data: {title: 'Stripe Invoice'}},
    {
        path: 'admin/payments/paypal',
         component: PaypalComponent, data: {title: 'Payments with Paypal'}},
         {
        path: 'admin/payments/paypal/:paypalKey',
          component: PaypalInvoiceComponent, data: {title: 'Paypal invoice'}},
    {
        path: 'admin/redirection/:toUrl/:id',
         component: RedirectComponent, data: {title: 'Redirection in a sec'}},
    {
         path: '', pathMatch: 'full',
          redirectTo: '/dashboard' }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
