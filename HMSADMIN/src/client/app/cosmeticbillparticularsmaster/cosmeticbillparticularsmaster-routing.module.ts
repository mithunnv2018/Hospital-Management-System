import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CosmeticBillParticularsMasterComponent } from './cosmeticbillparticularsmaster.component';
import {AuthGuard} from '../shared/login/auth.guard';
@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['cosmeticbillparticularsmaster'] } }
      { path: 'cosmeticbillparticularsmaster', component: CosmeticBillParticularsMasterComponent ,canActivate:[AuthGuard],data: { roles: ['cosmeticbillparticularsmaster'] }}
    ])
  ],
  exports: [RouterModule]
})
export class CosmeticBillParticularsMasterRoutingModule { }
