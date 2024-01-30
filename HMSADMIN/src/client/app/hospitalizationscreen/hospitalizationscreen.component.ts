import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router ,Params} from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {hospitalizationTS} from '../hospitalization/hospitalization';
import {vwhospitalizationipdpackagetrustcategorydiseasedetailsTS} from '../hospitalization/vwhospitalizationipdpackagetrustcategorydiseasedetailsTS';
import {DataTableModule} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';

import { HospitalizationscreenService } from '../shared/hospitalizationscreen/index';
 
import { Observable } from 'rxjs/Rx';
/**
 * This class represents the lazy loaded countryComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-hospitalizationscreen',
  templateUrl: 'hospitalizationscreen.component.html',
  styleUrls: ['hospitalizationscreen.component.css']
})
export class HospitalizationscreenComponent implements OnInit {
  
  userform: FormGroup;
  country_contacts:FormGroup;
  msgs: Message[]=[];
   vwhospitalization:  vwhospitalizationipdpackagetrustcategorydiseasedetailsTS;

   submitted: boolean;
   submittedcontact:boolean;
   hospitalizationVar: hospitalizationTS;
  //  selectedRow:  vwhospitalizationipdpackagetrustcategorydiseasedetailsTS;
// 
 
   newVwBedsRoomsBedTypeHospital: boolean;
   categorytype:string="";
   hospitalID:string="";
   CurrentLoginYear:string="";
   memberID:string="";
   HSPAdminId:string="";
   HSPAdminStatus:string="";

   newcontact: boolean;
      clear(){
            this.newVwBedsRoomsBedTypeHospital=true;
            this.hospitalizationVar=new hospitalizationTS();
            
      }

      
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private localService: HospitalizationscreenService){
    
              this.categorytype="hospitalizationtype";  
              // this.hospitalID="HSP1";  
              this.hospitalID=localStorage.getItem('hospitalID'); 
              this.CurrentLoginYear=localStorage.getItem('CurrentLoginYear');                
              this.memberID=localStorage.getItem('memberID');
              
              
  }
 
  onSubmit(){
      //   alert(JSON.stringify(this.selectedRow));
        this.hospitalizationVar.HospitalIdHospitalization=this.hospitalID;
        this.hospitalizationVar.MemberIdHospitalization=this.memberID;

        this.submitted = true;
        this.msgs = [];
        console.log(JSON.stringify(this.hospitalizationVar));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        if(this.newVwBedsRoomsBedTypeHospital){
        
      //   this.localService
      // .insert(JSON.stringify(this.hospitalizationVar),this.CurrentLoginYear)
      // .subscribe(
      //    /* happy path */ p => this.vwhospitalization = p,
      //    /* error path */ e => console.log(e),
      //    /* onComplete */ () => {this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'})
      //                           console.log("saved result=",this.vwhospitalization);
      //                 }
      //    );
        } 
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'});
        this.clear();
  }
 
 


  ngOnInit() { 

      this.clear();
      
  

        // this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        this.userform = this.fb.group({'HSPAdminDate':new FormControl('', Validators. required),'HSPAdmintime':new FormControl('', Validators. required),'HSPAdminStatus':new FormControl('', Validators. required),'IPDIdHospitalization':new FormControl('', Validators. required),'CategoryIdHospitalizationDepartment':new FormControl('', Validators. required),'DiseaseIdHospitalization':new FormControl('', Validators. required),});

        this.route.params.forEach((params: Params) => {
                this.HSPAdminId= params["billid"];

              });

              this.localService.getWS_viewhospitalizationipd_selectedit(this.HSPAdminId).subscribe(
         /* happy path */ p => this.vwhospitalization = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => {
                                this.loadotherfields();
                                console.log("after redirect saved result=",this.vwhospitalization);
                      }
         );
     
        // this.localService.getipdmaster_HospitalIdIPDMasterdrp(this.hospitalID).subscribe(         
        // /* happy path */ p => {
        //       this.drpipdroptions = p;
        //       this.drpipdroptions.unshift({label:"--Select IPD--" , value:"1"} )  
        //     },
        //  /* error path */ e => console.log( e),
        //  /* onComplete */ () => console.log('done drpipdroptions' + JSON.stringify(this.drpipdroptions))
        //  );



         this.hospitalizationVar=new hospitalizationTS();
  }

  loadotherfields(){
    let temp=this.vwhospitalization.HSPAdminStatus;
    this.HSPAdminStatus=temp;
    if(temp==="A"){
      this.HSPAdminStatus="Admitted";
    }
  }
 
  onbtnclick(typeofscreen:string){
    if(typeofscreen==="hspipdheads"){
      this.router.navigate(['/hspipdheads',this.HSPAdminId]);
    }
    if(typeofscreen==="hspotherheadsdetails"){
      this.router.navigate(['/hspotherheadsdetails',this.HSPAdminId]);
    }
    if(typeofscreen==="sonographycharges"){
      this.router.navigate(['/sonographycharges',this.HSPAdminId]);
    }
    if(typeofscreen==="hspdoctorvisitdetails"){
      this.router.navigate(['/hspdoctorvisitdetails',this.HSPAdminId]);
    }
    if(typeofscreen==="hspdailychargesdetails"){
      this.router.navigate(['/hspdailychargesdetails',this.HSPAdminId]);
    }
    if(typeofscreen==="roomallotment"){
      this.router.navigate(['/roomallotment',this.HSPAdminId]);
    }
    if(typeofscreen==="ipdreceipt"){
      this.router.navigate(['/ipdreceipt',this.HSPAdminId,"Advance"]);
    }
    if(typeofscreen==="billing"){
      this.router.navigate(['/billing',this.HSPAdminId]);
    }
    if(typeofscreen==="hspipddischargedetails"){
      this.router.navigate(['/hspipddischargedetails',this.HSPAdminId]);
    }
    if(typeofscreen==="none"){
        this.msgs = [];
        this.msgs.push({severity:'warn', summary:'Alert', detail:'You are not authorized to access'});
        
    }
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
