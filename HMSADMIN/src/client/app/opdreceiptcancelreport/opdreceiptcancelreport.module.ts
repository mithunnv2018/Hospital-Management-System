import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpdreceiptcancelreportComponent } from './opdreceiptcancelreport.component';
import { OpdreceiptcancelreportRoutingModule } from './opdreceiptcancelreport-routing.module';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms'
import {PanelModule,FileUploadModule} from 'primeng/primeng';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {GrowlModule} from 'primeng/primeng';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {InputTextModule,} from 'primeng/primeng';
import {DataTableModule,InputTextareaModule,DropdownModule,CalendarModule} from 'primeng/primeng';
import {AutoCompleteModule,ConfirmationService,ConfirmDialogModule} from 'primeng/primeng';

import { OpdreceiptcancelreportService } from '../shared/opdreceiptcancelreport/index';


@NgModule({
  imports: [CommonModule, InputTextareaModule,ConfirmDialogModule,AutoCompleteModule,FileUploadModule,DropdownModule,CalendarModule,OpdreceiptcancelreportRoutingModule,FormsModule,DataTableModule,ReactiveFormsModule,InputTextModule,GrowlModule,ButtonModule,PanelModule,MessagesModule],//,PanelModule,MessagesModule,Growl],
  declarations: [OpdreceiptcancelreportComponent],
  exports: [OpdreceiptcancelreportComponent],
  providers: [OpdreceiptcancelreportService,ConfirmationService]
})
export class OpdreceiptcancelreportModule { }
