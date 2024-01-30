import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {CountryMasterTS} from '../country/country';
import {DataTableModule} from 'primeng/primeng';
import {SelectItem,CalendarModule} from 'primeng/primeng';

import { MyDateFormat } from '../shared/pipes/mydateformat.pipe';

import { InsuranceMasterService } from '../shared/insurancemaster/index';

import { Observable } from 'rxjs/Rx';
import {insuranceTS} from './insurancemaster';
import {VwInsuranceHospitalTS} from './VwInsuranceHospitalTS';

/**
 * This class represents the lazy loaded countryComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-insurancemaster',
  templateUrl: 'insurancemaster.component.html',
  styleUrls: ['insurancemaster.component.css'],
  providers:[MyDateFormat]

})
export class InsuranceMasterComponent implements OnInit {
  
  userform: FormGroup;
  country_contacts:FormGroup;
  msgs: Message[]=[];
   
  VwInsuranceHospital:VwInsuranceHospitalTS[]=[];

   submitted: boolean;
   submittedcontact:boolean;
   insuranceVar: insuranceTS;
   selectedRow: VwInsuranceHospitalTS;


     newVwInsuranceHospital: boolean;
   newcontact: boolean;

    hospitalID:string="";
    drpcashlessoptions:SelectItem[]=[];

   clear(){
        this.  newVwInsuranceHospital=true;
        this.insuranceVar=new insuranceTS();
        
    }

      
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private localService: InsuranceMasterService,
              private mydate1: MyDateFormat){
                
               this.hospitalID=localStorage.getItem('hospitalID');  
   
  }

onRowSelectVwInsuranceHospital(event: any){

this.newVwInsuranceHospital=false;
 let tempVwInsuranceHospital:VwInsuranceHospitalTS;
 tempVwInsuranceHospital=this.selectedRow;

//this.ngModelInsuranceId= tempVwInsuranceHospital.InsuranceId;

this.localService.edit(tempVwInsuranceHospital.InsuranceId).subscribe(
p => this.insuranceVar=p,
 e => console.log( e), 
 () => console.log( "edit") );

}


  onSubmit(){

      //   alert(JSON.stringify(this.selectedRow));
        

        this.insuranceVar.HospitalIdInsurance=this.hospitalID;
        this.submitted = true;
        this.msgs = [];
        console.log(JSON.stringify(this.insuranceVar));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        if(this.  newVwInsuranceHospital){
        this.localService
      .insert(JSON.stringify(this.insuranceVar))
      .subscribe(
         /* happy path */ p => this.VwInsuranceHospital = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }else{
      this.localService
      .update(JSON.stringify(this.insuranceVar))
      .subscribe(
         /* happy path */ p => this.VwInsuranceHospital = p,
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
      
      this.userform = this.fb.group({'InsuranceName':new FormControl('', Validators. required),'InsuranceCashless':new FormControl('', Validators. required),});

 
        this.localService
      .getall(this.hospitalID)
      .subscribe(
         /* happy path */ p => this.VwInsuranceHospital= p,
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done getDisplayAll2' + JSON.stringify(this.VwInsuranceHospital)));

         this.drpcashlessoptions=[
           {
           label:"--Is Cashless--",
           value:"1"
         },{
           label:"Yes",
           value:"Yes"
         },
         {
           label:"No",
           value:"No"
         }];
  
         this.insuranceVar=new insuranceTS();
  }

 

 

  initContact() {
        // initialize our address
        // return this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        //return this.userform = this.fb.group({'CountryName':new FormControl('', Validators. required),'CountryAliasName':new FormControl('', Validators. required),});
        return this.userform = this.fb.group({'InsuranceName':new FormControl('', Validators. required),'InsuranceCashless':new FormControl('', Validators. required),});



    }

  //Dropdown change event capture
  drpchange(events1: any){
    // alert(events1.value);
  }

  

  get diagnostic() { return JSON.stringify(this.userform.value); }
 }
