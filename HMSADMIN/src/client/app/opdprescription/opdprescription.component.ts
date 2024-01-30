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

import { OpdprescriptionService } from '../shared/opdprescription/index';

import { Observable } from 'rxjs/Rx';
import {opddocprescriptionTS} from './opdprescription';
import {vwopddocprescriptiondetailsTS} from './vwopddocprescriptiondetailsTS';
import { Reportresult } from '../shared/baseurl/reportresult';
import {vwopdbillhospitalTS} from './vwopdbillhospitalTS';
import {opddocprescriptiondetailsTS} from './opddocprescriptiondetailsTS';
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import {HospitalizationService} from '../shared/hospitalization/hospitalization.service';

import {HspipddischargedetailsService} from '../shared/hspipddischargedetails/hspipddischargedetails.service';
/**
 * This class represents the lazy loaded countryComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-opdprescription',
  templateUrl: 'opdprescription.component.html',
  styleUrls: ['opdprescription.component.css'],
  providers:[MyDateFormat,ConfirmationService]

})
export class OpdprescriptionComponent implements OnInit {
  
  userform: FormGroup;
  usersubform:FormGroup;


  country_contacts:FormGroup;
  msgs: Message[]=[];
   
  vwopddocprescriptiondetails:vwopddocprescriptiondetailsTS[]=[];

   submitted: boolean;
   submittedcontact:boolean;
   opdprescriptionVar: opddocprescriptionTS;
   selectedRow: vwopddocprescriptiondetailsTS;

   //new sub form ts
   opddocprescriptiondetailsVar:opddocprescriptiondetailsTS;

   vw_opddocprescriptiondetails:opddocprescriptiondetailsTS[]=[];


   newvwopddocprescriptiondetails: boolean;
   newcontact: boolean;

    hospitalID:string="";
    memberID:string="";
    CurrentLoginYear:string="";

    OpdprescriptionDate:Date;
     

    drpipdoptions:SelectItem[]=[];
    drpdoctoroptions:SelectItem[]=[];

    drpbillparticularsoptions:SelectItem[]=[];
    
    

    ipdselected:SelectItem;
    ipdresults:SelectItem[]=[];    

   docselected:SelectItem;
   docresults:SelectItem[]=[];   

   medresults:SelectItem[]=[];
   medselected:SelectItem;

   displaynewnoofdays:boolean;
   displayschedule:boolean;

   selectedschedules:string[]=[];
   scheduleslist:SelectItem[]=[];

   noofdays:number=7;

   clear(){
        this.  newvwopddocprescriptiondetails=true;
        this.opdprescriptionVar=new opddocprescriptionTS();

        this.OpdprescriptionDate=null;

        this.opddocprescriptiondetailsVar=new opddocprescriptiondetailsTS();     
        

        this.vw_opddocprescriptiondetails=[];
        this.ipdselected=null;
        this.docselected=null;
        // this.opdprescriptionVar.OpdprescriptionDiscount="0";
        //this.downloadfile("DUMMY");
        
        this.noofdays=7;
        this.displaynewnoofdays=false;
        this.displayschedule=false;
    }

      
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private localService: OpdprescriptionService,
              private localHospitalizationService: HospitalizationService ,
              private localHspipddischargedetailsService: HspipddischargedetailsService,
              private mydate1: MyDateFormat,
              private confirmationService:ConfirmationService){
                
               this.hospitalID=localStorage.getItem('hospitalID');  
               this.memberID=localStorage.getItem('memberID');  
               this.CurrentLoginYear=localStorage.getItem('CurrentLoginYear');  
                
  }





  onSubmit(){

      //   alert(JSON.stringify(this.selectedRow));
        this.opdprescriptionVar.OpdDocPDate=this.mydate1.parse(this.OpdprescriptionDate);
        
        this.opdprescriptionVar.HospitalIdopddocprescription=this.hospitalID;
        this.opdprescriptionVar.MemberIdopddocprescription=this.memberID;
        // this.opdprescriptionVar.OpdprescriptionYear=this.CurrentLoginYear;
        
        this.opdprescriptionVar.IPDIdopddocprescription=this.ipdselected.value;

        this.opdprescriptionVar.DoctorIdopddocprescription=this.docselected.value;


        this.submitted = true;
        this.msgs = [];
        console.log(JSON.stringify(this.opdprescriptionVar));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        if(this.  newvwopddocprescriptiondetails){
          this.localService
            .insert(JSON.stringify(this.opdprescriptionVar),JSON.stringify(this.vw_opddocprescriptiondetails),this.CurrentLoginYear)
            .subscribe(
              /* happy path */ p => {
                // this.vwopddocprescriptiondetails = p;
                let temp=p;
                this.printReceipt(temp);
            },
              /* error path */ e => console.log(e),
              /* onComplete */ () => {
                this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'});
                this.localService.getall(this.hospitalID)
                    .subscribe(
                      /* happy path */ p => this.vwopddocprescriptiondetails= p,
                      /* error path */ e => console.log( e),
                      /* onComplete */ () => console.log('done getDisplayAll2' + JSON.stringify(this.vwopddocprescriptiondetails)));                
              }
            );
        }
         
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'});
        this.clear();
  }
  filterDOCName(event:any) {
        this.docresults = [];
        let query=event.query;
        this.localHospitalizationService
      .getWS_doctormaster_HospitalIdDoctorMaster_byDoctorName_drpjson(this.hospitalID,query)
      .subscribe(
         /* happy path */ p => this.docresults = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => {this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'})
                                
                      }
         );
 
    }

    filterMedicineName(event:any) {
        this.medresults = [];
        let query=event.query;
        this.localHspipddischargedetailsService
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
  
  onSubmitParticulars(){
    
    // let a=this.opddocprescriptiondetailsVar.OPDBillParticularsIdOPDBillParticularsDetails;
    // let b:SelectItem;

    // b=this.drpbillparticularsoptions.find(parti=>parti.value===a);

    // this.opddocprescriptiondetailsVar.OPDBillParticularsName=b.label;
    this.opddocprescriptiondetailsVar.GenericMedName=this.medselected.label;
    this.opddocprescriptiondetailsVar.GenericIdopddocprescriptiondetails=this.medselected.value;
    this.opddocprescriptiondetailsVar.OpdDocPresDetMorning="false";
    this.opddocprescriptiondetailsVar.OpdDocPresDetAfternoon="false";
    this.opddocprescriptiondetailsVar.OpdDocPresDetEvening="false";
    this.opddocprescriptiondetailsVar.OpdDocPresDetNosOfDays=""+this.noofdays;
    for(let i=0;i<this.selectedschedules.length;i++){
      if(this.selectedschedules[i]=="m"){
        this.opddocprescriptiondetailsVar.OpdDocPresDetMorning="true";
      }
      if(this.selectedschedules[i]=="a"){
        this.opddocprescriptiondetailsVar.OpdDocPresDetAfternoon="true";
      }
      if(this.selectedschedules[i]=="e"){
        this.opddocprescriptiondetailsVar.OpdDocPresDetEvening="true";
      }
      
    } 

    this.vw_opddocprescriptiondetails.push(this.opddocprescriptiondetailsVar);
    this.opddocprescriptiondetailsVar=new opddocprescriptiondetailsTS();

    this.noofdays=7;

    this.displayschedule=false;
    this.medselected=null;

    this.selectedschedules=[];
    
    //this.calculateAmountSum();
  }

  deleteSubmitParticularsRow(cont: opddocprescriptiondetailsTS) {


      this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {


            let selectedkeywordgridRow:opddocprescriptiondetailsTS=cont;
            this.vw_opddocprescriptiondetails.splice(this.findSelectedKeywordSubcatIndex(selectedkeywordgridRow), 1);
            cont = null;
            // this.selectedkeywordgridRow=null;
            
            // this.clearKeywordSubcat();
            this.calculateAmountSum();

            this.msgs = [];
            this.msgs.push({severity:'info', summary:'Confirmed', detail:'You have accepted'});
            }
        });

  }

  findSelectedKeywordSubcatIndex(p:opddocprescriptiondetailsTS): number {
        return this.vw_opddocprescriptiondetails.indexOf(p);
  }  


  gotoIPDNew(){
    this.router.navigate(['/ipdmaster']);
  }
    
    

  ngOnInit() { 
 
      this.clear();
      
      this.scheduleslist=[];
      this.scheduleslist.push({label:'Morning', value:'m'});
      this.scheduleslist.push({label:'Afternoon', value:'a'});
      this.scheduleslist.push({label:'Evening', value:'e'});
       
      this.userform = this.fb.group({'OpdDocPDate':new FormControl('', Validators. required),'IPDIdopddocprescription':new FormControl('', Validators. required),'DoctorIdopddocprescription':new FormControl('', Validators. required),});
      // this.userform = this.fb.group({'OpdprescriptionNos':new FormControl('', Validators. required),'IPDIdOpdprescription':new FormControl('', Validators. required),'OpdprescriptionBillAmt':new FormControl('', Validators. required),'OpdprescriptionTotalAmt':new FormControl('', Validators. required),'OpdprescriptionDate':new FormControl('', Validators. required),'DoctorIdOpdprescription':new FormControl('', Validators. required),'OpdprescriptionPaymentType':new FormControl('', Validators. required),});

      this.usersubform = this.fb.group({'OPDBillParticularsDetailsAmount':new FormControl('', Validators. required),});

        this.localService.getall(this.hospitalID)
                        .subscribe(
                          /* happy path */ p => this.vwopddocprescriptiondetails= p,
                          /* error path */ e => console.log( e),
                          /* onComplete */ () => console.log('done getDisplayAll2' + JSON.stringify(this.vwopddocprescriptiondetails)));
        


 

         this.opdprescriptionVar=new opddocprescriptionTS();
        //  this.opdprescriptionVar.OpdprescriptionDiscount="0";
  }

      mysort(event:any) {
      let comparer = function (a:vwopddocprescriptiondetailsTS, b:vwopddocprescriptiondetailsTS): number {
        let date1=new Date(a.OpdDocPDate);
        let date2=new Date(b.OpdDocPDate);
        
        let tempa=mydatetemp.parse(date1);
        let tempb=mydatetemp.parse(date2);
        
        let realdate1=new Date(tempa);
        let realdate2=new Date(tempb);
        
        console.log("The 1 dates are=",realdate1);  
        console.log("The 2 dates are=",realdate2);

        let result: number = -1;
        
        if(realdate1.getTime() >realdate2.getTime())result=1;  
        
        return result * event.order;
      };

      let mydatetemp=this.mydate1;

      this.vwopddocprescriptiondetails.sort(comparer);
   }

  printReceipt(reciptvw:vwopddocprescriptiondetailsTS){
      let id=reciptvw.OpdDocPId;
      
      let resultofws:Reportresult;
      console.log("opdprescriptionid is "+id,reciptvw);
      this.localService.printreportforopdprescription(id).subscribe(         
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

// filterIPDName(event:any) {
//         this.ipdresults = [];

//         let b=this.drpipdoptions.find(parti=>parti.label===event.query);

        
//         for(let i = 0; i < this.drpipdoptions.length; i++) {
//             let ipdopt = this.drpipdoptions[i];
//             if(ipdopt.label.toLowerCase().indexOf(event.query.toLowerCase())==0){
//               this.ipdresults.push(ipdopt);
//             }
//          }
//     }
    filterIPDName(event:any) {
        this.ipdresults = [];
        let query=event.query;
        this.localHospitalizationService
      .getipdmaster_HospitalIdIPDMaster_SearchNamedrp(this.hospitalID,query)
      .subscribe(
         /* happy path */ p => this.ipdresults = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => {
                                console.log("saved result=");
                      }
         );
 
    } 


calculateAmountSum(){
  
  // let amount2=0;
  // for(let i=0;i<this.vw_opddocprescriptiondetails.length;i++){
    
  //     let temp=this.vw_opddocprescriptiondetails[i].OPDBillParticularsDetailsAmount;
  //     amount2=amount2+Number(temp);
  // }
  // this.opdprescriptionVar.OpdprescriptionBillAmt=amount2+"";

  // let discount=0;
  
  // if(this.opdprescriptionVar.OpdprescriptionDiscount){
  //   discount=Number(this.opdprescriptionVar.OpdprescriptionDiscount);
  // }

  // let totalamount=amount2-discount;

  // this.opdprescriptionVar.OpdprescriptionTotalAmt=totalamount+"";


}

    aftercalldate(){
      this.OpdprescriptionDate= new Date(Number(this.opdprescriptionVar.OpdDocPDate));
    }

 

  initContact() {
        // initialize our address
        // return this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        //return this.userform = this.fb.group({'CountryName':new FormControl('', Validators. required),'CountryAliasName':new FormControl('', Validators. required),});
        return this.userform = this.fb.group({'IPDIdOpdprescription':new FormControl('', Validators. required),'OpdprescriptionBillAmt':new FormControl('', Validators. required),'OpdprescriptionTotalAmt':new FormControl('', Validators. required),'OpdprescriptionDate':new FormControl('', Validators. required),'DoctorIdOpdprescription':new FormControl('', Validators. required),'OpdprescriptionPaymentType':new FormControl('', Validators. required),});


    }

  //Dropdown change event capture
  drpchange(events1: any){
    // alert(events1.value);
  }

  

  get diagnostic() { return JSON.stringify(this.userform.value); }
 }
