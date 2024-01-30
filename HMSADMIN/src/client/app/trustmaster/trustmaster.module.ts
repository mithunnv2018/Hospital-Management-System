import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrustMasterComponent } from './trustmaster.component';
import { TrustMasterRoutingModule } from './trustmaster-routing.module';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms'
import {PanelModule} from 'primeng/primeng';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {GrowlModule} from 'primeng/primeng';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {DataTableModule,InputTextareaModule,DropdownModule} from 'primeng/primeng';

import { TrustMasterService } from '../shared/trustmaster/index';


@NgModule({
  imports: [CommonModule, InputTextareaModule,DropdownModule,TrustMasterRoutingModule,FormsModule,DataTableModule,ReactiveFormsModule,InputTextModule,GrowlModule,ButtonModule,PanelModule,MessagesModule],//,PanelModule,MessagesModule,Growl],
  declarations: [TrustMasterComponent],
  exports: [TrustMasterComponent],
  providers: [TrustMasterService]
})
export class TrustMasterModule { }
