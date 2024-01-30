import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CosmeticBillDetailsComponent } from './cosmeticbilldetails.component';
import { CosmeticBillDetailsRoutingModule } from './cosmeticbilldetails-routing.module';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms'
import {PanelModule} from 'primeng/primeng';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {GrowlModule} from 'primeng/primeng';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {DataTableModule,InputTextareaModule,DropdownModule,CalendarModule,SpinnerModule} from 'primeng/primeng';
import {AutoCompleteModule,ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';

import { CosmeticbilldetailsService } from '../shared/cosmeticbilldetails/index';


@NgModule({
  imports: [CommonModule, InputTextareaModule,ConfirmDialogModule,AutoCompleteModule,DropdownModule,CalendarModule,SpinnerModule,CosmeticBillDetailsRoutingModule,FormsModule,DataTableModule,ReactiveFormsModule,InputTextModule,GrowlModule,ButtonModule,PanelModule,MessagesModule],//,PanelModule,MessagesModule,Growl],
  declarations: [CosmeticBillDetailsComponent],
  exports: [CosmeticBillDetailsComponent],
  providers: [CosmeticbilldetailsService,ConfirmationService]
})
export class CosmeticBillDetailsModule { }
