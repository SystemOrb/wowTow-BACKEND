import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PagesComponent } from './components/pages.component';
import { PagesModule } from './components/pages.module';
import { SharedModule } from './components/shared/shared.module';
import { APP_ROUTES } from './app.routes';
import { NotfoundComponent } from './components/static/notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    // PagesModule,
    APP_ROUTES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
