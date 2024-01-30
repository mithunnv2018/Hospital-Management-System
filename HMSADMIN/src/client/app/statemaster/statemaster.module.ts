import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateMasterComponent } from './statemaster.component';
import { StateMasterRoutingModule } from './statemaster-routing.module';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms'
import {PanelModule} from 'primeng/primeng';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {GrowlModule} from 'primeng/primeng';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {DataTableModule,InputTextareaModule,DropdownModule} from 'primeng/primeng';

import { StateMasterService } from '../shared/statemaster/index';


@NgModule({
  imports: [CommonModule, InputTextareaModule,DropdownModule,StateMasterRoutingModule,FormsModule,DataTableModule,ReactiveFormsModule,InputTextModule,GrowlModule,ButtonModule,PanelModule,MessagesModule],//,PanelModule,MessagesModule,Growl],
  declarations: [StateMasterComponent],
  exports: [StateMasterComponent],
  providers: [StateMasterService]
})
export class StateMasterModule { }
