import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HspdailychargesdetailsComponent } from './hspdailychargesdetails.component';
import { HspdailychargesdetailsRoutingModule } from './hspdailychargesdetails-routing.module';
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

import { HspdailychargesdetailsService } from '../shared/hspdailychargesdetails/index';


@NgModule({
  imports: [CommonModule, InputTextareaModule,InputSwitchModule,AutoCompleteModule,DropdownModule,CalendarModule,HspdailychargesdetailsRoutingModule,FormsModule,DataTableModule,ReactiveFormsModule,InputTextModule,GrowlModule,ButtonModule,PanelModule,MessagesModule],//,PanelModule,MessagesModule,Growl],
  declarations: [HspdailychargesdetailsComponent],
  exports: [HspdailychargesdetailsComponent],
  providers: [HspdailychargesdetailsService]
})
export class HspdailychargesdetailsModule { }
