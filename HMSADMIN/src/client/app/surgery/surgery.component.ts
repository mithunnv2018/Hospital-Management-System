import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {surgeryTS} from './surgery';
import {DataTableModule} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';

import { SurgeryService } from '../shared/surgery/index';
import {VwSurgerySurgeryTypeHospitalTS} from './VwSurgerySurgeryTypeHospitalTS';

import { Observable } from 'rxjs/Rx';
/**
 * This class represents the lazy loaded countryComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-surgery',
  templateUrl: 'surgery.component.html',
  styleUrls: ['surgery.component.css']
})
export class SurgeryComponent implements OnInit {
  
  userform: FormGroup;
  country_contacts:FormGroup;
  msgs: Message[]=[];
  VwSurgerySurgeryTypeHospital: VwSurgerySurgeryTypeHospitalTS[]=[];

   submitted: boolean;
   submittedcontact:boolean;
   surgeryVar: surgeryTS;
   selectedRow: VwSurgerySurgeryTypeHospitalTS;

   drpsurgerytypeoptions:SelectItem[]=[];      
   

   newVwSurgerySurgeryTypeHospital: boolean;
   categorytype:string="";
   hospitalID:string="";

   newcontact: boolean;
      clear(){
            this.newVwSurgerySurgeryTypeHospital=true;
            this.surgeryVar=new surgeryTS();
            
      }

      
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private localService: SurgeryService){
    
              this.categorytype="surgerytype";  
              // this.hospitalID="HSP1";  
              this.hospitalID=localStorage.getItem('hospitalID'); 
  }
 
  onSubmit(){
      //   alert(JSON.stringify(this.selectedRow));
        this.surgeryVar.HospitalIdSurgery=this.hospitalID;
        

        this.submitted = true;
        this.msgs = [];
        console.log(JSON.stringify(this.surgeryVar));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        if(this.newVwSurgerySurgeryTypeHospital){
        
        this.localService
      .insert(JSON.stringify(this.surgeryVar))
      .subscribe(
         /* happy path */ p => this.VwSurgerySurgeryTypeHospital = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }else{
      this.localService
      .update(JSON.stringify(this.surgeryVar))
      .subscribe(
         /* happy path */ p => this.VwSurgerySurgeryTypeHospital = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'});
        this.clear();
  }
 


onRowSelectVwSurgerySurgeryTypeHospital(event: any){

this.newVwSurgerySurgeryTypeHospital=false;
 let tempVwSurgerySurgeryTypeHospital:VwSurgerySurgeryTypeHospitalTS;
 tempVwSurgerySurgeryTypeHospital=this.selectedRow;

//this.ngModelSurgeryId= tempVwSurgerySurgeryTypeHospital.SurgeryId;

this.localService.edit(tempVwSurgerySurgeryTypeHospital.SurgeryId).subscribe(
p => this.surgeryVar=p,
 e => console.log( e), 
 () => console.log("") );

}



 


  ngOnInit() { 

      this.clear();
      
  

        // this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        this.userform = this.fb.group({'SurgeryName':new FormControl('', Validators. required),'SurgeryAmount':new FormControl('', Validators. required),'SurgeryTrustAmount':new FormControl('', Validators. required),'CategoryIdSurgeryTypeSurgery':new FormControl('', Validators. required),});


        this.localService
      .getall(this.hospitalID)
      .subscribe(
         /* happy path */ p => this.VwSurgerySurgeryTypeHospital = p,
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done getDisplayAll2' + JSON.stringify(this.surgeryVar)));


        this.localService.getCategoryMasterdrp(this.categorytype,this.hospitalID).subscribe(         
        /* happy path */ p => {
              this.drpsurgerytypeoptions = p;
              this.drpsurgerytypeoptions.unshift({label:"--Select Category--" , value:"1"} )  
            },
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done drpcatstaffoptions' + JSON.stringify(this.drpsurgerytypeoptions))
         );

          



         this.surgeryVar=new surgeryTS();
  }

  
 

  initContact() {
        // initialize our address
        // return this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        return this.userform = this.fb.group({'SurgeryName':new FormControl('', Validators. required),'SurgeryAmount':new FormControl('', Validators. required),'SurgeryTrustAmount':new FormControl('', Validators. required),'CategoryIdSurgeryTypeSurgery':new FormControl('', Validators. required),});




    }

  //Dropdown change event capture
  drpchange(events1: any){
    // alert(events1.value);
  }

  get diagnostic() { return JSON.stringify(this.userform.value); }
 }
