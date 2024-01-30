import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IpdMasterComponent } from './ipdmaster.component';
import { IpdMasterRoutingModule } from './ipdmaster-routing.module';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms'
import {PanelModule} from 'primeng/primeng';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {GrowlModule} from 'primeng/primeng';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {DataTableModule,InputTextareaModule,DropdownModule,CalendarModule} from 'primeng/primeng';

import { IpdMasterService } from '../shared/ipdmaster/index';


@NgModule({
  imports: [CommonModule, InputTextareaModule,DropdownModule,CalendarModule,IpdMasterRoutingModule,FormsModule,DataTableModule,ReactiveFormsModule,InputTextModule,GrowlModule,ButtonModule,PanelModule,MessagesModule],//,PanelModule,MessagesModule,Growl],
  declarations: [IpdMasterComponent],
  exports: [IpdMasterComponent],
  providers: [IpdMasterService]
})
export class IpdMasterModule { }
