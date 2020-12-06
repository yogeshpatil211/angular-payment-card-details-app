import { CardData } from './../model/card-data.model';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';

import * as _moment from 'moment';
import { Moment} from 'moment';
import { CardDetailsService } from '../services/card-details.service';
import { ActivatedRoute } from '@angular/router';
import { take, map } from 'rxjs/operators';
import { ToastMessageService } from '../services/toast-message.service';
import { MessageType } from '../model/message.model';
import { Location } from '@angular/common';

const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'add-credit-card-detail',
  templateUrl: './add-credit-card-details.component.html',
  styleUrls: ['./add-credit-card-details.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class AddCreditCardDetailsComponent implements OnInit {

  minDate: Date = new Date();
  maxDate: Date = new Date(this.minDate.getFullYear() + 20, 11, 31);

  creditCardDetailsForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private cardDetailsService: CardDetailsService,
    private activatedRoute: ActivatedRoute,
    private toastMessageService: ToastMessageService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.createCreditCardDetailsForm();
    this.prevAddedCardDetails();
    this.formValueChanges();
  }

  prevAddedCardDetails(): void {
    this.activatedRoute.data.pipe(map((data) => data.cardDetails), take(1)).subscribe(
      (cardData: CardData) => {
        if (cardData) {
          this.creditCardDetailsForm.setValue(
            {...cardData }
          );
        }
      }
    );
  }

  getDate(date): any {
    const newDate = new Date(date);
    return moment([newDate.getFullYear(), newDate.getMonth()]);
  }

  createCreditCardDetailsForm(): void {
    this.creditCardDetailsForm = this.fb.group({
      creditCardNumber: [null, Validators.required],
      cardHolder: [null, Validators.required],
      expiryDate: [moment(), Validators.required],
      securityCode: [null],
      amount: [null, [Validators.required, Validators.min(1)]]
    });
  }

  formValueChanges(): void {
    this.creditCardDetailsForm.valueChanges.subscribe(
      (res) => console.log(this.creditCardDetailsForm)
    );
  }

  getControl(controlName: string): AbstractControl | null {
    return this.creditCardDetailsForm.get(controlName) || null;
  }


  chosenYearHandler(normalizedYear: Moment): void {
    const ctrlValue = this.creditCardDetailsForm.value.expiryDate;
    ctrlValue.year(normalizedYear.year());
    this.creditCardDetailsForm.patchValue({expiryDate: ctrlValue});
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>): void {
    const ctrlValue = this.creditCardDetailsForm.value.expiryDate;
    ctrlValue.month(normalizedMonth.month());
    this.creditCardDetailsForm.patchValue({expiryDate: ctrlValue});
    datepicker.close();
  }

  onSaveDetails(): void {
    if (this.creditCardDetailsForm.valid) {
      // const cardDetails = {...this.creditCardDetailsForm.value, expiryDate: JSON.stringify(this.creditCardDetailsForm.value.expiryDate)};
      this.cardDetailsService.saveCardDetails(this.creditCardDetailsForm.value).pipe(take(1))
        .subscribe(
          () => {
            this.toastMessageService.sendMessage('Card Details Saved SuccessFully!', MessageType.SUCCESS);
          },
          (error) => {
            this.toastMessageService.sendMessage(error, MessageType.ERROR);
          }
        );
    } else {
      this.markFormAsTouched(this.creditCardDetailsForm);
      this.toastMessageService.sendMessage('Please Enter Card Details', MessageType.ERROR);
    }
  }

  markFormAsTouched(formGroup: FormGroup): void {
    (Object as any).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormAsTouched(control);
      }
    });
  }

  onCancel(): void {
    this.location.back();
  }
}
