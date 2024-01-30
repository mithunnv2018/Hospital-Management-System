import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router,Params } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {hspdoctorvisitdetailsTS} from './hspdoctorvisitdetails';
import {DataTableModule,ConfirmationService} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';
import { MyDateFormat } from '../shared/pipes/mydateformat.pipe';
import {MyTimeFormat} from '../shared/pipes/mytimeformat.pipe';
import { HspdoctorvisitdetailsService } from '../shared/hspdoctorvisitdetails/index';
import { vwhspdoctorvisitdetailsTS} from './vwhspdoctorvisitdetailsTS';

import { Observable } from 'rxjs/Rx';
import {HospitalizationService} from '../shared/hospitalization/hospitalization.service';
import { OpdreceiptService } from '../shared/opdreceipt/index';
import {vwdoctormastercat_doctortypeTS} from './vwdoctormastercat_doctortype';
/**
 * This class represents the lazy loaded countryComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-hspdoctorvisitdetails',
  templateUrl: 'hspdoctorvisitdetails.component.html',
  styleUrls: ['hspdoctorvisitdetails.component.css'],
  providers:[MyDateFormat,MyTimeFormat]
})
export class HspdoctorvisitdetailsComponent implements OnInit {
  
  userform: FormGroup;
  country_contacts:FormGroup;
  msgs: Message[]=[];
  vwhspdoctorvisitdetails:  vwhspdoctorvisitdetailsTS[]=[];

   submitted: boolean;
   submittedcontact:boolean;
   hspdoctorvisitdetailsVar: hspdoctorvisitdetailsTS;
   selectedRow:  vwhspdoctorvisitdetailsTS;

   drpdoctoroptions:SelectItem[]=[];

   newvwhspdoctorvisitdetails: boolean;
   
   hospitalID:string="";
   CurrentLoginYear:string="";
   memberID:string="";

   
   drpappointtypeoptions:SelectItem[]=[];    

   
   HSPAdminId:string="";
   DocVisitDate:Date;

   docselected:SelectItem;
   docresults:SelectItem[]=[];   

   doctype:string="";

   newcontact: boolean;
      clear(){
            this.newvwhspdoctorvisitdetails=true;
            this.hspdoctorvisitdetailsVar=new hspdoctorvisitdetailsTS();

            this.DocVisitDate=null;         
            this.docselected=null;
            this.doctype="";
      }

      
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private localService: HspdoctorvisitdetailsService,
              private localHospitalizationService: HospitalizationService ,
              private localOpdreceiptService: OpdreceiptService,
              private mydate1: MyDateFormat,
              private mytime1:MyTimeFormat,
              private confirmationService:ConfirmationService){
    
                
              // this.hospitalID="HSP1";  
              this.hospitalID=localStorage.getItem('hospitalID'); 
              this.CurrentLoginYear=localStorage.getItem('CurrentLoginYear');                
              this.memberID=localStorage.getItem('memberID');
  }
 
  onSubmit(){
      //   alert(JSON.stringify(this.selectedRow));
        if(this.docselected.value==null){
          this.msgs.push({severity:'warn', summary:'Warning', detail:'Please Select Doctor Name'});
          return;
        }
        this.hspdoctorvisitdetailsVar.DocVisitDate=this.mydate1.parse(this.DocVisitDate);
        this.hspdoctorvisitdetailsVar.MemberIdhspdoctorvisitdetails=this.memberID;
        
           
         this.hspdoctorvisitdetailsVar.HSPAdminIdhspdoctorvisitdetails=this.HSPAdminId;
         this.hspdoctorvisitdetailsVar.DoctorIdhspdoctorvisitdetails=this.docselected.value;

        this.submitted = true;
        this.msgs = [];
        console.log(JSON.stringify(this.hspdoctorvisitdetailsVar));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        if(this.newvwhspdoctorvisitdetails){
        
        this.localService
      .insert(JSON.stringify(this.hspdoctorvisitdetailsVar))
      .subscribe(
         /* happy path */ p => this.vwhspdoctorvisitdetails = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => {
                              this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'})
                                console.log("saved result=",this.vwhspdoctorvisitdetails);
                                
                      }
         );
        }
        else{
          this.localService
            .update(JSON.stringify(this.hspdoctorvisitdetailsVar))
            .subscribe(
              /* happy path */ p => this.vwhspdoctorvisitdetails = p,
              /* error path */ e => console.log(e),
              /* onComplete */ () => {
                                    this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'})
                                      console.log("saved result=",this.vwhspdoctorvisitdetails);
                                      
                            }
              );
        } 
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'});
        this.clear();
  }

  onRowSelectvwhspdoctorvisitdetails(event: any){

this.newvwhspdoctorvisitdetails=false;
 let tempvwhspdoctorvisitdetails:vwhspdoctorvisitdetailsTS;
 tempvwhspdoctorvisitdetails=this.selectedRow;
  this.docselected={
    label:tempvwhspdoctorvisitdetails.DoctorName,
    value:tempvwhspdoctorvisitdetails.DoctorId
  }
//this.ngModelDailyChargesDetailsId= tempvwhspdailychargesdetails.DailyChargesDetailsId;

this.localService.edit(tempvwhspdoctorvisitdetails.DocVisitID).subscribe(
p => this.hspdoctorvisitdetailsVar=p,
 e => console.log( e), 
 () => this.aftercalldate() );

}

  aftercalldate(){
    
    this.DocVisitDate  = new Date(Number(this.hspdoctorvisitdetailsVar.DocVisitDate));
    
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

                       console.log("done filter");         
                      }
         );
 
    }

  deleteSubmitParticularsRow(cont: vwhspdoctorvisitdetailsTS) {
      
         this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {

                let selectedkeywordgridRow:vwhspdoctorvisitdetailsTS=cont;

                this.localService.deleteWS_hspdoctorvisitdetails_delete(selectedkeywordgridRow.DocVisitID).subscribe(         
                /* happy path */ p => {
                    },
                /* error path */ e => console.log( e),
                /* onComplete */ () => console.log('done deleting')
                );
          
                
                this.vwhspdoctorvisitdetails.splice(this.findSelectedKeywordSubcatIndex(selectedkeywordgridRow), 1);
                cont = null;


                this.msgs = [];
                this.msgs.push({severity:'info', summary:'Confirmed', detail:'Record deleted'});
            }
        });


        // this.selectedkeywordgridRow=null;
        
        // this.clearKeywordSubcat();
        
  }

  findSelectedKeywordSubcatIndex(p:vwhspdoctorvisitdetailsTS): number {
        return this.vwhspdoctorvisitdetails.indexOf(p);
  }  

    doGetAmountDocChargesByDoctorId(event:any){
      let tempdocid=this.docselected.value;
      this.doGetDocTypeByDoctorId();
      let tempapttype=this.hspdoctorvisitdetailsVar.DocVisitHeads;
      this.localOpdreceiptService.getWS_GetAmountDocChargesByDoctorId(tempdocid,tempapttype).subscribe(         
        /* happy path */ p => {
            this.hspdoctorvisitdetailsVar.DocVisitAmount=p;
             
          },
         /* error path */ e => console.log( e),
         /* onComplete */ () => {
           
            
         }
        );
    }

    doGetDocTypeByDoctorId(){
      let tempdocid=this.docselected.value;
      this.localService.doGetDocTypeByDoctorId(tempdocid).subscribe(         
        /* happy path */ p => {
            let temp:vwdoctormastercat_doctortypeTS;
            temp=p;
            this.doctype=p.CategoryName;
            
          },
         /* error path */ e => console.log( e),
         /* onComplete */ () => {
           
            
         }
        );
    }
 
  ngOnInit() { 

      this.clear();
      
      this.route.params.forEach((params: Params) => {
                this.HSPAdminId= params["billid"];

              });

  

        // this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        this.userform = this.fb.group({'DocVisitDate':new FormControl('', Validators. required),'DocVisitHeads':new FormControl('', Validators. required),'DocVisitAmount':new FormControl('', Validators. required),'DocVisitObservations':new FormControl('', Validators. required),'DoctorIdhspdoctorvisitdetails':new FormControl('', Validators. required),});

     
        this.localService.getdoctormaster_HospitalIdDoctorMasterdrp(this.hospitalID).subscribe(         
        /* happy path */ p => {
              this.drpdoctoroptions = p;
              this.drpdoctoroptions.unshift({label:"--Select Doctor--" , value:"1"} )  
            },
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done drpdoctoroptions' + JSON.stringify(this.drpdoctoroptions))
         );

         this.localService.getall(this.HSPAdminId).subscribe(         
        /* happy path */ p => {
              this.vwhspdoctorvisitdetails = p;
              
            },
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done vwhspdoctorvisitdetails' + JSON.stringify(this.vwhspdoctorvisitdetails))
         );

         this.drpappointtypeoptions=[
           {
             label:"--Select Appointment Type--",
             value:"1"
           },
           {
             label:"FollowUp",
             value:"FollowUp"
           },
           {
             label:"New",
             value:"New"
           },
           {
             label:"Emergency",
             value:"Emergency"
           },
           {
             label:"Super Specialist",
             value:"SuperSpeciality"
           },
         ]; 

         this.hspdoctorvisitdetailsVar=new hspdoctorvisitdetailsTS();
  }

  
 

  initContact() {
        // initialize our address
        // return this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        return this.userform = this.fb.group({'DocVisitDate':new FormControl('', Validators. required),'DocVisitHeads':new FormControl('', Validators. required),'DocVisitAmount':new FormControl('', Validators. required),'DocVisitObservations':new FormControl('', Validators. required),'DoctorIdhspdoctorvisitdetails':new FormControl('', Validators. required),});


    }

  //Dropdown change event capture
  drpchange(events1: any){
    // alert(events1.value);
  }

  get diagnostic() { return JSON.stringify(this.userform.value); }
 }
