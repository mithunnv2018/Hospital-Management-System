import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IpdpaymentdischargereportComponent } from './ipdpaymentdischargereport.component';
import {AuthGuard} from '../shared/login/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['ipdpaymentdischargereport'] } }
      { path: 'ipdpaymentdischargereport', component: IpdpaymentdischargereportComponent ,canActivate:[AuthGuard],data: { roles: ['ipdpaymentdischargereport'] }}
    ])
  ],
  exports: [RouterModule]
})
export class IpdpaymentdischargereportRoutingModule { }
