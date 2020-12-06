import { HomeComponent } from './home/home.component';
import { AddCreditCardDetailsComponent } from './add-credit-card-details/add-credit-card-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardDetailsResolverService } from './services/card-details.resolver';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    resolve: {
      cardDetails: CardDetailsResolverService
    }
  },
  {
    path: 'add-credit-card',
    loadChildren: () => import('./add-credit-card-details/add-credit-card-details.module').then((m) => m.AddCreditCardModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
