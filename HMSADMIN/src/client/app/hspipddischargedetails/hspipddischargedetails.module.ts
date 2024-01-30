import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HspipddischargedetailsComponent } from './hspipddischargedetails.component';
import { HspipddischargedetailsRoutingModule } from './hspipddischargedetails-routing.module';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms'
import {PanelModule} from 'primeng/primeng';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {GrowlModule,DialogModule,SelectButtonModule} from 'primeng/primeng';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule,ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import {InputTextModule,CalendarModule,InputSwitchModule,SpinnerModule} from 'primeng/primeng';
import {DataTableModule,InputTextareaModule,DropdownModule,AutoCompleteModule} from 'primeng/primeng';

import { HspipddischargedetailsService } from '../shared/hspipddischargedetails/index';


@NgModule({
  imports: [CommonModule, InputTextareaModule,DialogModule,SelectButtonModule,ConfirmDialogModule,InputSwitchModule,SpinnerModule,CalendarModule,AutoCompleteModule,DropdownModule,HspipddischargedetailsRoutingModule,FormsModule,DataTableModule,ReactiveFormsModule,InputTextModule,GrowlModule,ButtonModule,PanelModule,MessagesModule],//,PanelModule,MessagesModule,Growl],
  declarations: [HspipddischargedetailsComponent],
  exports: [HspipddischargedetailsComponent],
  providers: [HspipddischargedetailsService,ConfirmationService]
})
export class HspipddischargedetailsModule { }
