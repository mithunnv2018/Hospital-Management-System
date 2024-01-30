import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TrustMasterComponent } from './trustmaster.component';
import {AuthGuard} from '../shared/login/auth.guard';
@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['trustmaster'] } }
      { path: 'trustmaster', component: TrustMasterComponent ,canActivate:[AuthGuard],data: { roles: ['trustmaster'] }}
    ])
  ],
  exports: [RouterModule]
})
export class TrustMasterRoutingModule { }
