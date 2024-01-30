import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BillingComponent } from './billing.component';
import {AuthGuard} from '../shared/login/auth.guard';
@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['billing'] } }
      { path: 'billing/:billid', component: BillingComponent ,canActivate:[AuthGuard],data: { roles: ['hospitalization'] }}
    ])
  ],
  exports: [RouterModule]
})
export class BillingRoutingModule { }
