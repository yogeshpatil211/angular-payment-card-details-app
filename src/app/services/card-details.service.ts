import { CardData } from './../model/card-data.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CardDetailsService {

  constructor(
    private http: HttpClient
  ) {}

  saveCardDetails(cardDetails: CardData): Observable<any> {
    return this.http.put('https://card-details-12a34-default-rtdb.firebaseio.com/card-details.json', cardDetails);
  }

  getCardDetails(): Observable<any> {
    return this.http.get('https://card-details-12a34-default-rtdb.firebaseio.com/card-details.json');
  }
}
