import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OpdbillcancelComponent } from './opdbillcancel.component';
import {AuthGuard} from '../shared/login/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['opdbillcancel'] } }
      { path: 'opdbillcancel', component: OpdbillcancelComponent ,canActivate:[AuthGuard],data: { roles: ['opdbillcancel'] }}
    ])
  ],
  exports: [RouterModule]
})
export class OpdbillcancelRoutingModule { }
