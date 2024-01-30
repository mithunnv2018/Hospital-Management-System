import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffMasterComponent } from './staffmaster.component';
import { StaffMasterRoutingModule } from './staffmaster-routing.module';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms'
import {PanelModule} from 'primeng/primeng';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {GrowlModule} from 'primeng/primeng';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {DataTableModule,InputTextareaModule,DropdownModule,CalendarModule} from 'primeng/primeng';

import { StaffMasterService } from '../shared/staffmaster/index';


@NgModule({
  imports: [CommonModule, InputTextareaModule,DropdownModule,CalendarModule,StaffMasterRoutingModule,FormsModule,DataTableModule,ReactiveFormsModule,InputTextModule,GrowlModule,ButtonModule,PanelModule,MessagesModule],//,PanelModule,MessagesModule,Growl],
  declarations: [StaffMasterComponent],
  exports: [StaffMasterComponent],
  providers: [StaffMasterService]
})
export class StaffMasterModule { }
