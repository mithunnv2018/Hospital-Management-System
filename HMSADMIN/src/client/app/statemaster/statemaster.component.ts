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

import { CountryService } from '../shared/country/index';
import { StateMasterService } from '../shared/statemaster/index';

import { Observable } from 'rxjs/Rx';
import {statemasterTS} from './statemaster';
import {vw_state_countryTS} from './vw_state_countryTS';

/**
 * This class represents the lazy loaded countryComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-statemaster',
  templateUrl: 'statemaster.component.html',
  styleUrls: ['statemaster.component.css']
})
export class StateMasterComponent implements OnInit {
  
  userform: FormGroup;
  country_contacts:FormGroup;
  msgs: Message[]=[];
  countrys: CountryMasterTS[]=[];
  
  vw_state_country:vw_state_countryTS[]=[];

   submitted: boolean;
   submittedcontact:boolean;
   statemasterVar: statemasterTS;
   selectedRow: vw_state_countryTS;


   newvw_state_country: boolean;
   newcontact: boolean;

   drpcountryoptionss:SelectItem[]=[];
   ngModelCountryName:string="";

   clear(){
        this.newvw_state_country=true;
        this.statemasterVar=new statemasterTS();
        
        //this.downloadfile("DUMMY");
    }

      
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private localService: StateMasterService){
    
   
  }

 

  onRowSelectvw_state_country(event: any){

      // this.newvw_state_country=false;
      this.newvw_state_country=false;
      let tempvw_state_country:vw_state_countryTS;
      // tempvw_state_country=this.selectedvw_state_countryRow;
       tempvw_state_country=this.selectedRow;
       this.ngModelCountryName=tempvw_state_country.CountryIdStateMaster;
        // this.ngModelStateId= tempvw_state_country.StateId;

      this.localService.edit(tempvw_state_country.StateId).subscribe(
      p => this.statemasterVar=p,
      e => console.log( e), 
      () => console.log( "done edit loading"), );

      

}
 
  onSubmit(){
      //   alert(JSON.stringify(this.selectedRow));
        this.statemasterVar.CountryIdStateMaster=this.ngModelCountryName;
        this.submitted = true;
        this.msgs = [];
        console.log(JSON.stringify(this.statemasterVar));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        if(this.newvw_state_country){
        this.localService
      .insert(JSON.stringify(this.statemasterVar))
      .subscribe(
         /* happy path */ p => this.vw_state_country = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }else{
      this.localService
      .update(JSON.stringify(this.statemasterVar))
      .subscribe(
         /* happy path */ p => this.vw_state_country = p,
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
      
  

        // this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        //this.userform = this.fb.group({'CountryName':new FormControl('', Validators. required),'CountryAliasName':new FormControl('', Validators. required),});
        this.userform = this.fb.group({'StateName':new FormControl('', Validators. required),
        'StateAliasName':new FormControl('', Validators. required),
        'CountryName':new FormControl('', Validators. required),});

      
        this.localService.getCountryMasterdrp("DUMMY").subscribe(
         /* happy path */ p => {this.drpcountryoptionss= p;this.drpcountryoptionss.unshift({label:"Select Country" , value:"1"} )},
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done getDisplayAll2' + JSON.stringify(this.drpcountryoptionss)));



        this.localService
      .getall('DUMMY')
      .subscribe(
         /* happy path */ p => this.vw_state_country= p,
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done getDisplayAll2' + JSON.stringify(this.vw_state_country)));

         this.statemasterVar=new statemasterTS();
  }

  
 

  initContact() {
        // initialize our address
        // return this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        //return this.userform = this.fb.group({'CountryName':new FormControl('', Validators. required),'CountryAliasName':new FormControl('', Validators. required),});
        return this.userform = this.fb.group({'StateName':new FormControl('', Validators. required),'StateAliasName':new FormControl('', Validators. required),'CountryName':new FormControl('', Validators. required),});



    }

  //Dropdown change event capture
  drpchange(events1: any){
    // alert(events1.value);
  }

  ///for pdf report download START
downloadfile(type: string){

        this.localService
      .getall('DUMMY')
      .subscribe(
         /* happy path */ p => this.vw_state_country= p,
         /* error path */ e => console.log( e),
         /* onComplete */ () => {
            let mycontent=JSON.stringify(this.vw_state_country);
            this.localService.ORGINALgetMyFileFromBackend(mycontent).subscribe(
                    res => this.OLDextractData(res),
                    (error:any) => Observable.throw(error || 'Server error')
                );
         }
         );

  // let mycontent=JSON.stringify(this.vw_state_country);
  //  this.localService.ORGINALgetMyFileFromBackend(mycontent).subscribe(
  //                   res => this.OLDextractData(res),
  //                   (error:any) => Observable.throw(error || 'Server error')
  //               );
}

OLDextractData(res: any){
    // transforme response to blob
    let myBlob: Blob = new Blob([res], {type: 'application/pdf'}); // replace the type by whatever type is your response
    // let myBlob: Blob = new Blob([res], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}); // replace the type by whatever type is your response
    // let myBlob: Blob = new Blob([res], {type: 'text/html'});
    var fileURL = URL.createObjectURL(myBlob);
    // Cross your fingers at this point and pray whatever you're used to pray
    window.open(fileURL);
}

extractData(fileURL: any){
    // transforme response to blob
    // let myBlob: Blob = new Blob([res], {type: 'application/pdf'}); // replace the type by whatever type is your response
    // let myBlob: Blob = new Blob([res], {type: 'text/html'});
    // var fileURL = URL.createObjectURL(myBlob);
    // Cross your fingers at this point and pray whatever you're used to pray
    window.open(fileURL);
}


  get diagnostic() { return JSON.stringify(this.userform.value); }
 }
