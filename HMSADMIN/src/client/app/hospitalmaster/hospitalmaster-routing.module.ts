import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HospitalMasterComponent } from './hospitalmaster.component';
import {AuthGuard} from '../shared/login/auth.guard';
@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['hospitalmaster'] } }
      { path: 'hospitalmaster', component: HospitalMasterComponent,canActivate:[AuthGuard],data: { roles: ['hospitalmaster'] } }
    ])
  ],
  exports: [RouterModule]
})
export class HospitalMasterRoutingModule { }
