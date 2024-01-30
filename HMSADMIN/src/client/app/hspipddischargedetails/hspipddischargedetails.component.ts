import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router,Params } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {hspipddischargedetailsTS} from './hspipddischargedetails';
import {DataTableModule} from 'primeng/primeng';
import {SelectItem,ConfirmationService} from 'primeng/primeng';
import { MyDateFormat } from '../shared/pipes/mydateformat.pipe';

import { HspipddischargedetailsService } from '../shared/hspipddischargedetails/index';
import {vwhspipddischargedoctordetailsTS} from './vwhspipddischargedoctordetailsTS';
import { Reportresult } from '../shared/baseurl/reportresult';

import { Observable } from 'rxjs/Rx';
import {HospitalizationService} from '../shared/hospitalization/hospitalization.service';
import {hspdischargeprescriptionTS} from './hspdischargeprescriptionTS';
import { doctormasterTS } from '../doctormaster/doctormaster';
import {DoctorMasterService} from '../shared/doctormaster/doctormaster.service';

/**
 * This class represents the lazy loaded countryComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-hspipddischargedetails',
  templateUrl: 'hspipddischargedetails.component.html',
  styleUrls: ['hspipddischargedetails.component.css'],
  providers:[MyDateFormat]
})
export class HspipddischargedetailsComponent implements OnInit {
  
  userform: FormGroup;
  country_contacts:FormGroup;
  msgs: Message[]=[];
  vwhspipddischargedoctordetails: vwhspipddischargedoctordetailsTS[]=[];

   submitted: boolean;
   submittedcontact:boolean;
   hspipddischargedetailsVar: hspipddischargedetailsTS;
   selectedRow: vwhspipddischargedoctordetailsTS;

   drpdoctoroptions:SelectItem[]=[];      
   
   newhspipddischargedetails: boolean;
   categorytype:string="";
   hospitalID:string="";
   CurrentLoginYear:string="";
   memberID:string="";

   HSPAdminId:string="";
   DischargeDate:Date;

   newcontact: boolean;
   docselected:SelectItem;
   docresults:SelectItem[]=[];   

   medselected:SelectItem;
   medresults:SelectItem[]=[];

   hspdischargeprescriptions:hspdischargeprescriptionTS[]=[];
   hspdischargeprescription:hspdischargeprescriptionTS;
   GenericMedName:string="";

    displaynewnoofdays:boolean;
    displayschedule:boolean;

   selectedschedules:string[]=[];
   scheduleslist:SelectItem[]=[];

   noofdays:number=7;

      clear(){
           this.newhspipddischargedetails=true;
           this.hspipddischargedetailsVar=new hspipddischargedetailsTS();
            this.DischargeDate=null;          
            this.docselected=null;
            this.medselected=null;
            this.hspdischargeprescription=new hspdischargeprescriptionTS();

            this.noofdays=7;
            this.displaynewnoofdays=false;
            this.displayschedule=false;
      }

      
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private localService: HspipddischargedetailsService,
              private localHospitalizationService: HospitalizationService ,
              private mydate1: MyDateFormat,
              private confirmationService:ConfirmationService,
              private localDoctorMasterService:DoctorMasterService){
    
              this.categorytype="bedtype";  
              // this.hospitalID="HSP1";  
              this.hospitalID=localStorage.getItem('hospitalID'); 
              this.CurrentLoginYear=localStorage.getItem('CurrentLoginYear');                
              this.memberID=localStorage.getItem('memberID');
  }
 
  onSubmit(){
      //   alert(JSON.stringify(this.selectedRow));
        this.hspipddischargedetailsVar.HSPAdminIdhspipddischargedetails=this.HSPAdminId;
        this.hspipddischargedetailsVar.MemberIdhspipddischargedetails=this.memberID;

        this.hspipddischargedetailsVar.DischargeDate=this.mydate1.parse(this.DischargeDate);

        this.hspipddischargedetailsVar.DoctorIdhspipddischargedetails=this.docselected.value;

        this.submitted = true;
        this.msgs = [];
        console.log(JSON.stringify(this.hspipddischargedetailsVar));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        if(this.newhspipddischargedetails){
        
        this.localService
      .insert(JSON.stringify(this.hspipddischargedetailsVar),JSON.stringify(this.hspdischargeprescriptions))
      .subscribe(
         /* happy path */ p => this.vwhspipddischargedoctordetails = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () =>{
                                 this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'});

                                 this.calltoupdate();                                 
                                 this.printReceipt(); 

                              }
         );
        }else{
      this.localService
      .update(JSON.stringify(this.hspipddischargedetailsVar),JSON.stringify(this.hspdischargeprescriptions))
      .subscribe(
         /* happy path */ p => this.vwhspipddischargedoctordetails = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => {this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'})
                                  this.calltoupdate();
                                  this.printReceipt();
                                }
         );
        }
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'});
        //this.clear();
  }
    filterDOCName(event:any) {
        this.docresults = [];
        let query=event.query;
        this.localHospitalizationService
      .getWS_doctormaster_HospitalIdDoctorMaster_byDoctorName_drpjson(this.hospitalID,query)
      .subscribe(
         /* happy path */ p => this.docresults = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => {
                console.log(this.docresults);
                                
                 }
         );
 
    }

    filterMedicineName(event:any) {
        this.medresults = [];
        let query=event.query;
        this.localService
      .getWS_genericmedicinemaster_drpjson(query,this.hospitalID)
      .subscribe(
         /* happy path */ p => this.medresults = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => {console.log(this.medresults);
                                
                      }
         );
 
    }

  gotoScheduleDialog(){
    this.displaynewnoofdays=false;
    this.displayschedule=true;
  }


    onSubmitDischargePrescription(){
    
      let a=this.medselected.value;
      let b:SelectItem;

      b=this.medresults.find(parti=>parti.value===a);

    this.hspdischargeprescription.DischargePrecMorning="false";
    this.hspdischargeprescription.DischargePrecAfternoon="false";
    this.hspdischargeprescription.DischargePrecEvening="false";
    this.hspdischargeprescription.DischargePrecNosofDays=""+this.noofdays;
    for(let i=0;i<this.selectedschedules.length;i++){
      if(this.selectedschedules[i]=="m"){
        this.hspdischargeprescription.DischargePrecMorning="true";
      }
      if(this.selectedschedules[i]=="a"){
        this.hspdischargeprescription.DischargePrecAfternoon="true";
      }
      if(this.selectedschedules[i]=="e"){
        this.hspdischargeprescription.DischargePrecEvening="true";
      }
      
    }
      // this.hspdischargeprescription.DischargePrecMorning=this.hspdischargeprescription.DischargePrecMorning.toString();
      // this.hspdischargeprescription.DischargePrecAfternoon=this.hspdischargeprescription.DischargePrecAfternoon.toString();
      // this.hspdischargeprescription.DischargePrecEvening=this.hspdischargeprescription.DischargePrecEvening.toString();


      this.hspdischargeprescription.GenericMedName=b.label;
      this.hspdischargeprescription.GenericId=a;
      console.log("Prescription add"+JSON.stringify(this.hspdischargeprescription));
      this.hspdischargeprescriptions.push(this.hspdischargeprescription);

      this.hspdischargeprescription=new hspdischargeprescriptionTS();

      this.medselected=null;

      this.noofdays=7;

      this.displayschedule=false;
      
      this.selectedschedules=[];

  }


    deleteSubmitDischargePrescriptionRow(cont: hspdischargeprescriptionTS) {


      this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {


            let selectedkeywordgridRow:hspdischargeprescriptionTS=cont;
            this.hspdischargeprescriptions.splice(this.findSelectedKeywordSubcatIndex(selectedkeywordgridRow), 1);
            cont = null;
            // this.selectedkeywordgridRow=null;
            
            // this.clearKeywordSubcat();
 
            this.msgs = [];
            this.msgs.push({severity:'info', summary:'Confirmed', detail:'You have accepted'});
            }
        });

  }

  findSelectedKeywordSubcatIndex(p:hspdischargeprescriptionTS): number {
        return this.hspdischargeprescriptions.indexOf(p);
  }  

    printReceipt(){
      let id=this.HSPAdminId;
      
      let resultofws:Reportresult;
      console.log("ReceiptID is "+id);
      this.localService.printreportforhspipddischargedetails(id).subscribe(         
        /* happy path */ p => {
             resultofws=p;
             
          },
         /* error path */ e => console.log( e),
         /* onComplete */ () => {
           let a=resultofws.FilePath;
           if(a){
             window.open(a);
           }   
            
         }
        );
  }

 calltoupdate(){
    let tempvar:hspipddischargedetailsTS;
            this.localService.edit(this.HSPAdminId).subscribe(
          p => tempvar=p,
          e => console.log( e), 
          () => {
              if(tempvar.DischargeId){
                this.hspipddischargedetailsVar=tempvar;
                this.newhspipddischargedetails=false;
                this.DischargeDate=new Date(this.hspipddischargedetailsVar.DischargeDate);
                let doctormaster:doctormasterTS;
                this.localDoctorMasterService.edit(this.hspipddischargedetailsVar.DoctorIdhspipddischargedetails).subscribe(
                      p => doctormaster=p,
                      e => console.log( e), 
                      () => {
                          this.docselected={
                            label:doctormaster.DoctorName,
                            value:this.hspipddischargedetailsVar.DoctorIdhspipddischargedetails
                          };
                           
                          console.log("ON LOAD grid old=",this.hspdischargeprescriptions);
                      } );

                this.localService.getWS_hspdischargeprescription_selectjson(tempvar.DischargeId).subscribe(
                      p => this.hspdischargeprescriptions=p,
                      e => console.log( e), 
                      () => {
                           
                          console.log("ON LOAD grid old=",this.hspdischargeprescriptions);
                      } );

              }else{
                this.newhspipddischargedetails=true;
              }
              console.log("ON LOAD new="+this.newhspipddischargedetails,this.hspipddischargedetailsVar);
          } );


    // this.localService.edit(this.HSPAdminId).subscribe(
    //   p => tempvar=p,
    //   e => console.log( e), 
    //   () => {
    //       if(tempvar.DischargeId){
    //         this.hspipddischargedetailsVar=tempvar;
    //         this.newhspipddischargedetails=false;
    //         this.DischargeDate=new Date(this.hspipddischargedetailsVar.DischargeDate);
    //         this.docselected={
    //           label:'',
    //           value:this.hspipddischargedetailsVar.DoctorIdhspipddischargedetails
    //         };
            
    //       }else{
    //         this.newhspipddischargedetails=true;
    //       }
    //       console.log("ON LOAD new="+this.newhspipddischargedetails,this.hspipddischargedetailsVar);
    //   } );
 }

  ngOnInit() { 

      this.clear();
      
      this.route.params.forEach((params: Params) => {
                this.HSPAdminId= params["billid"];
                
              });
  

        // this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        this.userform = this.fb.group({'DischargeDate':new FormControl('', Validators. required),'DischargeDiagnosis':new FormControl('', Validators. required),'DischargeHistfPrsntIll':new FormControl('', Validators. required),'DischargeExamination':new FormControl('', Validators. required),'DischargeTreatment':new FormControl('', Validators. required),'DischargeFollowup':new FormControl('', Validators. required),'DischargeVerifiedby':new FormControl('', Validators. required),'DoctorIdhspipddischargedetails':new FormControl('', Validators. required),});

        let tempvar:hspipddischargedetailsTS;
        this.calltoupdate();

        // this.localService.edit(this.HSPAdminId).subscribe(
        //   p => tempvar=p,
        //   e => console.log( e), 
        //   () => {
        //       if(tempvar.DischargeId){
        //         this.hspipddischargedetailsVar=tempvar;
        //         this.newhspipddischargedetails=false;
        //         this.DischargeDate=new Date(this.hspipddischargedetailsVar.DischargeDate);
        //         this.localService.getWS_hspdischargeprescription_selectjson(tempvar.DischargeId).subscribe(
        //               p => this.hspdischargeprescriptions=p,
        //               e => console.log( e), 
        //               () => {
                           
        //                   console.log("ON LOAD grid old=",this.hspdischargeprescriptions);
        //               } );

        //       }else{
        //         this.newhspipddischargedetails=true;
        //       }
        //       console.log("ON LOAD new="+this.newhspipddischargedetails,this.hspipddischargedetailsVar);
        //   } );

        this.scheduleslist=[];
        this.scheduleslist.push({label:'Morning', value:'m'});
        this.scheduleslist.push({label:'Afternoon', value:'a'});
        this.scheduleslist.push({label:'Evening', value:'e'});
       
        this.localService.getdoctormaster_HospitalIdDoctorMasterdrp(this.hospitalID).subscribe(         
        /* happy path */ p => {
              this.drpdoctoroptions = p;
              this.drpdoctoroptions.unshift({label:"--Select Doctor--" , value:"1"} )  
            },
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done' + JSON.stringify(this.drpdoctoroptions))
         );

 
        //  this.hspipddischargedetailsVar=new hspipddischargedetailsTS();
  }

  
 

  initContact() {
        // initialize our address
        // return this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        return this.userform = this.fb.group({'DischargeDate':new FormControl('', Validators. required),'DischargeDiagnosis':new FormControl('', Validators. required),'DischargeHistfPrsntIll':new FormControl('', Validators. required),'DischargeExamination':new FormControl('', Validators. required),'DischargeTreatment':new FormControl('', Validators. required),'DischargeFollowup':new FormControl('', Validators. required),'DischargeVerifiedby':new FormControl('', Validators. required),'DoctorIdhspipddischargedetails':new FormControl('', Validators. required),});

    }

  //Dropdown change event capture
  drpchange(events1: any){
    // alert(events1.value);
  }

  get diagnostic() { return JSON.stringify(this.userform.value); }
 }
