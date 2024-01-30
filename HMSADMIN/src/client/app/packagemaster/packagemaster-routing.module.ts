import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PackageMasterComponent } from './packagemaster.component';
import {AuthGuard} from '../shared/login/auth.guard';
@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['packagemaster'] } }
      { path: 'packagemaster', component: PackageMasterComponent ,canActivate:[AuthGuard],data: { roles: ['packagemaster'] }}
    ])
  ],
  exports: [RouterModule]
})
export class PackageMasterRoutingModule { }
