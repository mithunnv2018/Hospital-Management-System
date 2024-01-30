import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {hospitalizationTS} from '../hospitalization/hospitalization';
import {DataTableModule} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';
import { MyDateFormat } from '../shared/pipes/mydateformat.pipe';
import {MyTimeFormat} from '../shared/pipes/mytimeformat.pipe';
import { HospitalizationService } from '../shared/hospitalization/index';
import { vwhospitalizationipdpackagetrustcategorydiseasedetailsTS} from '../hospitalization/vwhospitalizationipdpackagetrustcategorydiseasedetailsTS';

import { Observable } from 'rxjs/Rx';
/**
 * This class represents the lazy loaded countryComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-hospitalizationsearch',
  templateUrl: 'hospitalizationsearch.component.html',
  styleUrls: ['hospitalizationsearch.component.css'],
  providers:[MyDateFormat,MyTimeFormat]
})
export class HospitalizationsearchComponent implements OnInit {
  
  userform: FormGroup;
  country_contacts:FormGroup;
  msgs: Message[]=[];
  VwBedsRoomsBedTypeHospital:  vwhospitalizationipdpackagetrustcategorydiseasedetailsTS[]=[];

   submitted: boolean;
   submittedcontact:boolean;
   hospitalizationVar: hospitalizationTS;
   selectedRow:  vwhospitalizationipdpackagetrustcategorydiseasedetailsTS;

    drpipdroptions:SelectItem[]=[];
     
   newVwBedsRoomsBedTypeHospital: boolean;
   categorytype:string="";
   hospitalID:string="";
   CurrentLoginYear:string="";
   memberID:string="";

   
   drpStatusoptions:SelectItem[]=[];    

   statusname:string="";
   searchbyname:string="";

   newcontact: boolean;
      clear(){
            this.newVwBedsRoomsBedTypeHospital=true;
            this.hospitalizationVar=new hospitalizationTS();
            
      }

      
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private localService: HospitalizationService,
              private mydate1: MyDateFormat,
              private mytime1:MyTimeFormat){
    
              this.categorytype="hospitalizationtype";  
              // this.hospitalID="HSP1";  
              this.hospitalID=localStorage.getItem('hospitalID'); 
              this.CurrentLoginYear=localStorage.getItem('CurrentLoginYear');                
              this.memberID=localStorage.getItem('memberID');
  }
 
  onSubmit(){
 
  }
  
  searchByDropdown(){

      if(this.statusname==="Admitted"){
        //   this.localService.getWS_viewhospitalizationipd_selectjson_Admitted(this.hospitalID).subscribe(         
        // /* happy path */ p => {
        //       this.VwBedsRoomsBedTypeHospital = p;
              
        //     },
        //  /* error path */ e => console.log( e),
        //  /* onComplete */ () => console.log('done VwBedsRoomsBedTypeHospital' + JSON.stringify(this.VwBedsRoomsBedTypeHospital))
        //  );

      }
      if(this.statusname==="Discharged"){
        this.localService.getWS_viewhospitalizationipd_selectjson_Discharged(this.hospitalID).subscribe(         
        /* happy path */ p => {
              this.VwBedsRoomsBedTypeHospital = p;
              
            },
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done VwBedsRoomsBedTypeHospital' + JSON.stringify(this.VwBedsRoomsBedTypeHospital))
         );
      }
      if(this.statusname==="Cancelled"){
          this.localService.getWS_viewhospitalizationipd_selectjson_Canceled(this.hospitalID).subscribe(         
        /* happy path */ p => {
              this.VwBedsRoomsBedTypeHospital = p;
              
            },
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done VwBedsRoomsBedTypeHospital' + JSON.stringify(this.VwBedsRoomsBedTypeHospital))
         );
      }
  }

  searchByName(){
    if(this.statusname==="Admitted"){
          this.localService.getWS_viewhospitalizationipd_selectjson_Admitted_searchtext(this.hospitalID,this.searchbyname).subscribe(         
        /* happy path */ p => {
              this.VwBedsRoomsBedTypeHospital = p;
              
            },
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done VwBedsRoomsBedTypeHospital' + JSON.stringify(this.VwBedsRoomsBedTypeHospital))
         );

      }
      if(this.statusname==="Discharged"){
        // this.localService.getWS_viewhospitalizationipd_selectjson_Canceled_searchtext(this.hospitalID,this.searchbyname).subscribe(
        this.localService.getWS_viewhospitalizationipd_selectjson_Discharged_SearchText(this.hospitalID,this.searchbyname).subscribe(           
        /* happy path */ p => {
              this.VwBedsRoomsBedTypeHospital = p;
              
            },
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done VwBedsRoomsBedTypeHospital' + JSON.stringify(this.VwBedsRoomsBedTypeHospital))
         );
      }
      if(this.statusname==="Cancelled"){
          this.localService.getWS_viewhospitalizationipd_selectjson_Canceled_searchtext(this.hospitalID,this.searchbyname).subscribe(         
        /* happy path */ p => {
              this.VwBedsRoomsBedTypeHospital = p;
              
            },
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done VwBedsRoomsBedTypeHospital' + JSON.stringify(this.VwBedsRoomsBedTypeHospital))
         );
      }
  }
  onRowSelectVwDoctorDepartmentConsultantTypeHospital($event:any){
    let hspaminid=this.selectedRow.HSPAdminId;

    this.router.navigate(['/hospitalizationscreen',hspaminid]);
  }

  gotoHospitalizationPage(hspadmitid:string){
    // obj:vwhospitalizationipdpackagetrustcategorydiseasedetailsTS){
    // let hspadmitid=obj.HSPAdminId;
    this.router.navigate(['/hospitalization',hspadmitid]);
  }
  ngOnInit() { 

      this.clear();

      this.drpStatusoptions=[
        {
          label:"--Select Status--",
          value:"1"
        },
        {
          label:"Admitted",
          value:"Admitted"
        },
        {
          label:"Discharged",
          value:"Discharged"
        },
        {
          label:"Cancelled",
          value:"Cancelled"
        },
        
      ]   
  

        // this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        // this.userform = this.fb.group({'HSPAdminDate':new FormControl('', Validators. required),'HSPAdmintime':new FormControl('', Validators. required),'HSPAdminStatus':new FormControl('', Validators. required),'IPDIdHospitalization':new FormControl('', Validators. required),'CategoryIdHospitalizationDepartment':new FormControl('', Validators. required),'DiseaseIdHospitalization':new FormControl('', Validators. required),});

        
     
        this.localService.getipdmaster_HospitalIdIPDMasterdrp(this.hospitalID).subscribe(         
        /* happy path */ p => {
              this.drpipdroptions = p;
              this.drpipdroptions.unshift({label:"--Select IPD--" , value:"1"} )  
            },
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done drpipdroptions' + JSON.stringify(this.drpipdroptions))
         );
 
         this.hospitalizationVar=new hospitalizationTS();
  }

  
 

  initContact() {
        // initialize our address
        // return this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        return this.userform = this.fb.group({'HSPAdminDate':new FormControl('', Validators. required),'HSPAdmintime':new FormControl('', Validators. required),'HSPAdminStatus':new FormControl('', Validators. required),'IPDIdHospitalization':new FormControl('', Validators. required),'CategoryIdHospitalizationDepartment':new FormControl('', Validators. required),'DiseaseIdHospitalization':new FormControl('', Validators. required),});

    }

  //Dropdown change event capture
  drpchange(events1: any){
    // alert(events1.value);
  }

  get diagnostic() { return JSON.stringify(this.userform.value); }
 }
