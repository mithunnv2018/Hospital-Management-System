import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityMasterComponent } from './citymaster.component';
import { CityMasterRoutingModule } from './citymaster-routing.module';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms'
import {PanelModule} from 'primeng/primeng';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {GrowlModule} from 'primeng/primeng';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {DataTableModule,InputTextareaModule,DropdownModule} from 'primeng/primeng';

import { CityMasterService } from '../shared/citymaster/index';


@NgModule({
  imports: [CommonModule, InputTextareaModule,DropdownModule,CityMasterRoutingModule,FormsModule,DataTableModule,ReactiveFormsModule,InputTextModule,GrowlModule,ButtonModule,PanelModule,MessagesModule],//,PanelModule,MessagesModule,Growl],
  declarations: [CityMasterComponent],
  exports: [CityMasterComponent],
  providers: [CityMasterService]
})
export class CityMasterModule { }
