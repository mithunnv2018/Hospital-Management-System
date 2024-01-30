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
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-about',
  templateUrl: 'about.component.html',
  styleUrls: ['about.component.css']
})
export class AboutComponent { 

  events:any[]=[];
  header:any;
  event:MyEvent;
  defaultdate:any;

  ngOnInit() { 

      this.defaultdate='2017-01-07';
      this.events=[
        {
          allDay:false,
          end:'2017-01-07T16:00',
          start:'2017-01-07T10:00',
          title:'Big Meeeting',
          
        }
      ];

      this.header = {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		};
  }
}
