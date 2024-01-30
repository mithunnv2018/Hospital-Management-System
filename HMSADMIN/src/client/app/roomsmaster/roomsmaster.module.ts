import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsMasterComponent } from './roomsmaster.component';
import { RoomsMasterRoutingModule } from './roomsmaster-routing.module';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms'
import {PanelModule} from 'primeng/primeng';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {GrowlModule} from 'primeng/primeng';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {DataTableModule,InputTextareaModule,DropdownModule} from 'primeng/primeng';

import { RoomsMasterService } from '../shared/roomsmaster/index';


@NgModule({
  imports: [CommonModule, InputTextareaModule,DropdownModule,RoomsMasterRoutingModule,FormsModule,DataTableModule,ReactiveFormsModule,InputTextModule,GrowlModule,ButtonModule,PanelModule,MessagesModule],//,PanelModule,MessagesModule,Growl],
  declarations: [RoomsMasterComponent],
  exports: [RoomsMasterComponent],
  providers: [RoomsMasterService]
})
export class RoomsMasterModule { }
