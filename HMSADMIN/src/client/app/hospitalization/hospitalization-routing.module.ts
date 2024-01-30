import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HospitalizationComponent } from './hospitalization.component';
import {AuthGuard} from '../shared/login/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['hospitalization'] } }
      { path: 'hospitalization', component: HospitalizationComponent ,canActivate:[AuthGuard],data: { roles: ['hospitalization'] }},
      { path: 'hospitalization/:billid', component: HospitalizationComponent ,canActivate:[AuthGuard],data: { roles: ['hospitalization'] }}
    ])
  ],
  exports: [RouterModule]
})
export class HospitalizationRoutingModule { }
