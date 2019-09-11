import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { RouterModule } from '../../../../node_modules/@angular/router';
import { MapComponent } from './entry-pages/map/map.component';
import { AngularMaterialModule } from '../../angular-material.module';
import { FormsModule } from '@angular/forms';
import { NoImagePipe } from '../../services/pipes/no-image.pipe';
import { FeeModalComponent } from './entry-pages/fee-modal/fee-modal.component';
import { VehiclesModalComponent } from './entry-pages/vehicles-modal/vehicles-modal.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule,
    FormsModule
  ],
  declarations: [
      HeaderComponent,
      FooterComponent,
      SidebarComponent,
      BreadcrumbsComponent,
      MapComponent,
      NoImagePipe,
      FeeModalComponent,
      VehiclesModalComponent
    ],
    exports: [
      HeaderComponent,
      FooterComponent,
      SidebarComponent,
      BreadcrumbsComponent,
      MapComponent,
      NoImagePipe,
      FeeModalComponent,
      VehiclesModalComponent
    ],
    entryComponents: [
      MapComponent,
      FeeModalComponent,
      VehiclesModalComponent
    ]
})
export class SharedModule { }
