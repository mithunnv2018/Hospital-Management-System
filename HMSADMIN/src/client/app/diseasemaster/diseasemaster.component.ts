import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {diseasemasterTS} from './diseasemaster';
import {DataTableModule} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';

import { DiseaseMasterService } from '../shared/diseasemaster/index';

import { Observable } from 'rxjs/Rx';
/**
 * This class represents the lazy loaded countryComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-diseasemaster',
  templateUrl: 'diseasemaster.component.html',
  styleUrls: ['diseasemaster.component.css']
})
export class DiseaseMasterComponent implements OnInit {
  
  userform: FormGroup;
  country_contacts:FormGroup;
  msgs: Message[]=[];
  diseasemaster: diseasemasterTS[]=[];

   submitted: boolean;
   submittedcontact:boolean;
   diseasemasterVar: diseasemasterTS;
   selectedRow: diseasemasterTS;

   drpcategorytypeoptions:SelectItem[]=[];      
   drproomsoptions:SelectItem[]=[];

   newdiseasemaster: boolean;
  //  categorytype:string="";
   hospitalID:string="";

   newcontact: boolean;
      clear(){
            this.newdiseasemaster=true;
            this.diseasemasterVar=new diseasemasterTS();
            
      }

      
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private localService: DiseaseMasterService){
    
              // this.categorytype="diseasetype";  
              // this.hospitalID="HSP1";  
              this.hospitalID=localStorage.getItem('hospitalID'); 
  }
 
  onSubmit(){
      //   alert(JSON.stringify(this.selectedRow));
        this.diseasemasterVar.HospitalIdDiseaseMaster=this.hospitalID;
        

        this.submitted = true;
        this.msgs = [];
        console.log(JSON.stringify(this.diseasemasterVar));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        if(this.newdiseasemaster){
        
        this.localService
      .insert(JSON.stringify(this.diseasemasterVar))
      .subscribe(
         /* happy path */ p => this.diseasemaster = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }else{
      this.localService
      .update(JSON.stringify(this.diseasemasterVar))
      .subscribe(
         /* happy path */ p => this.diseasemaster = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'});
        this.clear();
  }
 

 
onRowSelectdiseasemaster(event: any){

this.newdiseasemaster=false;
 let tempdiseasemaster:diseasemasterTS;
 tempdiseasemaster=this.selectedRow;

//this.ngModelDiseaseId= tempdiseasemaster.DiseaseId;

this.localService.edit(tempdiseasemaster.DiseaseId).subscribe(
p => this.diseasemasterVar=p,
 e => console.log( e), 
 () => console.log( "EDIT"));

}



  ngOnInit() { 

      this.clear();
      
  

        // this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        this.userform = this.fb.group({'DiseaseName':new FormControl('', Validators. required),'DiseaseAliasName':new FormControl('', Validators. required),});


        this.localService
      .getall(this.hospitalID)
      .subscribe(
         /* happy path */ p => this.diseasemaster = p,
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done getDisplayAll2' + JSON.stringify(this.diseasemasterVar)));


  
         this.diseasemasterVar=new diseasemasterTS();
  }

  
 

  initContact() {
        // initialize our address
        // return this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        return this.userform = this.fb.group({'DiseaseName':new FormControl('', Validators. required),'DiseaseAliasName':new FormControl('', Validators. required),});


    }

  //Dropdown change event capture
  drpchange(events1: any){
    // alert(events1.value);
  }

  get diagnostic() { return JSON.stringify(this.userform.value); }
 }
