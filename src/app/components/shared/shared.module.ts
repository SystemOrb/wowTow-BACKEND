import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { RouterModule } from '../../../../node_modules/@angular/router';
import { ProvidersComponent } from './modal/providers.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
      HeaderComponent,
      FooterComponent,
      SidebarComponent,
      BreadcrumbsComponent
    ],
    exports: [
      HeaderComponent,
      FooterComponent,
      SidebarComponent,
      BreadcrumbsComponent
    ]
})
export class SharedModule { }
