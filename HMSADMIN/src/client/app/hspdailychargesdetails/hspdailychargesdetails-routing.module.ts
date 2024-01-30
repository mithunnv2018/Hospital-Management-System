import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HspdailychargesdetailsComponent } from './hspdailychargesdetails.component';
import {AuthGuard} from '../shared/login/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['hspdailychargesdetails'] } }
      { path: 'hspdailychargesdetails/:billid', component: HspdailychargesdetailsComponent ,canActivate:[AuthGuard],data: { roles: ['hospitalization'] }}
    ])
  ],
  exports: [RouterModule]
})
export class HspdailychargesdetailsRoutingModule { }
