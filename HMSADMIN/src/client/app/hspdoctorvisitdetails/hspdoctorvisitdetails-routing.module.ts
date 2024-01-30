import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HspdoctorvisitdetailsComponent } from './hspdoctorvisitdetails.component';
import {AuthGuard} from '../shared/login/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['hspdoctorvisitdetails'] } }
      { path: 'hspdoctorvisitdetails/:billid', component: HspdoctorvisitdetailsComponent ,canActivate:[AuthGuard],data: { roles: ['hospitalization'] }}
    ])
  ],
  exports: [RouterModule]
})
export class HspdoctorvisitdetailsRoutingModule { }
