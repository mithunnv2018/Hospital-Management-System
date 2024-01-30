import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorMasterComponent } from './doctormaster.component';
import { DoctorMasterRoutingModule } from './doctormaster-routing.module';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms'
import {PanelModule} from 'primeng/primeng';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {GrowlModule} from 'primeng/primeng';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {DataTableModule,InputTextareaModule,DropdownModule,CalendarModule} from 'primeng/primeng';

import { DoctorMasterService } from '../shared/doctormaster/index';


@NgModule({
  imports: [CommonModule, InputTextareaModule,DropdownModule,CalendarModule,DoctorMasterRoutingModule,FormsModule,DataTableModule,ReactiveFormsModule,InputTextModule,GrowlModule,ButtonModule,PanelModule,MessagesModule],//,PanelModule,MessagesModule,Growl],
  declarations: [DoctorMasterComponent],
  exports: [DoctorMasterComponent],
  providers: [DoctorMasterService]
})
export class DoctorMasterModule { }
