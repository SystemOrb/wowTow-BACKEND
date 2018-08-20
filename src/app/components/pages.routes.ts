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
         canActivate: [ExpirationGuard], component: EmployersComponent, data: {title: 'Employers management'}},
    {
        path: 'admin/cities',
         component: CitiesComponent, data: {title: 'Cities management'}},
    {
        path: 'admin/controls/risk',
         component: RiskComponent, data: {title: 'Controls Risks'}},
    {
        path: 'admin/controls/risk/:riskKey',
         component: RiskInfoComponent, data: {title: 'Control Risk'}},
    {
        path: 'admin/payments/stripe',
         component: StripeComponent, data: {title: 'Payments with stripe'}},
    {
        path: 'admin/payments/paypal',
         component: PaypalComponent, data: {title: 'Payments with Paypal'}},
    {
         path: '', pathMatch: 'full',
          redirectTo: '/dashboard' }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
