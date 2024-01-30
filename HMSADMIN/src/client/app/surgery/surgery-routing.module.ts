import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SurgeryComponent } from './surgery.component';
import {AuthGuard} from '../shared/login/auth.guard';
@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['surgery'] } }
      { path: 'surgery', component: SurgeryComponent ,canActivate:[AuthGuard],data: { roles: ['surgery'] }}
    ])
  ],
  exports: [RouterModule]
})
export class SurgeryRoutingModule { }
