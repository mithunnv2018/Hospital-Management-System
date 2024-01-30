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

import { IpdMasterService } from '../shared/ipdmaster/index';

import { Observable } from 'rxjs/Rx';
import {ipdmasterTS} from './ipdmaster';
import {VwIPDDepartmentTypeHospitalTS} from './VwIPDDepartmentTypeHospitalTS';

/**
 * This class represents the lazy loaded countryComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-ipdmaster',
  templateUrl: 'ipdmaster.component.html',
  styleUrls: ['ipdmaster.component.css'],
  providers:[MyDateFormat]

})
export class IpdMasterComponent implements OnInit {
  
  userform: FormGroup;
  country_contacts:FormGroup;
  msgs: Message[]=[];
   
  VwIPDDepartmentTypeHospital:VwIPDDepartmentTypeHospitalTS[]=[];

   submitted: boolean;
   submittedcontact:boolean;
   ipdmasterVar: ipdmasterTS;
   selectedRow: VwIPDDepartmentTypeHospitalTS;


   newVwIPDDepartmentTypeHospital: boolean;
   newcontact: boolean;

    hospitalID:string="";

    IPDDob:Date;
    drpinsuranceipdoptions:SelectItem[]=[];

    drpcategorytypedepartmentoptions:SelectItem[]=[];
    drpcategorytypeinsurancepolicyoptions:SelectItem[]=[];
    drpgenderptions:SelectItem[]=[];
    drpMaritalStatusoptions:SelectItem[]=[];
    
    searchbyname:string;

   clear(){
        this.  newVwIPDDepartmentTypeHospital=true;
        this.ipdmasterVar=new ipdmasterTS();
        this.IPDDob=null;

        // this.ipdmasterVar.IPDFName
	      this.ipdmasterVar.IPDMName="-";
	      this.ipdmasterVar.IPDLName="-";
	      this.ipdmasterVar.IPDAddress1="-";
	      this.ipdmasterVar.IPDAddress2="-";
	      this.ipdmasterVar.IPDCity="-";
	      this.ipdmasterVar.IPDPin="-";
	      this.ipdmasterVar.IPDPhone="-";
	      this.ipdmasterVar.IPDMobile="-";
	      this.ipdmasterVar.IPDEmail  ="-";
	      this.ipdmasterVar.IPDFax="-";
	      this.ipdmasterVar.IPDBG="-";
	      this.ipdmasterVar.IPDKeenname="-";
	      this.ipdmasterVar.IPDKeenrelation="-";
	      this.ipdmasterVar.IPDKeenphone="-";
	      this.ipdmasterVar.IPDRef="-";
	      this.ipdmasterVar.IPDRemarks="-";
	      this.ipdmasterVar.IPDComplaint="-";
	      this.ipdmasterVar.IPDWeight="-";
	      this.ipdmasterVar.IPDBP="-";
	      this.ipdmasterVar.IPDFamilydoc="-";
	      this.ipdmasterVar.IPDFamilydocphone="-";
	      this.ipdmasterVar.IPDPulse="-";
	      this.ipdmasterVar.IPDInsuranceLimit="-";
	      this.ipdmasterVar.IPDInsurancePolicyNos="-";
        this.ipdmasterVar.IPDAgeYears="0";
        this.ipdmasterVar.IPDAgeMonths="0";
        this.ipdmasterVar.IPDSex="1";
        this.ipdmasterVar.IPDMaritalStatus="1";
        this.ipdmasterVar.InsuranceIdIPDMaster="1";
        this.ipdmasterVar.CategoryIdDepartmentType="1";        
        this.ipdmasterVar.CategoryIdInsurancePolicyType="1";
        
        //this.downloadfile("DUMMY");
    }

      
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private localService: IpdMasterService,
              private mydate1: MyDateFormat){
                
               this.hospitalID=localStorage.getItem('hospitalID');  
   
  }


onRowSelectVwIPDDepartmentTypeHospital(event: any){

this.newVwIPDDepartmentTypeHospital=false;
 let tempVwIPDDepartmentTypeHospital:VwIPDDepartmentTypeHospitalTS;
 tempVwIPDDepartmentTypeHospital=this.selectedRow;

//this.ngModelIPDId= tempVwIPDDepartmentTypeHospital.IPDId;

this.localService.edit(tempVwIPDDepartmentTypeHospital.IPDId).subscribe(
p => this.ipdmasterVar=p,
 e => console.log( e), 
 () => this.aftercalldate() );

}


searchByName(){
  
  this.localService.getWS_VwIPDDepartmentTypeHospital_bypatientname_selectjson(this.hospitalID,this.searchbyname)
    .subscribe(
      /* happy path */ p => this.VwIPDDepartmentTypeHospital= p,
      /* error path */ e => console.log( e),
      /* onComplete */ () => console.log('done getDisplayAll2' + JSON.stringify(this.VwIPDDepartmentTypeHospital)));
}
 





  onSubmit(){

      //   alert(JSON.stringify(this.selectedRow));
        this.ipdmasterVar.IPDDob=this.mydate1.parse(this.IPDDob);

        this.ipdmasterVar.HospitalIdIPDMaster=this.hospitalID;
        this.submitted = true;
        this.msgs = [];
        console.log(JSON.stringify(this.ipdmasterVar));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        if(this.  newVwIPDDepartmentTypeHospital){
        this.localService
      .insert(JSON.stringify(this.ipdmasterVar))
      .subscribe(
         /* happy path */ p => this.VwIPDDepartmentTypeHospital = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }else{
      this.localService
      .update(JSON.stringify(this.ipdmasterVar))
      .subscribe(
         /* happy path */ p => this.VwIPDDepartmentTypeHospital = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'});
        this.clear();
  }


  onPatientNameChange(){
    let a="";
    if(this.ipdmasterVar.IPDFName){
      a+=this.ipdmasterVar.IPDFName+" ";

    }
    if(this.ipdmasterVar.IPDMName){
      a+=this.ipdmasterVar.IPDMName+" ";
    }
    if(this.ipdmasterVar.IPDLName){
      a+=this.ipdmasterVar.IPDLName+" ";
    }
    
    this.ipdmasterVar.IPDName=a;
  }


    
    

  ngOnInit() { 

      let departmenttype:string="departmenttype";
      let policytype:string="policytype";
      
      this.clear();
      
      this.userform = this.fb.group({'CategoryIdDepartmentType':new FormControl('', Validators. required),'IPDFName':new FormControl('', Validators. required),'IPDMName':new FormControl('', Validators. required),'IPDLName':new FormControl('', Validators. required),'IPDAddress1':new FormControl('', Validators. required),'IPDSex':new FormControl('', Validators. required),'IPDAgeMonths':new FormControl('', Validators. required),'IPDAgeYears':new FormControl('', Validators. required),});
      // this.userform = this.fb.group({'CategoryIdDepartmentType':new FormControl('', Validators. required),'IPDName':new FormControl('', Validators. required),'IPDFName':new FormControl('', Validators. required),'IPDMName':new FormControl('', Validators. required),'IPDLName':new FormControl('', Validators. required),'IPDAddress1':new FormControl('', Validators. required),'IPDDob':new FormControl('', Validators. required),'IPDSex':new FormControl('', Validators. required),'InsuranceIdIPDMaster':new FormControl('', Validators. required),'CategoryIdInsurancePolicyType':new FormControl('', Validators. required),});
      
 

          this.localService.getInsurance_HospitalIdInsurancedrp(this.hospitalID).subscribe(         
        /* happy path */ p => {
            this. drpinsuranceipdoptions = p;
            this.drpinsuranceipdoptions.unshift({label:"--Select Insurance--" , value:"1"} )
          },
         /* error path */ e => console.log( e),
         /* onComplete */ () => {
            console.log('done getDisplayAll2' + JSON.stringify(this.drpinsuranceipdoptions));

            this.localService.getCategoryMasterdrp(departmenttype,this.hospitalID).subscribe(         
            /* happy path */ p => {
                this. drpcategorytypedepartmentoptions = p;
                this.drpcategorytypedepartmentoptions.unshift({label:"--Select Department Type--" , value:"1"} )
              },
            /* error path */ e => console.log( e),
            /* onComplete */ () => {console.log('done getDisplayAll2' + JSON.stringify(this.drpcategorytypedepartmentoptions));
                           this.localService.getCategoryMasterdrp(policytype,this.hospitalID).subscribe(         
                            /* happy path */ p => {
                                this. drpcategorytypeinsurancepolicyoptions = p;
                                this.drpcategorytypeinsurancepolicyoptions.unshift({label:"--Select Policy Type--" , value:"1"} )
                              },
                            /* error path */ e => console.log( e),
                            /* onComplete */ () => {console.log('done getDisplayAll2' + JSON.stringify(this.drpcategorytypeinsurancepolicyoptions));
                                         this.localService
                                          .getall(this.hospitalID)
                                          .subscribe(
                                            /* happy path */ p => this.VwIPDDepartmentTypeHospital= p,
                                            /* error path */ e => console.log( e),
                                            /* onComplete */ () => console.log('done getDisplayAll2' + JSON.stringify(this.VwIPDDepartmentTypeHospital)));
      
                              }
                            );

              }
            );
          }
         );


          


         this.drpgenderptions=[
           {
             label:"--Select Gender",
             value:"1"
           },
           {
             label:"Male",
             value:"Male"
           },
           {
             label:"Female",
             value:"Female"
           }
           
         ];
 
        this.drpMaritalStatusoptions=[
        {
          label:'--Select Marital Status--',
          value:"1"
        },
        {
          label:'Married',
          value:'Married'
        },
        {
          label:'Unmarried',
          value:'Unmarried'
        },
        {
          label:'Divorced',
          value:'Divorced'
        },
        {
          label:'Widow',
          value:'Widow'
        }
      ];
          

         //this.ipdmasterVar=new ipdmasterTS();
  }

    aftercalldate(){
      this.IPDDob= new Date(Number(this.ipdmasterVar.IPDDob ));;
    
    }

 

  initContact() {
        // initialize our address
        // return this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        //return this.userform = this.fb.group({'CountryName':new FormControl('', Validators. required),'CountryAliasName':new FormControl('', Validators. required),});
        return this.userform = this.fb.group({'CategoryIdDepartmentType':new FormControl('', Validators. required),'IPDFName':new FormControl('', Validators. required),'IPDMName':new FormControl('', Validators. required),'IPDLName':new FormControl('', Validators. required),'IPDAddress1':new FormControl('', Validators. required),'IPDSex':new FormControl('', Validators. required),'IPDAgeMonths':new FormControl('', Validators. required),'IPDAgeYears':new FormControl('', Validators. required),});

    }

  //Dropdown change event capture
  drpchange(events1: any){
    // alert(events1.value);
  }

  

  get diagnostic() { return JSON.stringify(this.userform.value); }
 }
