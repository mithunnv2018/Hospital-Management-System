import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OpdbillsortbyparticularsreportComponent } from './opdbillsortbyparticularsreport.component';
import {AuthGuard} from '../shared/login/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      //{ path: 'country', component: CountryComponent,canActivate:[AuthGuard],data: { roles: ['opdbillsortbyparticularsreport'] } }
      { path: 'opdbillsortbyparticularsreport', component: OpdbillsortbyparticularsreportComponent ,canActivate:[AuthGuard],data: { roles: ['opdbillsortbyparticularsreport'] }}
    ])
  ],
  exports: [RouterModule]
})
export class OpdbillsortbyparticularsreportRoutingModule { }
