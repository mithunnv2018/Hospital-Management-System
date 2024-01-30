import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {CountryMasterTS} from '../country/country';
import {DataTableModule} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';


import { TrustMasterService } from '../shared/trustmaster/index';

import { Observable } from 'rxjs/Rx';
import {trustTS} from './trustmaster';
import {VwTrustHospitalTS} from './VwTrustHospitalTS';

/**
 * This class represents the lazy loaded countryComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-trustmaster',
  templateUrl: 'trustmaster.component.html',
  styleUrls: ['trustmaster.component.css']
})
export class TrustMasterComponent implements OnInit {
  
  userform: FormGroup;
  country_contacts:FormGroup;
  msgs: Message[]=[];
   
  VwTrustHospital:VwTrustHospitalTS[]=[];

   submitted: boolean;
   submittedcontact:boolean;
   trustVar: trustTS;
   selectedRow: VwTrustHospitalTS;


     newVwTrustHospital: boolean;
   newcontact: boolean;

    hospitalID:string="";

    drpapplydiscountoptionss:SelectItem[]=[];

   clear(){
        this.  newVwTrustHospital=true;
        this.trustVar=new trustTS();
        
        //this.downloadfile("DUMMY");
    }

      
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private localService: TrustMasterService){
                
               this.hospitalID=localStorage.getItem('hospitalID');  
   
  }

 
 
onRowSelectVwTrustHospital(event: any){

this.newVwTrustHospital=false;
 let tempVwTrustHospital:VwTrustHospitalTS;
 tempVwTrustHospital=this.selectedRow;

//this.ngModelTrustId= tempVwTrustHospital.TrustId;

this.localService.edit(tempVwTrustHospital.TrustId).subscribe(
p => this.trustVar=p,
 e => console.log( e), 
 () => console.log( "EDIT") );

}





  onSubmit(){
      //   alert(JSON.stringify(this.selectedRow));
        this.trustVar.HospitalIdTrust=this.hospitalID;
        this.submitted = true;
        this.msgs = [];
        console.log(JSON.stringify(this.trustVar));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        if(this.  newVwTrustHospital){
        this.localService
      .insert(JSON.stringify(this.trustVar))
      .subscribe(
         /* happy path */ p => this.VwTrustHospital = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }else{
      this.localService
      .update(JSON.stringify(this.trustVar))
      .subscribe(
         /* happy path */ p => this.VwTrustHospital = p,
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
      
  

        this.userform = this.fb.group({'TrustName':new FormControl('', Validators. required),'TrustDiscountPercentage':new FormControl('', Validators. required),'TrustApplyDiscount':new FormControl('', Validators. required),'TrustApplyIndividualPrice':new FormControl('', Validators. required),});
      
 
        this.localService
      .getall(this.hospitalID)
      .subscribe(
         /* happy path */ p => this.VwTrustHospital= p,
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done getDisplayAll2' + JSON.stringify(this.VwTrustHospital)));

         this.drpapplydiscountoptionss=[
           {
             label:"--Apply Discount--",
             value:"1"
           },
           {
             label:"Yes",
             value:"yes"
           },
           {
             label:"No",
             value:"no"
           },
           
         ];

         this.trustVar=new trustTS();
  }

  
 

  initContact() {
        // initialize our address
        // return this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        //return this.userform = this.fb.group({'CountryName':new FormControl('', Validators. required),'CountryAliasName':new FormControl('', Validators. required),});
        return this.userform = this.fb.group({'TrustName':new FormControl('', Validators. required),'TrustDiscountPercentage':new FormControl('', Validators. required),'TrustApplyDiscount':new FormControl('', Validators. required),'TrustApplyIndividualPrice':new FormControl('', Validators. required),});

    }

  //Dropdown change event capture
  drpchange(events1: any){
    // alert(events1.value);
  }

  

  get diagnostic() { return JSON.stringify(this.userform.value); }
 }
