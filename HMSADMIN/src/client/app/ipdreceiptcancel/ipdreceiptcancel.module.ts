import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IpdreceiptcancelComponent } from './ipdreceiptcancel.component';
import { IpdreceiptcancelRoutingModule } from './ipdreceiptcancel-routing.module';
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

import { IpdreceiptcancelService } from '../shared/ipdreceiptcancel/index';


@NgModule({
  imports: [CommonModule, InputTextareaModule,ConfirmDialogModule,AutoCompleteModule,FileUploadModule,DropdownModule,CalendarModule,IpdreceiptcancelRoutingModule,FormsModule,DataTableModule,ReactiveFormsModule,InputTextModule,GrowlModule,ButtonModule,PanelModule,MessagesModule],//,PanelModule,MessagesModule,Growl],
  declarations: [IpdreceiptcancelComponent],
  exports: [IpdreceiptcancelComponent],
  providers: [IpdreceiptcancelService,ConfirmationService]
})
export class IpdreceiptcancelModule { }
