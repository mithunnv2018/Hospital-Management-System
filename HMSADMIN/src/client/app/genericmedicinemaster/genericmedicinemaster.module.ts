import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericmedicinemasterComponent } from './genericmedicinemaster.component';
import { GenericmedicinemasterRoutingModule } from './genericmedicinemaster-routing.module';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms'
import {PanelModule} from 'primeng/primeng';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {GrowlModule} from 'primeng/primeng';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule,SharedModule} from 'primeng/primeng';
import {InputTextModule,AutoCompleteModule,DialogModule} from 'primeng/primeng';
import {DataTableModule,InputTextareaModule,DropdownModule,FileUploadModule} from 'primeng/primeng';

import { GenericmedicinemasterService } from '../shared/genericmedicinemaster/index';


@NgModule({
  imports: [CommonModule, InputTextareaModule,SharedModule,DialogModule,AutoCompleteModule,DropdownModule,FileUploadModule,GenericmedicinemasterRoutingModule,FormsModule,DataTableModule,ReactiveFormsModule,InputTextModule,GrowlModule,ButtonModule,PanelModule,MessagesModule],//,PanelModule,MessagesModule,Growl],
  declarations: [GenericmedicinemasterComponent],
  exports: [GenericmedicinemasterComponent],
  providers: [GenericmedicinemasterService]
})
export class GenericmedicinemasterModule { }
