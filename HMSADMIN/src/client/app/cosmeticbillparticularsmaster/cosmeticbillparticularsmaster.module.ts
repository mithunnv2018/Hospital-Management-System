import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CosmeticBillParticularsMasterComponent } from './cosmeticbillparticularsmaster.component';
import { CosmeticBillParticularsMasterRoutingModule } from './cosmeticbillparticularsmaster-routing.module';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms'
import {PanelModule} from 'primeng/primeng';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {GrowlModule} from 'primeng/primeng';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {DataTableModule,InputTextareaModule,DropdownModule} from 'primeng/primeng';

import { CosmeticBillParticularsMasterService } from '../shared/cosmeticbillparticularsmaster/index';


@NgModule({
  imports: [CommonModule, InputTextareaModule,DropdownModule,CosmeticBillParticularsMasterRoutingModule,FormsModule,DataTableModule,ReactiveFormsModule,InputTextModule,GrowlModule,ButtonModule,PanelModule,MessagesModule],//,PanelModule,MessagesModule,Growl],
  declarations: [CosmeticBillParticularsMasterComponent],
  exports: [CosmeticBillParticularsMasterComponent],
  providers: [CosmeticBillParticularsMasterService]
})
export class CosmeticBillParticularsMasterModule { }
