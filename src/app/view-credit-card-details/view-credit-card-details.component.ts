import { CardData } from './../model/card-data.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-view-card-details',
  templateUrl: './view-credit-card-details.component.html',
  styleUrls: ['./view-credit-card-details.component.css']
})
export class ViewCreditCardDetailsComponent {

  @Input() cardDetails: CardData;

  constructor() {}
}
