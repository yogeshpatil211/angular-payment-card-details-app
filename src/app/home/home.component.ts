import { CardData } from './../model/card-data.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cardDetails: CardData;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCardDetails();
  }

  getCardDetails(): void {
    this.activatedRoute.data.pipe(map((data) => data.cardDetails), take(1)).subscribe(
      (cardData: CardData) => {
        if (cardData) {
          this.cardDetails = {...cardData,
            creditCardNumber: cardData.creditCardNumber.replace(/\d{4}(?=.)/g, '$& '),
            expiryDate: this.getCardDate(cardData.expiryDate)};
          }
        }
    );
  }

  getCardDate(date): string {
    const newDate = new Date(date);
    return newDate.getMonth() + 1 + '/' + newDate.getFullYear();
  }

  onAddCreditCard(): void {
    this.router.navigate(['/add-credit-card']);
  }
}
