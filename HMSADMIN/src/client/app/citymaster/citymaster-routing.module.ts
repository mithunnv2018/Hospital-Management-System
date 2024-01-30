import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CityMasterComponent } from './citymaster.component';
import {AuthGuard} from '../shared/login/auth.guard';
@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['citymaster'] } }
      { path: 'citymaster', component: CityMasterComponent,canActivate:[AuthGuard],data: { roles: ['citymaster'] } }
    ])
  ],
  exports: [RouterModule]
})
export class CityMasterRoutingModule { }
