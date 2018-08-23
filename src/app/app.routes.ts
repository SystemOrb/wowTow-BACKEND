import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './components/pages.component';
import { NotfoundComponent } from './components/static/notfound/notfound.component';
import { LoginComponent } from './components/static/login/login.component';
import { AuthorizedGuard } from './services/guards/authorized.guard';


const routes: Routes = [
    {
     path: '', component: PagesComponent,
     canActivate: [AuthorizedGuard],
     loadChildren: './components/pages.module#PagesModule'
    },
    {path: 'login', component: LoginComponent},
    {path: '**', component: NotfoundComponent}
];
export const APP_ROUTES = RouterModule.forRoot(routes, {useHash: true});
