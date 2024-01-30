import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ManufacturerMasterComponent } from './manufacturermaster.component';
import {AuthGuard} from '../shared/login/auth.guard';
@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['manufacturermaster'] } }
      { path: 'manufacturermaster', component: ManufacturerMasterComponent ,canActivate:[AuthGuard],data: { roles: ['manufacturermaster'] }}
    ])
  ],
  exports: [RouterModule]
})
export class ManufacturerMasterRoutingModule { }
