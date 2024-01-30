import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManufacturerMasterComponent } from './manufacturermaster.component';
import { ManufacturerMasterRoutingModule } from './manufacturermaster-routing.module';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms'
import {PanelModule} from 'primeng/primeng';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {GrowlModule} from 'primeng/primeng';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {DataTableModule,InputTextareaModule,DropdownModule} from 'primeng/primeng';

import { ManufacturerMasterService } from '../shared/manufacturermaster/index';


@NgModule({
  imports: [CommonModule, InputTextareaModule,DropdownModule,ManufacturerMasterRoutingModule,FormsModule,DataTableModule,ReactiveFormsModule,InputTextModule,GrowlModule,ButtonModule,PanelModule,MessagesModule],//,PanelModule,MessagesModule,Growl],
  declarations: [ManufacturerMasterComponent],
  exports: [ManufacturerMasterComponent],
  providers: [ManufacturerMasterService]
})
export class ManufacturerMasterModule { }
