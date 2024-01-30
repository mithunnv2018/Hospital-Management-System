import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DoctorMasterComponent } from './doctormaster.component';
import {AuthGuard} from '../shared/login/auth.guard';
@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['doctormaster'] } }
      { path: 'doctormaster', component: DoctorMasterComponent ,canActivate:[AuthGuard],data: { roles: ['doctormaster'] }}
    ])
  ],
  exports: [RouterModule]
})
export class DoctorMasterRoutingModule { }
