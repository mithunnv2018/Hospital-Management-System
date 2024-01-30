import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import {AuthGuard} from '../shared/login/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'home', component: HomeComponent }
    ])
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
