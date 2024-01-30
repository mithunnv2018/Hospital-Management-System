import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IpddoctorchargesreportComponent } from './ipddoctorchargesreport.component';
import { IpddoctorchargesreportRoutingModule } from './ipddoctorchargesreport-routing.module';
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

import { IpddoctorchargesreportService } from '../shared/ipddoctorchargesreport/index';


@NgModule({
  imports: [CommonModule, InputTextareaModule,ConfirmDialogModule,AutoCompleteModule,FileUploadModule,DropdownModule,CalendarModule,IpddoctorchargesreportRoutingModule,FormsModule,DataTableModule,ReactiveFormsModule,InputTextModule,GrowlModule,ButtonModule,PanelModule,MessagesModule],//,PanelModule,MessagesModule,Growl],
  declarations: [IpddoctorchargesreportComponent],
  exports: [IpddoctorchargesreportComponent],
  providers: [IpddoctorchargesreportService,ConfirmationService]
})
export class IpddoctorchargesreportModule { }
