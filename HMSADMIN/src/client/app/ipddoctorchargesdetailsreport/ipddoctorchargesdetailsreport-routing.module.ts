import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IpddoctorchargesdetailsreportComponent } from './ipddoctorchargesdetailsreport.component';
import {AuthGuard} from '../shared/login/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['ipddoctorchargesreport'] } }
      { path: 'ipddoctorchargesdetailsreport', component: IpddoctorchargesdetailsreportComponent ,canActivate:[AuthGuard],data: { roles: ['ipddoctorchargesdetailsreport'] }}
    ])
  ],
  exports: [RouterModule]
})
export class IpddoctorchargesdetailsreportRoutingModule { }
