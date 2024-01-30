import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomallotmentComponent } from './roomallotment.component';
import { RoomallotmentRoutingModule } from './roomallotment-routing.module';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms'
import {PanelModule} from 'primeng/primeng';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {GrowlModule} from 'primeng/primeng';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {InputTextModule,} from 'primeng/primeng';
import {DataTableModule,InputTextareaModule,DropdownModule,CalendarModule} from 'primeng/primeng';
import {AutoCompleteModule,InputSwitchModule} from 'primeng/primeng';

import { RoomallotmentService } from '../shared/roomallotment/index';


@NgModule({
  imports: [CommonModule, InputTextareaModule,AutoCompleteModule,InputSwitchModule,DropdownModule,CalendarModule,RoomallotmentRoutingModule,FormsModule,DataTableModule,ReactiveFormsModule,InputTextModule,GrowlModule,ButtonModule,PanelModule,MessagesModule],//,PanelModule,MessagesModule,Growl],
  declarations: [RoomallotmentComponent],
  exports: [RoomallotmentComponent],
  providers: [RoomallotmentService]
})
export class RoomallotmentModule { }
