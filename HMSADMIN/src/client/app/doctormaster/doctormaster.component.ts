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

import { DoctorMasterService } from '../shared/doctormaster/index';

import { Observable } from 'rxjs/Rx';
import {doctormasterTS} from './doctormaster';
import {VwDoctorDepartmentConsultantTypeHospitalTS} from './VwDoctorDepartmentConsultantTypeHospitalTS';

/**
 * This class represents the lazy loaded countryComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-doctormaster',
  templateUrl: 'doctormaster.component.html',
  styleUrls: ['doctormaster.component.css'],
  providers:[MyDateFormat]

})
export class DoctorMasterComponent implements OnInit {
  
  userform: FormGroup;
  country_contacts:FormGroup;
  msgs: Message[]=[];
   
  VwDoctorDepartmentConsultantTypeHospital:VwDoctorDepartmentConsultantTypeHospitalTS[]=[];

   submitted: boolean;
   submittedcontact:boolean;
   doctormasterVar: doctormasterTS;
   selectedRow: VwDoctorDepartmentConsultantTypeHospitalTS;


     newVwDoctorDepartmentConsultantTypeHospital: boolean;
   newcontact: boolean;

    hospitalID:string="";

    DoctorDob:Date;

    drpcategorytypedepartmentoptions:SelectItem[]=[];
    drpcategorytypeconsultantoptions:SelectItem[]=[];
    drpcategorytypedoctoroptions:SelectItem[]=[];
    drpcategorytypequalificationoptions:SelectItem[]=[];

   clear(){
        this.  newVwDoctorDepartmentConsultantTypeHospital=true;
        this.doctormasterVar=new doctormasterTS();
        this.DoctorDob=null;
        //this.downloadfile("DUMMY");
    }

      
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private localService: DoctorMasterService,
              private mydate1: MyDateFormat){
                
               this.hospitalID=localStorage.getItem('hospitalID');  
   
  }


onRowSelectVwDoctorDepartmentConsultantTypeHospital(event: any){

this.newVwDoctorDepartmentConsultantTypeHospital=false;
 let tempVwDoctorDepartmentConsultantTypeHospital:VwDoctorDepartmentConsultantTypeHospitalTS;
 tempVwDoctorDepartmentConsultantTypeHospital=this.selectedRow;

//this.ngModelDoctorId= tempVwDoctorDepartmentConsultantTypeHospital.DoctorId;

this.localService.edit(tempVwDoctorDepartmentConsultantTypeHospital.DoctorId).subscribe(
p => this.doctormasterVar=p,
 e => console.log( e), 
 () => this.aftercalldate() );

}





  onSubmit(){

      //   alert(JSON.stringify(this.selectedRow));
        this.doctormasterVar.DoctorDob=this.mydate1.parse(this.DoctorDob);

        this.doctormasterVar.HospitalIdDoctorMaster=this.hospitalID;
        this.submitted = true;
        this.msgs = [];
        console.log(JSON.stringify(this.doctormasterVar));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        if(this.  newVwDoctorDepartmentConsultantTypeHospital){
        this.localService
      .insert(JSON.stringify(this.doctormasterVar))
      .subscribe(
         /* happy path */ p => this.VwDoctorDepartmentConsultantTypeHospital = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }else{
      this.localService
      .update(JSON.stringify(this.doctormasterVar))
      .subscribe(
         /* happy path */ p => this.VwDoctorDepartmentConsultantTypeHospital = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'});
        this.clear();
  }




    
    

  ngOnInit() { 

      let departmenttype:string="departmenttype";
      let consultanttype:string="consultanttype";
      let doctortype:string="doctor";
      let qualificationtype:string="qualificationtype";
      
      this.clear();
      
      this.userform = this.fb.group({'CategoryIdDepartmentDoctorMaster':new FormControl('', Validators. required),'CategoryIdConsultantDoctorMaster':new FormControl('', Validators. required),'DoctorFName':new FormControl('', Validators. required),'DoctorMName':new FormControl('', Validators. required),'DoctorLName':new FormControl('', Validators. required),'DoctorName':new FormControl('', Validators. required),'DoctorDob':new FormControl('', Validators. required),'DoctorPhoneno':new FormControl('', Validators. required),'DoctorMobileno':new FormControl('', Validators. required),'DoctorEmailid':new FormControl('', Validators. required),'DoctorFax':new FormControl('', Validators. required),'DoctorAddress1':new FormControl('', Validators. required),'DoctorAddress2':new FormControl('', Validators. required),'DoctorCity':new FormControl('', Validators. required),'DoctorPin':new FormControl('', Validators. required),'CategoryIdDoctorType':new FormControl('', Validators. required),'CategoryIdQualificationType':new FormControl('', Validators. required),'DoctorQualification':new FormControl('', Validators. required),'DoctorAvailableDays':new FormControl('', Validators. required),'DoctorChargesNormal':new FormControl('', Validators. required),});

      
 

          this.localService.getCategoryMasterdrp(departmenttype,this.hospitalID).subscribe(         
        /* happy path */ p => {
            this. drpcategorytypedepartmentoptions = p;
            this.drpcategorytypedepartmentoptions.unshift({label:"--Select Department Type--" , value:"1"} )
          },
         /* error path */ e => console.log( e),
         /* onComplete */ () => {console.log('done getDisplayAll2' + JSON.stringify(this.drpcategorytypedepartmentoptions))
                this.localService.getCategoryMasterdrp(consultanttype,this.hospitalID).subscribe(         
                /* happy path */ p => {
                    this. drpcategorytypeconsultantoptions = p;
                    this.drpcategorytypeconsultantoptions.unshift({label:"--Select Consultant Type--" , value:"1"} )
                  },
                /* error path */ e => console.log( e),
                /* onComplete */ () =>{ console.log('done getDisplayAll2' + JSON.stringify(this.drpcategorytypeconsultantoptions))
                        this.localService.getCategoryMasterdrp(doctortype,this.hospitalID).subscribe(         
                        /* happy path */ p => {
                            this. drpcategorytypedoctoroptions = p;
                            this.drpcategorytypedoctoroptions.unshift({label:"--Select Department Type--" , value:"1"} )
                          },
                        /* error path */ e => console.log( e),
                        /* onComplete */ () => {console.log('done getDisplayAll2' + JSON.stringify(this.drpcategorytypedoctoroptions))
                                         this.localService.getCategoryMasterdrp(qualificationtype,this.hospitalID).subscribe(         
                                          /* happy path */ p => {
                                              this. drpcategorytypequalificationoptions = p;
                                              this.drpcategorytypequalificationoptions.unshift({label:"--Select Qualification Type--" , value:"1"} )
                                            },
                                          /* error path */ e => console.log( e),
                                          /* onComplete */ () => {console.log('done getDisplayAll2' + JSON.stringify(this.drpcategorytypequalificationoptions))
                                                      this.localService
                                                      .getall(this.hospitalID)
                                                      .subscribe(
                                                        /* happy path */ p => this.VwDoctorDepartmentConsultantTypeHospital= p,
                                                        /* error path */ e => console.log( e),
                                                        /* onComplete */ () => console.log('done getDisplayAll2' + JSON.stringify(this.VwDoctorDepartmentConsultantTypeHospital)));
                                            
                                            }
                                          );
                            
                            }
                        );

                
                  }
                );

          }
        );

         

         this.doctormasterVar=new doctormasterTS();
  }

    aftercalldate(){
      this.DoctorDob= new Date(Number(this.doctormasterVar.DoctorDob ));;
    
    }

 

  initContact() {
        // initialize our address
        // return this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        //return this.userform = this.fb.group({'CountryName':new FormControl('', Validators. required),'CountryAliasName':new FormControl('', Validators. required),});
        return this.userform = this.fb.group({'CategoryIdDepartmentDoctorMaster':new FormControl('', Validators. required),'CategoryIdConsultantDoctorMaster':new FormControl('', Validators. required),'DoctorFName':new FormControl('', Validators. required),'DoctorMName':new FormControl('', Validators. required),'DoctorLName':new FormControl('', Validators. required),'DoctorName':new FormControl('', Validators. required),'DoctorDob':new FormControl('', Validators. required),'DoctorPhoneno':new FormControl('', Validators. required),'DoctorMobileno':new FormControl('', Validators. required),'DoctorEmailid':new FormControl('', Validators. required),'DoctorFax':new FormControl('', Validators. required),'DoctorAddress1':new FormControl('', Validators. required),'DoctorAddress2':new FormControl('', Validators. required),'DoctorCity':new FormControl('', Validators. required),'DoctorPin':new FormControl('', Validators. required),'CategoryIdDoctorType':new FormControl('', Validators. required),'CategoryIdQualificationType':new FormControl('', Validators. required),'DoctorQualification':new FormControl('', Validators. required),'DoctorAvailableDays':new FormControl('', Validators. required),'DoctorChargesNormal':new FormControl('', Validators. required),});

    }

  //Dropdown change event capture
  drpchange(events1: any){
    // alert(events1.value);
  }

  

  get diagnostic() { return JSON.stringify(this.userform.value); }
 }
