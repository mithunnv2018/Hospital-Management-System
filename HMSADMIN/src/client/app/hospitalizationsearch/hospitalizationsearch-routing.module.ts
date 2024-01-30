import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HospitalizationsearchComponent } from './hospitalizationsearch.component';
import {AuthGuard} from '../shared/login/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['hospitalizationsearch'] } }
      { path: 'hospitalizationsearch', component: HospitalizationsearchComponent ,canActivate:[AuthGuard],data: { roles: ['hospitalizationsearch'] }}
    ])
  ],
  exports: [RouterModule]
})
export class HospitalizationsearchRoutingModule { }
