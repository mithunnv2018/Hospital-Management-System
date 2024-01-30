import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OpdreceiptcancelComponent } from './opdreceiptcancel.component';
import {AuthGuard} from '../shared/login/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['opdreceiptcancel'] } }
      { path: 'opdreceiptcancel', component: OpdreceiptcancelComponent ,canActivate:[AuthGuard],data: { roles: ['opdreceiptcancel'] }}
    ])
  ],
  exports: [RouterModule]
})
export class OpdreceiptcancelRoutingModule { }
