import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HspipddischargedetailsComponent } from './hspipddischargedetails.component';
import {AuthGuard} from '../shared/login/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['hspipddischargedetails'] } }
      { path: 'hspipddischargedetails/:billid', component: HspipddischargedetailsComponent ,canActivate:[AuthGuard],data: { roles: ['hospitalization'] }}
    ])
  ],
  exports: [RouterModule]
})
export class HspipddischargedetailsRoutingModule { }
