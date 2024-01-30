import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BedsMasterComponent } from './bedsmaster.component';
import {AuthGuard} from '../shared/login/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['bedsmaster'] } }
      { path: 'bedsmaster', component: BedsMasterComponent ,canActivate:[AuthGuard],data: { roles: ['bedsmaster'] }}
    ])
  ],
  exports: [RouterModule]
})
export class BedsMasterRoutingModule { }
