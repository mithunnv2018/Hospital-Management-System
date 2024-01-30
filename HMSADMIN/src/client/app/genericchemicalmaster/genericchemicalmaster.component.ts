import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {genericchemicalmasterTS} from './genericchemicalmaster';
import {DataTableModule} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';

import { GenericchemicalmasterService } from '../shared/genericchemicalmaster/index';

import { Observable } from 'rxjs/Rx';
/**
 * This class represents the lazy loaded countryComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-genericchemicalmaster',
  templateUrl: 'genericchemicalmaster.component.html',
  styleUrls: ['genericchemicalmaster.component.css']
})
export class GenericchemicalmasterComponent implements OnInit {
  
  userform: FormGroup;
  country_contacts:FormGroup;
  msgs: Message[]=[];
  genericchemicalmaster: genericchemicalmasterTS[]=[];

   submitted: boolean;
   submittedcontact:boolean;
   genericchemicalmasterVar: genericchemicalmasterTS;
   selectedRow: genericchemicalmasterTS;
 
   newgenericchemicalmasterTS: boolean;
   categorytype:string="";
   hospitalID:string="";

   newcontact: boolean;
      clear(){
            this.newgenericchemicalmasterTS=true;
            this.genericchemicalmasterVar=new genericchemicalmasterTS();
            
      }

      
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private localService: GenericchemicalmasterService){
    
              this.categorytype="bedtype";  
              // this.hospitalID="HSP1";  
              this.hospitalID=localStorage.getItem('hospitalID'); 
  }
 
  onSubmit(){
      //   alert(JSON.stringify(this.selectedRow));
        this.genericchemicalmasterVar.HospitalIdgenericchemicalmaster=this.hospitalID;
        

        this.submitted = true;
        this.msgs = [];
        console.log(JSON.stringify(this.genericchemicalmasterVar));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        if(this.newgenericchemicalmasterTS){
        
        this.localService
      .insert(JSON.stringify(this.genericchemicalmasterVar))
      .subscribe(
         /* happy path */ p => this.genericchemicalmaster = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }else{
      this.localService
      .update(JSON.stringify(this.genericchemicalmasterVar))
      .subscribe(
         /* happy path */ p => this.genericchemicalmaster = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'});
        this.clear();
  }
 

onRowSelectgenericchemicalmaster(event: any){

this.newgenericchemicalmasterTS=false;
 let tempgenericchemicalmaster:genericchemicalmasterTS;
 tempgenericchemicalmaster=this.selectedRow;

//this.ngModelGenericChemicalId= tempgenericchemicalmaster.GenericChemicalId;

this.localService.edit(tempgenericchemicalmaster.GenericChemicalId).subscribe(
p => this.genericchemicalmasterVar=p,
 e => console.log( e), 
 () => console.log("Done select") );

}


 

ngOnInit() 
{ 
  this.clear();
  this.userform = this.fb.group({'GenericChemicalName':new FormControl('', Validators. required),'GenericChemicalAliasname':new FormControl('', Validators. required),});

  this.localService
    .getall('DUMMY')
    .subscribe(
    p => this.genericchemicalmaster = p,
    e => console.log( e),
    () => console.log('done getDisplayAll2' + JSON.stringify(this.genericchemicalmaster)));

}
  
 

  initContact() {
        // initialize our address
        // return this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        return   this.userform = this.fb.group({'GenericChemicalName':new FormControl('', Validators. required),'GenericChemicalAliasname':new FormControl('', Validators. required),});

    }

  //Dropdown change event capture
  drpchange(events1: any){
    // alert(events1.value);
  }

  get diagnostic() { return JSON.stringify(this.userform.value); }
 }
