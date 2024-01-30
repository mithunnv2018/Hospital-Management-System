import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CosmeticBillDetailsComponent } from './cosmeticbilldetails.component';
import {AuthGuard} from '../shared/login/auth.guard';
@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['cosmeticbilldetails'] } }
      { path: 'cosmeticbilldetails', component: CosmeticBillDetailsComponent ,canActivate:[AuthGuard],data: { roles: ['cosmeticbilldetails'] }}
    ])
  ],
  exports: [RouterModule]
})
export class CosmeticBillDetailsRoutingModule { }
