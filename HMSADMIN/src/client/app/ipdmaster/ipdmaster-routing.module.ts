import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IpdMasterComponent } from './ipdmaster.component';
import {AuthGuard} from '../shared/login/auth.guard';
@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['ipdmaster'] } }
      { path: 'ipdmaster', component: IpdMasterComponent ,canActivate:[AuthGuard],data: { roles: ['ipdmaster'] }}
    ])
  ],
  exports: [RouterModule]
})
export class IpdMasterRoutingModule { }
