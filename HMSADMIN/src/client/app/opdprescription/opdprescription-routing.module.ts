import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OpdprescriptionComponent } from './opdprescription.component';
import {AuthGuard} from '../shared/login/auth.guard';
@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['opdprescription'] } }
      { path: 'opdprescription', component: OpdprescriptionComponent ,canActivate:[AuthGuard],data: { roles: ['opdprescription'] }}
    ])
  ],
  exports: [RouterModule]
})
export class OpdprescriptionRoutingModule { }
