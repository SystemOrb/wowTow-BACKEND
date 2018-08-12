import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PagesComponent } from './components/pages.component';
import { SharedModule } from './components/shared/shared.module';
import { APP_ROUTES } from './app.routes';
import { NotfoundComponent } from './components/static/notfound/notfound.component';
import { ServicesModule } from './services/services.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    APP_ROUTES,
    ServicesModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
