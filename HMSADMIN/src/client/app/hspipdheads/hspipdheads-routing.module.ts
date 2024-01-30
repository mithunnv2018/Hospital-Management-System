import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HspipdheadsComponent } from './hspipdheads.component';
import {AuthGuard} from '../shared/login/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['hspipdheads'] } }
      { path: 'hspipdheads/:billid', component: HspipdheadsComponent ,canActivate:[AuthGuard],data: { roles: ['hospitalization'] }}
    ])
  ],
  exports: [RouterModule]
})
export class HspipdheadsRoutingModule { }
