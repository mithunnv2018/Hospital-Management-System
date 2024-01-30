import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IpddoctorchargesreportComponent } from './ipddoctorchargesreport.component';
import {AuthGuard} from '../shared/login/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['ipddoctorchargesreport'] } }
      { path: 'ipddoctorchargesreport', component: IpddoctorchargesreportComponent ,canActivate:[AuthGuard],data: { roles: ['ipddoctorchargesreport'] }}
    ])
  ],
  exports: [RouterModule]
})
export class IpddoctorchargesreportRoutingModule { }
