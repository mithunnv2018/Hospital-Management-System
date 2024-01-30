import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryMasterComponent } from './categorymaster.component';
import {AuthGuard} from '../shared/login/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['categorymaster'] } }
      { path: 'categorymaster', component: CategoryMasterComponent ,canActivate:[AuthGuard],data: { roles: ['categorymaster'] } }
    ])
  ],
  exports: [RouterModule]
})
export class CategoryMasterRoutingModule { }
