import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {hosptialmasterTS} from './hospitalmaster';
import {DataTableModule} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';

import { HospitalMasterService } from '../shared/hospitalmaster/index';
import {vwhospitalcitystatecountryTS} from './vwhospitalcitystatecountryTS';
import { Observable } from 'rxjs/Rx';
/**
 * This class represents the lazy loaded citymasterComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-hospitalmaster',
  templateUrl: 'hospitalmaster.component.html',
  styleUrls: ['hospitalmaster.component.css']
})
export class HospitalMasterComponent implements OnInit {
  
  userform: FormGroup;
  country_contacts:FormGroup;
  msgs: Message[]=[];
  vwhospitalcitystatecountry: vwhospitalcitystatecountryTS[]=[];

   submitted: boolean;
   submittedcontact:boolean;
   hosptialmasterVar: hosptialmasterTS;
   selectedRow: vwhospitalcitystatecountryTS;

   newvwhospitalcitystatecountry: boolean;
   
   drpcountryoptionss:SelectItem[]=[];      
   drpstateoptions:SelectItem[]=[];
   drpcityoptions:SelectItem[]=[];

   ngModelCountryId:string="";
   ngModelStateId:string="";

  hospitalID="";   

    clear(){
            this.newvwhospitalcitystatecountry=true;
            this.hosptialmasterVar=new hosptialmasterTS();
            this.hosptialmasterVar.HospitalId=this.hospitalID;
    }

      
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private localService: HospitalMasterService){
                
                this.hospitalID="hospitaldummy";
   
  }
 


  onSubmit(){
      //   alert(JSON.stringify(this.selectedRow));
        this.submitted = true;
        this.msgs = [];
        // this.hosptialmasterVar.HospitalId=this.hospitalID;

        console.log(JSON.stringify(this.hosptialmasterVar));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        if(this.newvwhospitalcitystatecountry){
        this.localService
      .insert(JSON.stringify(this.hosptialmasterVar))
      .subscribe(
         /* happy path */ p => this.vwhospitalcitystatecountry = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }else{
      this.localService
      .update(JSON.stringify(this.hosptialmasterVar))
      .subscribe(
         /* happy path */ p => this.vwhospitalcitystatecountry = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'});
        this.clear();
  }


  onRowSelectvwhospitalcitystatecountry(event: any){

  this.newvwhospitalcitystatecountry=false;
  let tempvwhospitalcitystatecountry:vwhospitalcitystatecountryTS;
  tempvwhospitalcitystatecountry=this.selectedRow;

//this.ngModelHospitalId= tempvwhospitalcitystatecountry.HospitalId;

  this.localService.edit(tempvwhospitalcitystatecountry.HospitalId).subscribe(
    p => this.hosptialmasterVar=p,
    e => console.log( e), 
  ()=> {
    console.log( "edit",this.hosptialmasterVar);  
        this.ngModelCountryId=tempvwhospitalcitystatecountry.CountryId;
         this.localService.getStateMasterdrp(this.ngModelCountryId).subscribe
                  (p =>{this.drpstateoptions=p;
                  this.drpstateoptions.unshift({label:"--Select State--" , value:"1"} )},
                  e => console.log(e),
                  () =>{
                      var stateid=tempvwhospitalcitystatecountry.StateIdCityMaster;
                        this.ngModelStateId=stateid;

                        this.localService.getCityMasterdrp(stateid).subscribe(
                          p =>{
                                this.drpcityoptions=p;
                                this.drpstateoptions.unshift({label:"--Select City--" , value:"1"} )
                              },
                          e => console.log(e),
                          () =>{
                              this.hosptialmasterVar.CityIdHospitalMaster=tempvwhospitalcitystatecountry.CityIdHospitalMaster;
                         });  


                      
                  }); 
      } );

  }

populateStateMaster($events1: any){
// this.ngModelMaincatId=events1.value;
this.localService.getStateMasterdrp(this.ngModelCountryId).subscribe(
  p =>{this.drpstateoptions=p;
      this.drpstateoptions.unshift({label:"--Select State--" , value:"1"} )
    },
  e => console.log(e),() => console.log(this.drpstateoptions));
}



populateCityMaster($events1: any){
// this.ngModelMaincatId=events1.value;
this.localService.getCityMasterdrp(this.ngModelStateId).subscribe(
  p =>{this.drpcityoptions=p;
  this.drpcityoptions.unshift({label:"--Select City--" , value:"1"} )},
  e => 
    console.log(e),
  () => console.log(this.drpcityoptions));
}



  ngOnInit() { 

      this.clear();

      this.userform = this.fb.group({'HospitalName':new FormControl('', Validators. required),
      'HospitalRegNo':new FormControl('', Validators. required),
      'HospitalAddress1':new FormControl('', Validators. required),
      'CityIdHospitalMaster':new FormControl('', Validators. required),});





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
         /* happy path */ p => this.vwhospitalcitystatecountry = p,
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done getDisplayAll2' + JSON.stringify(this.hosptialmasterVar)));

         this.hosptialmasterVar=new hosptialmasterTS();
  }

  
 

  initContact() {
        // initialize our address
        // return this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        return this.userform = this.fb.group({'HospitalName':new FormControl('', Validators. required),'HospitalRegNo':new 

FormControl('', Validators. required),'HospitalAddress1':new FormControl('', Validators. 

required),'CityIdHospitalMaster':new FormControl('', Validators. required),});







    }

  //Dropdown change event capture
  drpchange(events1: any){
    // alert(events1.value);
  }

  get diagnostic() { return JSON.stringify(this.userform.value); }
 }
