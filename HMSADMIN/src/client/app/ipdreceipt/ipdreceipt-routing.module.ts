import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IpdreceiptComponent } from './ipdreceipt.component';
import {AuthGuard} from '../shared/login/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['ipdreceipt'] } }
      { path: 'ipdreceipt/:billid/:paytype', component: IpdreceiptComponent ,canActivate:[AuthGuard],data: { roles: ['hospitalization'] }}
    ])
  ],
  exports: [RouterModule]
})
export class IpdreceiptRoutingModule { }
