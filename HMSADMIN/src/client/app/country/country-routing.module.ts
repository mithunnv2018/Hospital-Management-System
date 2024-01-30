import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CountryComponent } from './country.component';
import {AuthGuard} from '../shared/login/auth.guard';
@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['country'] } }
      { path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['country'] } }
    ])
  ],
  exports: [RouterModule]
})
export class CountryRoutingModule { }
