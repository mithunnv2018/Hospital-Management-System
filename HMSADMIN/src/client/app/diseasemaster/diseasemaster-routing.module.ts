import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DiseaseMasterComponent } from './diseasemaster.component';
import {AuthGuard} from '../shared/login/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['bedsmaster'] } }
      { path: 'diseasemaster', component: DiseaseMasterComponent ,canActivate:[AuthGuard],data: { roles: ['diseasemaster'] }}
    ])
  ],
  exports: [RouterModule]
})
export class DiseaseMasterRoutingModule { }
