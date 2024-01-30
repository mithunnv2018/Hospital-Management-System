import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OPDBillDetailsComponent } from './opdbilldetails.component';
import { OPDBillDetailsRoutingModule } from './opdbilldetails-routing.module';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms'
import {PanelModule} from 'primeng/primeng';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {GrowlModule} from 'primeng/primeng';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {DataTableModule,InputTextareaModule,DropdownModule,CalendarModule,SpinnerModule} from 'primeng/primeng';
import {AutoCompleteModule,ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';

import { OPDBillDetailsService } from '../shared/opdbilldetails/index';


@NgModule({
  imports: [CommonModule, InputTextareaModule,ConfirmDialogModule,AutoCompleteModule,DropdownModule,CalendarModule,SpinnerModule,OPDBillDetailsRoutingModule,FormsModule,DataTableModule,ReactiveFormsModule,InputTextModule,GrowlModule,ButtonModule,PanelModule,MessagesModule],//,PanelModule,MessagesModule,Growl],
  declarations: [OPDBillDetailsComponent],
  exports: [OPDBillDetailsComponent],
  providers: [OPDBillDetailsService,ConfirmationService]
})
export class OPDBillDetailsModule { }
