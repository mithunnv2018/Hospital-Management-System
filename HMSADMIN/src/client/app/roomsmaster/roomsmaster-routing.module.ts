import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoomsMasterComponent } from './roomsmaster.component';
import {AuthGuard} from '../shared/login/auth.guard';
@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['roomsmaster'] } }
      { path: 'roomsmaster', component: RoomsMasterComponent ,canActivate:[AuthGuard],data: { roles: ['roomsmaster'] }}
    ])
  ],
  exports: [RouterModule]
})
export class RoomsMasterRoutingModule { }
