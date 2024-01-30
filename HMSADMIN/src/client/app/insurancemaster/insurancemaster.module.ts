import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsuranceMasterComponent } from './insurancemaster.component';
import { InsuranceMasterRoutingModule } from './insurancemaster-routing.module';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms'
import {PanelModule} from 'primeng/primeng';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {GrowlModule} from 'primeng/primeng';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {DataTableModule,InputTextareaModule,DropdownModule,CalendarModule} from 'primeng/primeng';

import { InsuranceMasterService } from '../shared/insurancemaster/index';


@NgModule({
  imports: [CommonModule, InputTextareaModule,DropdownModule,CalendarModule,InsuranceMasterRoutingModule,FormsModule,DataTableModule,ReactiveFormsModule,InputTextModule,GrowlModule,ButtonModule,PanelModule,MessagesModule],//,PanelModule,MessagesModule,Growl],
  declarations: [InsuranceMasterComponent],
  exports: [InsuranceMasterComponent],
  providers: [InsuranceMasterService]
})
export class InsuranceMasterModule { }
