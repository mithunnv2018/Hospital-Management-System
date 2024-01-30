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

import { IpdbillingheadsMasterService } from '../shared/ipdbillingheadsmaster/index';

import { Observable } from 'rxjs/Rx';
import {ipdbillingheadsTS} from './ipdbillingheadsmaster';
import {VwIPDBillingHeadsHospitalTS} from './VwIPDBillingHeadsHospitalTS';

/**
 * This class represents the lazy loaded countryComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-ipdbillingheadsmaster',
  templateUrl: 'ipdbillingheadsmaster.component.html',
  styleUrls: ['ipdbillingheadsmaster.component.css'],
  providers:[MyDateFormat]

})
export class IpdbillingheadsMasterComponent implements OnInit {
  
  userform: FormGroup;
  country_contacts:FormGroup;
  msgs: Message[]=[];
   
  VwIPDBillingHeadsHospital:VwIPDBillingHeadsHospitalTS[]=[];

   submitted: boolean;
   submittedcontact:boolean;
   ipdbillingheadsVar: ipdbillingheadsTS;
   selectedRow: VwIPDBillingHeadsHospitalTS;


     newVwIPDBillingHeadsHospital: boolean;
   newcontact: boolean;

    hospitalID:string="";
 
   clear(){
        this.  newVwIPDBillingHeadsHospital=true;
        this.ipdbillingheadsVar=new ipdbillingheadsTS();
        
    }

      
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private localService: IpdbillingheadsMasterService,
              private mydate1: MyDateFormat){
                
               this.hospitalID=localStorage.getItem('hospitalID');  
   
  }

onRowSelectVwIPDBillingHeadsHospital(event: any){

this.newVwIPDBillingHeadsHospital=false;
 let tempVwIPDBillingHeadsHospital:VwIPDBillingHeadsHospitalTS;
 tempVwIPDBillingHeadsHospital=this.selectedRow;

//this.ngModelIPDBillingHeadsId= tempVwIPDBillingHeadsHospital.IPDBillingHeadsId;

this.localService.edit(tempVwIPDBillingHeadsHospital.IPDBillingHeadsId).subscribe(
p => this.ipdbillingheadsVar=p,
 e => console.log( e), 
 () => console.log( "EDIT") );

}


  onSubmit(){

      //   alert(JSON.stringify(this.selectedRow));
        

        this.ipdbillingheadsVar.HospitalIdIPDBillingHeads=this.hospitalID;
        this.submitted = true;
        this.msgs = [];
        console.log(JSON.stringify(this.ipdbillingheadsVar));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        if(this.  newVwIPDBillingHeadsHospital){
        this.localService
      .insert(JSON.stringify(this.ipdbillingheadsVar))
      .subscribe(
         /* happy path */ p => this.VwIPDBillingHeadsHospital = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }else{
      this.localService
      .update(JSON.stringify(this.ipdbillingheadsVar))
      .subscribe(
         /* happy path */ p => this.VwIPDBillingHeadsHospital = p,
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
      
      this.userform = this.fb.group({'IPDBillingHeadsName':new FormControl('', Validators. required),'IPDBillingHeadsAliasName':new FormControl('', Validators. required),'IPDBillingHeadsAmount':new FormControl('', Validators. required),'IPDBillingHeadsTrustAmount':new FormControl('', Validators. required),});
 
        this.localService
      .getall(this.hospitalID)
      .subscribe(
         /* happy path */ p => this.VwIPDBillingHeadsHospital= p,
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done getDisplayAll2' + JSON.stringify(this.VwIPDBillingHeadsHospital)));

  
         this.ipdbillingheadsVar=new ipdbillingheadsTS();
  }

 

 

  initContact() {
        // initialize our address
        // return this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        //return this.userform = this.fb.group({'CountryName':new FormControl('', Validators. required),'CountryAliasName':new FormControl('', Validators. required),});
        return this.userform = this.fb.group({'IPDBillingHeadsName':new FormControl('', Validators. required),'IPDBillingHeadsAliasName':new FormControl('', Validators. required),'IPDBillingHeadsAmount':new FormControl('', Validators. required),'IPDBillingHeadsTrustAmount':new FormControl('', Validators. required),});
    }

  //Dropdown change event capture
  drpchange(events1: any){
    // alert(events1.value);
  }

  

  get diagnostic() { return JSON.stringify(this.userform.value); }
 }
