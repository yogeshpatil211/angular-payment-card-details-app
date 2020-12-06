import { CardDetailsService } from './card-details.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class CardDetailsResolverService implements Resolve<any>{

  constructor(
    private _cardDetailsService: CardDetailsService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this._cardDetailsService.getCardDetails().pipe(
      map((res) => res),
      catchError((error) => {
        return of(null);
      })
    );
  }
}
