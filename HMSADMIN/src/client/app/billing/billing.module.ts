import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingComponent } from './billing.component';
import { BillingRoutingModule } from './billing-routing.module';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms'
import {PanelModule} from 'primeng/primeng';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {GrowlModule} from 'primeng/primeng';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {InputTextModule,FieldsetModule} from 'primeng/primeng';
import {DataTableModule,InputTextareaModule,DropdownModule,CalendarModule,AutoCompleteModule} from 'primeng/primeng';

import { BillingService } from '../shared/billing/index';


@NgModule({
  imports: [CommonModule, InputTextareaModule,FieldsetModule,DropdownModule,AutoCompleteModule,CalendarModule,BillingRoutingModule,FormsModule,DataTableModule,ReactiveFormsModule,InputTextModule,GrowlModule,ButtonModule,PanelModule,MessagesModule],//,PanelModule,MessagesModule,Growl],
  declarations: [BillingComponent],
  exports: [BillingComponent],
  providers: [BillingService]
})
export class BillingModule { }
