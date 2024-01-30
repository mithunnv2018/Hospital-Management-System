import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OpdbillparticularsMasterComponent } from './opdbillparticularsmaster.component';
import {AuthGuard} from '../shared/login/auth.guard';
@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['opdbillparticularsmaster'] } }
      { path: 'opdbillparticularsmaster', component: OpdbillparticularsMasterComponent ,canActivate:[AuthGuard],data: { roles: ['opdbillparticularsmaster'] }}
    ])
  ],
  exports: [RouterModule]
})
export class OpdbillparticularsMasterRoutingModule { }
