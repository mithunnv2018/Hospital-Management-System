import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HspipdheadsComponent } from './hspipdheads.component';
import { HspipdheadsRoutingModule } from './hspipdheads-routing.module';
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

import { HspipdheadsService } from '../shared/hspipdheads/index';



@NgModule({
  imports: [CommonModule, InputTextareaModule,ConfirmDialogModule,AutoCompleteModule,DropdownModule,CalendarModule,HspipdheadsRoutingModule,FormsModule,DataTableModule,ReactiveFormsModule,InputTextModule,GrowlModule,ButtonModule,PanelModule,MessagesModule],//,PanelModule,MessagesModule,Growl],
  declarations: [HspipdheadsComponent],
  exports: [HspipdheadsComponent],
  providers: [HspipdheadsService,ConfirmationService]
})
export class HspipdheadsModule { }
