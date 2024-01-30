import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SonographyheadsMasterComponent } from './sonographyheadsmaster.component';
import {AuthGuard} from '../shared/login/auth.guard';
@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['sonographyheadsmaster'] } }
      { path: 'sonographyheadsmaster', component: SonographyheadsMasterComponent ,canActivate:[AuthGuard],data: { roles: ['sonographyheadsmaster'] }}
    ])
  ],
  exports: [RouterModule]
})
export class SonographyheadsMasterRoutingModule { }
