import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StaffMasterComponent } from './staffmaster.component';
import {AuthGuard} from '../shared/login/auth.guard';
@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['staffmaster'] } }
      { path: 'staffmaster', component: StaffMasterComponent ,canActivate:[AuthGuard],data: { roles: ['staffmaster'] }}
    ])
  ],
  exports: [RouterModule]
})
export class StaffMasterRoutingModule { }
