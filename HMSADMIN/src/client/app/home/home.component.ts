import { Component,OnInit } from '@angular/core';
import {MyEvent} from './myevent';

import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {DataTableModule} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';

 
import { Observable } from 'rxjs/Rx';


/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent { 

 
  ngOnInit() { 

  }
}
