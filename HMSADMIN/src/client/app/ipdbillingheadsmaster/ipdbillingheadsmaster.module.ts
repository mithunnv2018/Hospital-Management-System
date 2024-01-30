import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IpdbillingheadsMasterComponent } from './ipdbillingheadsmaster.component';
import { IpdbillingheadsMasterRoutingModule } from './ipdbillingheadsmaster-routing.module';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms'
import {PanelModule} from 'primeng/primeng';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {GrowlModule} from 'primeng/primeng';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {DataTableModule,InputTextareaModule,DropdownModule,CalendarModule} from 'primeng/primeng';

import { IpdbillingheadsMasterService } from '../shared/ipdbillingheadsmaster/index';


@NgModule({
  imports: [CommonModule, InputTextareaModule,DropdownModule,CalendarModule,IpdbillingheadsMasterRoutingModule,FormsModule,DataTableModule,ReactiveFormsModule,InputTextModule,GrowlModule,ButtonModule,PanelModule,MessagesModule],//,PanelModule,MessagesModule,Growl],
  declarations: [IpdbillingheadsMasterComponent],
  exports: [IpdbillingheadsMasterComponent],
  providers: [IpdbillingheadsMasterService]
})
export class IpdbillingheadsMasterModule { }
