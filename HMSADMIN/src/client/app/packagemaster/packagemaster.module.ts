import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackageMasterComponent } from './packagemaster.component';
import { PackageMasterRoutingModule } from './packagemaster-routing.module';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms'
import {PanelModule} from 'primeng/primeng';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {GrowlModule} from 'primeng/primeng';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {DataTableModule,InputTextareaModule,DropdownModule} from 'primeng/primeng';

import { PackageMasterService } from '../shared/packagemaster/index';


@NgModule({
  imports: [CommonModule, InputTextareaModule,DropdownModule,PackageMasterRoutingModule,FormsModule,DataTableModule,ReactiveFormsModule,InputTextModule,GrowlModule,ButtonModule,PanelModule,MessagesModule],//,PanelModule,MessagesModule,Growl],
  declarations: [PackageMasterComponent],
  exports: [PackageMasterComponent],
  providers: [PackageMasterService]
})
export class PackageMasterModule { }
