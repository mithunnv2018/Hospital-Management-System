import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OpdbillcancelreportComponent } from './opdbillcancelreport.component';
import {AuthGuard} from '../shared/login/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['opdbillcancelreport'] } }
      { path: 'opdbillcancelreport', component: OpdbillcancelreportComponent ,canActivate:[AuthGuard],data: { roles: ['opdbillcancelreport'] }}
    ])
  ],
  exports: [RouterModule]
})
export class OpdbillcancelreportRoutingModule { }
