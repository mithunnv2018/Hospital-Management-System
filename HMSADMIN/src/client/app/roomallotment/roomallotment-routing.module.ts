import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoomallotmentComponent } from './roomallotment.component';
import {AuthGuard} from '../shared/login/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['roomallotment'] } }
      { path: 'roomallotment/:billid', component: RoomallotmentComponent ,canActivate:[AuthGuard],data: { roles: ['hospitalization'] }}
    ])
  ],
  exports: [RouterModule]
})
export class RoomallotmentRoutingModule { }
