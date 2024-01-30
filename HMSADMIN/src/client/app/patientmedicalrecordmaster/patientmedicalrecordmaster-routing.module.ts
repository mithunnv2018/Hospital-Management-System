import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PatientmedicalrecordMasterComponent } from './patientmedicalrecordmaster.component';
import {AuthGuard} from '../shared/login/auth.guard';
@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['patientmedicalrecordmaster'] } }
      { path: 'patientmedicalrecordmaster', component: PatientmedicalrecordMasterComponent ,canActivate:[AuthGuard],data: { roles: ['patientmedicalrecordmaster'] }}
    ])
  ],
  exports: [RouterModule]
})
export class PatientmedicalrecordMasterRoutingModule { }
