import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GenericmedicinemasterComponent } from './genericmedicinemaster.component';
import {AuthGuard} from '../shared/login/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['genericmedicinemaster'] } }
      { path: 'genericmedicinemaster', component: GenericmedicinemasterComponent ,canActivate:[AuthGuard],data: { roles: ['genericmedicinemaster'] }}
    ])
  ],
  exports: [RouterModule]
})
export class GenericmedicinemasterRoutingModule { }
