import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpdreceiptComponent } from './opdreceipt.component';
import { OpdreceiptRoutingModule } from './opdreceipt-routing.module';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms'
import {PanelModule} from 'primeng/primeng';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {GrowlModule} from 'primeng/primeng';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {DataTableModule,InputTextareaModule,DropdownModule,CalendarModule,AutoCompleteModule} from 'primeng/primeng';

import { OpdreceiptService } from '../shared/opdreceipt/index';


@NgModule({
  imports: [CommonModule, InputTextareaModule,DropdownModule,AutoCompleteModule,CalendarModule,OpdreceiptRoutingModule,FormsModule,DataTableModule,ReactiveFormsModule,InputTextModule,GrowlModule,ButtonModule,PanelModule,MessagesModule],//,PanelModule,MessagesModule,Growl],
  declarations: [OpdreceiptComponent],
  exports: [OpdreceiptComponent],
  providers: [OpdreceiptService]
})
export class OpdreceiptModule { }
