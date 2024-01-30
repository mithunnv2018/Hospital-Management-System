import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpdbillparticularsMasterComponent } from './opdbillparticularsmaster.component';
import { OpdbillparticularsMasterRoutingModule } from './opdbillparticularsmaster-routing.module';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms'
import {PanelModule} from 'primeng/primeng';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {GrowlModule} from 'primeng/primeng';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {DataTableModule,InputTextareaModule,DropdownModule} from 'primeng/primeng';

import { OpdbillparticularsMasterService } from '../shared/opdbillparticularsmaster/index';


@NgModule({
  imports: [CommonModule, InputTextareaModule,DropdownModule,OpdbillparticularsMasterRoutingModule,FormsModule,DataTableModule,ReactiveFormsModule,InputTextModule,GrowlModule,ButtonModule,PanelModule,MessagesModule],//,PanelModule,MessagesModule,Growl],
  declarations: [OpdbillparticularsMasterComponent],
  exports: [OpdbillparticularsMasterComponent],
  providers: [OpdbillparticularsMasterService]
})
export class OpdbillparticularsMasterModule { }
