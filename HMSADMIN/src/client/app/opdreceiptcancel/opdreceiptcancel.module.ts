import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpdreceiptcancelComponent } from './opdreceiptcancel.component';
import { OpdreceiptcancelRoutingModule } from './opdreceiptcancel-routing.module';
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

import { OpdreceiptcancelService } from '../shared/opdreceiptcancel/index';


@NgModule({
  imports: [CommonModule, InputTextareaModule,ConfirmDialogModule,AutoCompleteModule,FileUploadModule,DropdownModule,CalendarModule,OpdreceiptcancelRoutingModule,FormsModule,DataTableModule,ReactiveFormsModule,InputTextModule,GrowlModule,ButtonModule,PanelModule,MessagesModule],//,PanelModule,MessagesModule,Growl],
  declarations: [OpdreceiptcancelComponent],
  exports: [OpdreceiptcancelComponent],
  providers: [OpdreceiptcancelService,ConfirmationService]
})
export class OpdreceiptcancelModule { }
