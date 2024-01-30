import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GenericchemicalmasterComponent } from './genericchemicalmaster.component';
import {AuthGuard} from '../shared/login/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['genericchemicalmaster'] } }
      { path: 'genericchemicalmaster', component: GenericchemicalmasterComponent ,canActivate:[AuthGuard],data: { roles: ['genericchemicalmaster'] }}
    ])
  ],
  exports: [RouterModule]
})
export class GenericchemicalmasterRoutingModule { }
