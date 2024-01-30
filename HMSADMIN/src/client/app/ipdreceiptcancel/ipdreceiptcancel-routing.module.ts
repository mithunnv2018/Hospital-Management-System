import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IpdreceiptcancelComponent } from './ipdreceiptcancel.component';
import {AuthGuard} from '../shared/login/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['ipdreceiptcancel'] } }
      { path: 'ipdreceiptcancel', component: IpdreceiptcancelComponent ,canActivate:[AuthGuard],data: { roles: ['ipdreceiptcancel'] }}
    ])
  ],
  exports: [RouterModule]
})
export class IpdreceiptcancelRoutingModule { }
