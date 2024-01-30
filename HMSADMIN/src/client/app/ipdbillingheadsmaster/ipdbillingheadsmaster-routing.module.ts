import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IpdbillingheadsMasterComponent } from './ipdbillingheadsmaster.component';
import {AuthGuard} from '../shared/login/auth.guard';
@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['ipdbillingheadsmaster'] } }
      { path: 'ipdbillingheadsmaster', component: IpdbillingheadsMasterComponent ,canActivate:[AuthGuard],data: { roles: ['ipdbillingheadsmaster'] }}
    ])
  ],
  exports: [RouterModule]
})
export class IpdbillingheadsMasterRoutingModule { }
