import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SupplierMasterComponent } from './suppliermaster.component';
import {AuthGuard} from '../shared/login/auth.guard';
@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['suppliermaster'] } }
      { path: 'suppliermaster', component: SupplierMasterComponent ,canActivate:[AuthGuard],data: { roles: ['suppliermaster'] }}
    ])
  ],
  exports: [RouterModule]
})
export class SupplierMasterRoutingModule { }
