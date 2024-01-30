import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpdprescriptionComponent } from './opdprescription.component';
import { OpdprescriptionRoutingModule } from './opdprescription-routing.module';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms'
import {PanelModule} from 'primeng/primeng';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {GrowlModule} from 'primeng/primeng';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {InputTextModule,DialogModule,SelectButtonModule} from 'primeng/primeng';
import {DataTableModule,InputTextareaModule,DropdownModule,CalendarModule,SpinnerModule} from 'primeng/primeng';
import {AutoCompleteModule,ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';

import { OpdprescriptionService } from '../shared/opdprescription/index';


@NgModule({
  imports: [CommonModule, InputTextareaModule,SelectButtonModule,DialogModule,ConfirmDialogModule,AutoCompleteModule,DropdownModule,CalendarModule,SpinnerModule,OpdprescriptionRoutingModule,FormsModule,DataTableModule,ReactiveFormsModule,InputTextModule,GrowlModule,ButtonModule,PanelModule,MessagesModule],//,PanelModule,MessagesModule,Growl],
  declarations: [OpdprescriptionComponent],
  exports: [OpdprescriptionComponent],
  providers: [OpdprescriptionService,ConfirmationService]
})
export class OpdprescriptionModule { }
