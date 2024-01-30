import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IpdreceiptComponent } from './ipdreceipt.component';
import { IpdreceiptRoutingModule } from './ipdreceipt-routing.module';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms'
import {PanelModule} from 'primeng/primeng';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {GrowlModule} from 'primeng/primeng';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {InputTextModule,} from 'primeng/primeng';
import {DataTableModule,InputTextareaModule,DropdownModule,CalendarModule} from 'primeng/primeng';
import {AutoCompleteModule,InputSwitchModule,FieldsetModule} from 'primeng/primeng';

import { IpdreceiptService } from '../shared/ipdreceipt/index';


@NgModule({
  imports: [CommonModule, InputTextareaModule,FieldsetModule,AutoCompleteModule,InputSwitchModule,DropdownModule,CalendarModule,IpdreceiptRoutingModule,FormsModule,DataTableModule,ReactiveFormsModule,InputTextModule,GrowlModule,ButtonModule,PanelModule,MessagesModule],//,PanelModule,MessagesModule,Growl],
  declarations: [IpdreceiptComponent],
  exports: [IpdreceiptComponent],
  providers: [IpdreceiptService]
})
export class IpdreceiptModule { }
