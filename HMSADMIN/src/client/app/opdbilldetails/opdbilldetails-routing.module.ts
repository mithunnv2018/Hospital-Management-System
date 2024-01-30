import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OPDBillDetailsComponent } from './opdbilldetails.component';
import {AuthGuard} from '../shared/login/auth.guard';
@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['opdbilldetails'] } }
      { path: 'opdbilldetails', component: OPDBillDetailsComponent ,canActivate:[AuthGuard],data: { roles: ['opdbilldetails'] }}
    ])
  ],
  exports: [RouterModule]
})
export class OPDBillDetailsRoutingModule { }
