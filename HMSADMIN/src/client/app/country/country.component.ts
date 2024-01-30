import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {CountryMasterTS} from './country';
import {DataTableModule} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';

import { CountryService } from '../shared/country/index';

import { Observable } from 'rxjs/Rx';
/**
 * This class represents the lazy loaded countryComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-country',
  templateUrl: 'country.component.html',
  styleUrls: ['country.component.css']
})
export class CountryComponent implements OnInit {
  
  userform: FormGroup;
  country_contacts:FormGroup;
  msgs: Message[]=[];
  countrys: CountryMasterTS[]=[];

   submitted: boolean;
   submittedcontact:boolean;
   country: CountryMasterTS;
   selectedRow: CountryMasterTS;

   


 




   newcountry: boolean;
      newcontact: boolean;
      clear(){
            this.newcountry=true;
            this.country={
              CountryId:'',CountryName:'',CountryAliasName:'' 
            };
            
      }

      
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private localService: CountryService){
    
   
  }
  onRowSelect(event: any){
         this.newcountry=false;
         //this.contact = this.cloneCar(event.data);
         let temcount:CountryMasterTS=this.selectedRow;

         this.localService
      .edit(temcount.CountryId)
      .subscribe(
         /* happy path */ p => this.country=p,
         /* error path */ e => console.log( e),
         /* onComplete */ () => {} );//console.log('done getselectEditproject: ' + this.project));


  }


  onSubmit(){
      //   alert(JSON.stringify(this.selectedRow));
        this.submitted = true;
        this.msgs = [];
        console.log(JSON.stringify(this.country));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        if(this.newcountry){
        this.localService
      .insert(JSON.stringify(this.country))
      .subscribe(
         /* happy path */ p => this.countrys = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }else{
      this.localService
      .update(JSON.stringify(this.country))
      .subscribe(
         /* happy path */ p => this.countrys = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'});
        this.clear();  
      }




    
    

  ngOnInit() { 

      this.clear();
      
  

        // this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        this.userform = this.fb.group({'CountryName':new FormControl('', Validators. required),'CountryAliasName':new FormControl('', Validators. required),});

        this.localService
      .getall('DUMMY')
      .subscribe(
         /* happy path */ p => this.countrys = p,
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done getDisplayAll2' + JSON.stringify(this.country)));

         this.country={
           CountryId:'',CountryName:'',CountryAliasName:''
 
        }
  }

  
 

  initContact() {
        // initialize our address
        // return this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        return this.userform = this.fb.group({'CountryName':new FormControl('', Validators. required),'CountryAliasName':new FormControl('', Validators. required),});
    }

  //Dropdown change event capture
  drpchange(events1: any){
    // alert(events1.value);
  }

  get diagnostic() { return JSON.stringify(this.userform.value); }
 }
