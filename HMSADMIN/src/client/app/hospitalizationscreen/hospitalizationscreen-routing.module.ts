import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HospitalizationscreenComponent } from './hospitalizationscreen.component';
import {AuthGuard} from '../shared/login/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['hospitalizationscreen'] } }
      { path: 'hospitalizationscreen/:billid', component: HospitalizationscreenComponent,canActivate:[AuthGuard],data: { roles: ['hospitalization'] } }
    ])
  ],
  exports: [RouterModule]
})
export class HospitalizationscreenRoutingModule { }
