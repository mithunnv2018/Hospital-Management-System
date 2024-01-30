import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {patientmedicalrecordTS} from './patientmedicalrecordmaster';
import {DataTableModule} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';

import { PatientmedicalrecordMasterService } from '../shared/patientmedicalrecordmaster/index';
import {VwPatientMedicalRecordHospitalTS } from './VwPatientMedicalRecordHospitalTS';

import { Observable } from 'rxjs/Rx';
/**
 * This class represents the lazy loaded countryComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-patientmedicalrecordmaster',
  templateUrl: 'patientmedicalrecordmaster.component.html',
  styleUrls: ['patientmedicalrecordmaster.component.css']
})
export class PatientmedicalrecordMasterComponent implements OnInit {
  
  userform: FormGroup;
  country_contacts:FormGroup;
  msgs: Message[]=[];
  VwPatientMedicalRecordHospital: VwPatientMedicalRecordHospitalTS[]=[];

   submitted: boolean;
   submittedcontact:boolean;
   patientmedicalrecordVar: patientmedicalrecordTS;
   selectedRow: VwPatientMedicalRecordHospitalTS;

   

   newVwPatientMedicalRecordHospital: boolean;
  //  categorytype:string="";
   hospitalID:string="";

   newcontact: boolean;
      clear(){
            this.newVwPatientMedicalRecordHospital=true;
            this.patientmedicalrecordVar=new patientmedicalrecordTS();
            
      }

      
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private localService: PatientmedicalrecordMasterService){
    
              
              // this.hospitalID="HSP1";  
              this.hospitalID=localStorage.getItem('hospitalID'); 
  }
 
  onSubmit(){
      //   alert(JSON.stringify(this.selectedRow));
        this.patientmedicalrecordVar.HospitalIdPatientMedicalRecord=this.hospitalID;

        this.submitted = true;
        this.msgs = [];
        console.log(JSON.stringify(this.patientmedicalrecordVar));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        if(this.newVwPatientMedicalRecordHospital){
        this.localService
      .insert(JSON.stringify(this.patientmedicalrecordVar))
      .subscribe(
         /* happy path */ p => this.VwPatientMedicalRecordHospital = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }else{
      this.localService
      .update(JSON.stringify(this.patientmedicalrecordVar))
      .subscribe(
         /* happy path */ p => this.VwPatientMedicalRecordHospital = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'});
        this.clear();
  }

 
 

onRowSelectVwPatientMedicalRecordHospital(event: any){

this.newVwPatientMedicalRecordHospital=false;
 let tempVwPatientMedicalRecordHospital:VwPatientMedicalRecordHospitalTS;
 tempVwPatientMedicalRecordHospital=this.selectedRow;

//this.ngModelPatientMedicalRecordId= tempVwPatientMedicalRecordHospital.PatientMedicalRecordId;

this.localService.edit(tempVwPatientMedicalRecordHospital.PatientMedicalRecordId).subscribe(
p => this.patientmedicalrecordVar=p,
 e => console.log( e), 
 () => console.log( "Edit") );

}



  ngOnInit() { 

      this.clear();
      
  

        // this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        this.userform = this.fb.group({'PatientMedicalRecordName':new FormControl('', Validators. required),'PatientMedicalRecordAliasName':new FormControl('', Validators. required),});

        this.localService
      .getall(this.hospitalID)
      .subscribe(
         /* happy path */ p => this.VwPatientMedicalRecordHospital = p,
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done getDisplayAll2' + JSON.stringify(this.patientmedicalrecordVar)));


 
         this.patientmedicalrecordVar=new patientmedicalrecordTS();
  }

  
 

  initContact() {
        // initialize our address
        // return this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        return this.userform = this.fb.group({'PatientMedicalRecordName':new FormControl('', Validators. required),'PatientMedicalRecordAliasName':new FormControl('', Validators. required),});

    }

  //Dropdown change event capture
  drpchange(events1: any){
    // alert(events1.value);
  }

  get diagnostic() { return JSON.stringify(this.userform.value); }
 }
