import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {citymasterTS} from './citymaster';
import {DataTableModule} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';

import { CityMasterService } from '../shared/citymaster/index';
import {vw_city_vw_state_countryTS} from './vw_city_vw_state_countryTS';
import { Observable } from 'rxjs/Rx';
/**
 * This class represents the lazy loaded citymasterComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-citymaster',
  templateUrl: 'citymaster.component.html',
  styleUrls: ['citymaster.component.css']
})
export class CityMasterComponent implements OnInit {
  
  userform: FormGroup;
  country_contacts:FormGroup;
  msgs: Message[]=[];
  vw_city_vw_state_country: vw_city_vw_state_countryTS[]=[];

   submitted: boolean;
   submittedcontact:boolean;
   citymasterVar: citymasterTS;
   selectedRow: vw_city_vw_state_countryTS;

   newvw_city_vw_state_country: boolean;
   
   drpcountryoptionss:SelectItem[]=[];      
   drpstateoptions:SelectItem[]=[];
   ngModelCountryId:string="";


    clear(){
            this.newvw_city_vw_state_country=true;
            this.citymasterVar=new citymasterTS();
            
    }

      
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private localService: CityMasterService){
    
   
  }
 


  onSubmit(){
      //   alert(JSON.stringify(this.selectedRow));
        this.submitted = true;
        this.msgs = [];
        console.log(JSON.stringify(this.citymasterVar));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        if(this.newvw_city_vw_state_country){
        this.localService
      .insert(JSON.stringify(this.citymasterVar))
      .subscribe(
         /* happy path */ p => this.vw_city_vw_state_country = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }else{
      this.localService
      .update(JSON.stringify(this.citymasterVar))
      .subscribe(
         /* happy path */ p => this.vw_city_vw_state_country = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'});
        this.clear();
  }

  onRowSelectvw_city_vw_state_country(event: any){

    this.newvw_city_vw_state_country=false;
    let tempvw_city_vw_state_country:vw_city_vw_state_countryTS;
    tempvw_city_vw_state_country=this.selectedRow;

    //this.ngModelCityId= tempvw_city_vw_state_country.CityId;

    this.localService.edit(tempvw_city_vw_state_country.CityId).subscribe(
      p => this.citymasterVar=p,
      e => console.log( e), 
      () =>{
              this.ngModelCountryId=tempvw_city_vw_state_country.CountryId;
              this.localService.getStateMasterdrp(this.ngModelCountryId).subscribe
                  (p =>{this.drpstateoptions=p;
                  this.drpstateoptions.unshift({label:"--Select State--" , value:"1"} )},
                  e => console.log(e),
                  () =>{
                      this.citymasterVar.StateIdCityMaster= tempvw_city_vw_state_country.StateIdCityMaster;
                  });          
        }  
      );


  }







populateStateMaster($events1: any){
   // this.ngModelMaincatId=events1.value;

    this.localService.getStateMasterdrp(this.ngModelCountryId).subscribe
    (p =>{this.drpstateoptions=p;
    this.drpstateoptions.unshift({label:"--Select State--" , value:"1"} )},
    e => console.log(e),
    () =>console.log("statedropdown==>",this.drpstateoptions));
}





    
    

  ngOnInit() { 

      this.clear();

      this.userform = this.fb.group({'CityName':new FormControl('', Validators.required),
      'CityAliasName':new FormControl('', Validators.required),
      'StateIdCityMaster':new FormControl('', Validators.required)}
      );

      this.localService.getCountryMasterdrp().subscribe(         
        /* happy path */ p => {
          this.drpcountryoptionss = p;
          this.drpcountryoptionss.unshift({label:"--Select Country--" , value:"1"} )
        },
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done getDisplayAll2' + JSON.stringify(this.drpcountryoptionss))
         );

      this.localService
      .getall('DUMMY')
      .subscribe(
         /* happy path */ p => this.vw_city_vw_state_country = p,
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done getDisplayAll2' + JSON.stringify(this.citymasterVar)));

         this.citymasterVar=new citymasterTS();
  }

  
 

  initContact() {
        // initialize our address
        // return this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        return this.userform = this.fb.group({'CityName':new FormControl('', Validators. required),'CityAliasName':new FormControl('', Validators. required),'StateIdCityMaster':new FormControl('', Validators. required),});



    }

  //Dropdown change event capture
  drpchange(events1: any){
    // alert(events1.value);
  }

  get diagnostic() { return JSON.stringify(this.userform.value); }
 }
