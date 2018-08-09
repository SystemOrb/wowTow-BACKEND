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

const routes: Routes = [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'admin/login', component: AdminComponent, data: {title: 'System Admins'}},
    {path: 'admin/documents', component: LegalComponent, data: {title: 'Privacy documents management'}},
    {path: 'admin/membership', component: EmployersComponent, data: {title: 'Employers management'}},
    {path: 'admin/cities', component: CitiesComponent, data: {title: 'Cities management'}},
    {path: 'admin/controls/risk', component: RiskComponent, data: {title: 'Controls Risks'}},
    {path: 'admin/payments/stripe', component: StripeComponent, data: {title: 'Payments with stripe'}},
    {path: 'admin/payments/paypal', component: PaypalComponent, data: {title: 'Payments with Paypal'}},
    { path: '', pathMatch: 'full', redirectTo: '/dashboard' }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
