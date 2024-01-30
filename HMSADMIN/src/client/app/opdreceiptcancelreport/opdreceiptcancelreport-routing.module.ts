import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OpdreceiptcancelreportComponent } from './opdreceiptcancelreport.component';
import {AuthGuard} from '../shared/login/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['opdreceiptcancelreport'] } }
      { path: 'opdreceiptcancelreport', component: OpdreceiptcancelreportComponent ,canActivate:[AuthGuard],data: { roles: ['opdreceiptcancelreport'] }}
    ])
  ],
  exports: [RouterModule]
})
export class OpdreceiptcancelreportRoutingModule { }
