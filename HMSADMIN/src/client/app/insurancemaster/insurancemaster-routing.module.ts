import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InsuranceMasterComponent } from './insurancemaster.component';
import {AuthGuard} from '../shared/login/auth.guard';
@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['insurancemaster'] } }
      { path: 'insurancemaster', component: InsuranceMasterComponent ,canActivate:[AuthGuard],data: { roles: ['insurancemaster'] } }
    ])
  ],
  exports: [RouterModule]
})
export class InsuranceMasterRoutingModule { }
