import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IpdreceiptcancelreportComponent } from './ipdreceiptcancelreport.component';
import {AuthGuard} from '../shared/login/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['ipdreceiptcancelreport'] } }
      { path: 'ipdreceiptcancelreport', component: IpdreceiptcancelreportComponent ,canActivate:[AuthGuard],data: { roles: ['ipdreceiptcancelreport'] }}
    ])
  ],
  exports: [RouterModule]
})
export class IpdreceiptcancelreportRoutingModule { }
