import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HospitalizationscreenComponent } from './hospitalizationscreen.component';
import { HospitalizationscreenRoutingModule } from './hospitalizationscreen-routing.module';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms'
import {PanelModule} from 'primeng/primeng';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {GrowlModule} from 'primeng/primeng';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {InputTextModule,FieldsetModule} from 'primeng/primeng';
import {DataTableModule,InputTextareaModule,DropdownModule,CalendarModule} from 'primeng/primeng';

import { HospitalizationscreenService } from '../shared/hospitalizationscreen/index';


@NgModule({
  imports: [CommonModule, InputTextareaModule,DropdownModule,CalendarModule,HospitalizationscreenRoutingModule,FieldsetModule,FormsModule,DataTableModule,ReactiveFormsModule,InputTextModule,GrowlModule,ButtonModule,PanelModule,MessagesModule],//,PanelModule,MessagesModule,Growl],
  declarations: [HospitalizationscreenComponent],
  exports: [HospitalizationscreenComponent],
  providers: [HospitalizationscreenService]
})
export class HospitalizationscreenModule { }
