import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HspotherheadsdetailsComponent } from './hspotherheadsdetails.component';
import {AuthGuard} from '../shared/login/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['hspotherheadsdetails'] } }
      { path: 'hspotherheadsdetails/:billid', component: HspotherheadsdetailsComponent ,canActivate:[AuthGuard],data: { roles: ['hospitalization'] }}
    ])
  ],
  exports: [RouterModule]
})
export class HspotherheadsdetailsRoutingModule { }
