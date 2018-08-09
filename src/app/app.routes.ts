import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './components/pages.component';
import { NotfoundComponent } from './components/static/notfound/notfound.component';


const routes: Routes = [
    {path: '', component: PagesComponent, loadChildren: './components/pages.module#PagesModule'},
    {path: '**', component: NotfoundComponent}
];
export const APP_ROUTES = RouterModule.forRoot(routes, {useHash: true});
