import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SonographychargesComponent } from './sonographycharges.component';
import {AuthGuard} from '../shared/login/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['sonographycharges'] } }
      { path: 'sonographycharges/:billid', component: SonographychargesComponent ,canActivate:[AuthGuard],data: { roles: ['hospitalization'] }}
    ])
  ],
  exports: [RouterModule]
})
export class SonographychargesRoutingModule { }
