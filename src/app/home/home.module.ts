import { ViewCreditCardDetailsComponent } from './../view-credit-card-details/view-credit-card-details.component';
import { HomeComponent } from './home.component';
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HomeComponent,
    ViewCreditCardDetailsComponent
  ]
})
export class HomeModule {

}
