import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HospitalizationComponent } from './hospitalization.component';
import { HospitalizationRoutingModule } from './hospitalization-routing.module';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms'
import {PanelModule} from 'primeng/primeng';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {GrowlModule} from 'primeng/primeng';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {InputTextModule,} from 'primeng/primeng';
import {DataTableModule,InputTextareaModule,DropdownModule,CalendarModule} from 'primeng/primeng';
import {AutoCompleteModule} from 'primeng/primeng';

import { HospitalizationService } from '../shared/hospitalization/index';


@NgModule({
  imports: [CommonModule, InputTextareaModule,AutoCompleteModule,DropdownModule,CalendarModule,HospitalizationRoutingModule,FormsModule,DataTableModule,ReactiveFormsModule,InputTextModule,GrowlModule,ButtonModule,PanelModule,MessagesModule],//,PanelModule,MessagesModule,Growl],
  declarations: [HospitalizationComponent],
  exports: [HospitalizationComponent],
  providers: [HospitalizationService]
})
export class HospitalizationModule { }
