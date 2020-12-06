import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AddCreditCardDetailsComponent } from './add-credit-card-details.component';
import { CardDetailsResolverService } from '../services/card-details.resolver';

const routes: Routes = [
  {
    path: '',
    component: AddCreditCardDetailsComponent,
    resolve: {
      cardDetails: CardDetailsResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddCreditCardRoutingModule {}
