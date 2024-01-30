import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IpdpapersComponent } from './ipdpapers.component';
import {AuthGuard} from '../shared/login/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['ipdpapers'] } }
      { path: 'ipdpapers', component: IpdpapersComponent ,canActivate:[AuthGuard],data: { roles: ['hospitalization'] }}
    ])
  ],
  exports: [RouterModule]
})
export class IpdpapersRoutingModule { }
