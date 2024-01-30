import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HspotherheadsdetailsComponent } from './hspotherheadsdetails.component';
import { HspotherheadsdetailsRoutingModule } from './hspotherheadsdetails-routing.module';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms'
import {PanelModule} from 'primeng/primeng';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {GrowlModule} from 'primeng/primeng';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {InputTextModule,} from 'primeng/primeng';
import {DataTableModule,InputTextareaModule,DropdownModule,CalendarModule} from 'primeng/primeng';
import {AutoCompleteModule,ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';

import { HspotherheadsdetailsService } from '../shared/hspotherheadsdetails/index';


@NgModule({
  imports: [CommonModule, InputTextareaModule,ConfirmDialogModule,AutoCompleteModule,DropdownModule,CalendarModule,HspotherheadsdetailsRoutingModule,FormsModule,DataTableModule,ReactiveFormsModule,InputTextModule,GrowlModule,ButtonModule,PanelModule,MessagesModule],//,PanelModule,MessagesModule,Growl],
  declarations: [HspotherheadsdetailsComponent],
  exports: [HspotherheadsdetailsComponent],
  providers: [HspotherheadsdetailsService,ConfirmationService]
})
export class HspotherheadsdetailsModule { }
