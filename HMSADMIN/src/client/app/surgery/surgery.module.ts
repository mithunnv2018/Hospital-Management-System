import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurgeryComponent } from './surgery.component';
import { SurgeryRoutingModule } from './surgery-routing.module';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms'
import {PanelModule} from 'primeng/primeng';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {GrowlModule} from 'primeng/primeng';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {DataTableModule,InputTextareaModule,DropdownModule} from 'primeng/primeng';

import { SurgeryService } from '../shared/surgery/index';


@NgModule({
  imports: [CommonModule, InputTextareaModule,DropdownModule,SurgeryRoutingModule,FormsModule,DataTableModule,ReactiveFormsModule,InputTextModule,GrowlModule,ButtonModule,PanelModule,MessagesModule],//,PanelModule,MessagesModule,Growl],
  declarations: [SurgeryComponent],
  exports: [SurgeryComponent],
  providers: [SurgeryService]
})
export class SurgeryModule { }
