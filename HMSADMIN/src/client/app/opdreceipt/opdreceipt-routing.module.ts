import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OpdreceiptComponent } from './opdreceipt.component';
import {AuthGuard} from '../shared/login/auth.guard';
@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['opdreceipt'] } }
      { path: 'opdreceipt', component: OpdreceiptComponent ,canActivate:[AuthGuard],data: { roles: ['opdreceipt'] }}
    ])
  ],
  exports: [RouterModule]
})
export class OpdreceiptRoutingModule { }
