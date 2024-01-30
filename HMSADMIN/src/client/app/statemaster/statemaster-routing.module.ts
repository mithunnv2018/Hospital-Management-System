import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StateMasterComponent } from './statemaster.component';
import {AuthGuard} from '../shared/login/auth.guard';
@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['statemaster'] } }
      { path: 'statemaster', component: StateMasterComponent ,canActivate:[AuthGuard],data: { roles: ['statemaster'] }}
    ])
  ],
  exports: [RouterModule]
})
export class StateMasterRoutingModule { }
