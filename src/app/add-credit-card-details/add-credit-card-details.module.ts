import { AddCreditCardRoutingModule } from './add-credit-card-details-routing.module';
import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddCreditCardDetailsComponent } from './add-credit-card-details.component';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    AddCreditCardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [
    AddCreditCardDetailsComponent
  ],
  providers: []
})
export class AddCreditCardModule {}
