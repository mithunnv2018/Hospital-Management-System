import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {CosmeticBillParticularsTS} from './cosmeticbillparticularsmaster';
import {DataTableModule} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';

import { CosmeticBillParticularsMasterService } from '../shared/cosmeticbillparticularsmaster/index';
import {VwOPDBillHospitalTS } from './VwOPDBillHospitalTS';
import { Observable } from 'rxjs/Rx';
/**
 * This class represents the lazy loaded citymasterComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-cosmeticbillparticularsmaster',
  templateUrl: 'cosmeticbillparticularsmaster.component.html',
  styleUrls: ['cosmeticbillparticularsmaster.component.css']
})
export class CosmeticBillParticularsMasterComponent implements OnInit {
  
  userform: FormGroup;
  country_contacts:FormGroup;
  msgs: Message[]=[];
  VwCosmeticBillParticulars: CosmeticBillParticularsTS[]=[];

   submitted: boolean;
   submittedcontact:boolean;
   CosmeticBillParticularsVar: CosmeticBillParticularsTS;
   selectedRow: CosmeticBillParticularsTS;

   newVwOPDBillHospital: boolean;
   
   drpcountryoptionss:SelectItem[]=[];      
   drpstateoptions:SelectItem[]=[];
   drpcityoptions:SelectItem[]=[];

   ngModelCountryId:string="";
   ngModelStateId:string="";

  hospitalID="";   

    clear(){
            this.newVwOPDBillHospital=true;
            this.CosmeticBillParticularsVar=new CosmeticBillParticularsTS();
            this.CosmeticBillParticularsVar.HospitalIdCosmeticBillParticulars=this.hospitalID;
    }

      
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private localService: CosmeticBillParticularsMasterService){
                
              this.hospitalID=localStorage.getItem('hospitalID'); 
   
  }
 


  onSubmit(){
      //   alert(JSON.stringify(this.selectedRow));
        this.submitted = true;
        this.msgs = [];
        // this.CosmeticBillParticularsVar.HospitalId=this.hospitalID;
        this.CosmeticBillParticularsVar.HospitalIdCosmeticBillParticulars=this.hospitalID;

        console.log(JSON.stringify(this.CosmeticBillParticularsVar));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        if(this.newVwOPDBillHospital){
        this.localService
      .insert(JSON.stringify(this.CosmeticBillParticularsVar))
      .subscribe(
         /* happy path */ p => this.VwCosmeticBillParticulars = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }else{
      this.localService
      .update(JSON.stringify(this.CosmeticBillParticularsVar))
      .subscribe(
         /* happy path */ p => this.VwCosmeticBillParticulars = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'});
        this.clear();
  }
 

onRowSelectVwOPDBillHospital(event: any){

this.newVwOPDBillHospital=false;
 let tempVwOPDBillHospital:CosmeticBillParticularsTS;
 tempVwOPDBillHospital=this.selectedRow;

//this.ngModelOPDBillParticularsId= tempVwOPDBillHospital.OPDBillParticularsId;

this.localService.edit(tempVwOPDBillHospital.CosmeticBillParticularsId).subscribe(
p => this.CosmeticBillParticularsVar=p,
 e => console.log( e), 
 () => console.log( "Edit") );

}




 

  ngOnInit() { 

      this.clear();

      //this.userform = this.fb.group({'OPDBillParticularsName':new FormControl('', Validators. required),'OPDBillParticularsAliasName':new FormControl('', Validators. required),'OPDBillParticularsTrustAmount':new FormControl('', Validators. required),'OPDBillParticularsAmount':new FormControl('', Validators. required),});

      this.userform = this.fb.group({'CosmeticBillParticularsName':new FormControl('', Validators. required),'CosmeticBillParticularsAliasName':new FormControl('', Validators. required),'CosmeticBillParticularsTrustAmount':new FormControl('', Validators. required),'CosmeticBillParticularsAmount':new FormControl('', Validators. required),});

      this.localService
      .getall(this.hospitalID)
      .subscribe(
         /* happy path */ p => this.VwCosmeticBillParticulars = p,
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done getDisplayAll2' + JSON.stringify(this.CosmeticBillParticularsVar)));

         this.CosmeticBillParticularsVar=new CosmeticBillParticularsTS();
  }

  
 

  initContact() {
        // initialize our address
        // return this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        return this.userform = this.fb.group({'CosmeticBillParticularsName':new FormControl('', Validators. required),'CosmeticBillParticularsAliasName':new FormControl('', Validators. required),'CosmeticBillParticularsTrustAmount':new FormControl('', Validators. required),'CosmeticBillParticularsAmount':new FormControl('', Validators. required),});

    }

  //Dropdown change event capture
  drpchange(events1: any){
    // alert(events1.value);
  }

  get diagnostic() { return JSON.stringify(this.userform.value); }
 }
