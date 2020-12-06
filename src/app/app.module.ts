import { HomeModule } from './home/home.module';
import { ToastMessageService } from './services/toast-message.service';
import { ToastMessageComponent } from './toast-message/toast-message.component';
import { CardDetailsResolverService } from './services/card-details.resolver';
import { CardDetailsService } from './services/card-details.service';
import { HeaderComponent } from './header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ToastMessageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    HomeModule
  ],
  providers: [
    CardDetailsService,
    CardDetailsResolverService,
    ToastMessageService
  ],
  bootstrap: [AppComponent, HeaderComponent]
})
export class AppModule { }
