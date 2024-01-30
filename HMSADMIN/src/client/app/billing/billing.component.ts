import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router,Params } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {CountryMasterTS} from '../country/country';
import {DataTableModule} from 'primeng/primeng';
import {SelectItem,CalendarModule} from 'primeng/primeng';

import { MyDateFormat } from '../shared/pipes/mydateformat.pipe';

import { BillingService } from '../shared/billing/index';

import { Observable } from 'rxjs/Rx';
import {opdpatricularreceiptTS} from './billing';
import {VwOPDReceiptPatientDoctorHospitalTS} from './VwOPDReceiptPatientDoctorHospitalTS';
import { Reportresult } from '../shared/baseurl/reportresult';
import { vwhospitalizationipdpackagetrustcategorydiseasedetailsTS } from '../hospitalization/vwhospitalizationipdpackagetrustcategorydiseasedetailsTS';

/**
 * This class represents the lazy loaded countryComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-billing',
  templateUrl: 'billing.component.html',
  styleUrls: ['billing.component.css'],
  providers:[MyDateFormat]

})
export class BillingComponent implements OnInit {
  
  userform: FormGroup;
  country_contacts:FormGroup;
  msgs: Message[]=[];
   
  Vwparticulars:opdpatricularreceiptTS[]=[];

   submitted: boolean;
   submittedcontact:boolean;
  //  opdreceiptVar: opdreceiptTS;
   selectedRow: VwOPDReceiptPatientDoctorHospitalTS;

   vwhospitalization:vwhospitalizationipdpackagetrustcategorydiseasedetailsTS;


   newVwOPDReceiptPatientDoctorHospital: boolean;
   newcontact: boolean;

    hospitalID:string="";
    memberID:string="";
    CurrentLoginYear:string="";

    OPDReceiptDate:Date;
    OPDReceiptFromDate:Date;
    OPDReceiptToDate:Date;
    
    HSPAdminStatus:string="";
    HSPAdminId:string="";

    concession:string;
    grandtotalamount:Number;

   clear(){
        this.  newVwOPDReceiptPatientDoctorHospital=true;
         
        //this.downloadfile("DUMMY");
    }

      
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private localService: BillingService,
              private mydate1: MyDateFormat){
                
               this.hospitalID=localStorage.getItem('hospitalID');  
               this.memberID=localStorage.getItem('memberID');  
               this.CurrentLoginYear=localStorage.getItem('CurrentLoginYear');  
                
  }





  onSubmit(){

      //   alert(JSON.stringify(this.selectedRow));
   }
   
  loadotherfields(){
    let temp=this.vwhospitalization.HSPAdminStatus;
    this.HSPAdminStatus=temp;
    if(temp==="A"){
      this.HSPAdminStatus="Admitted";
    }
  }    

  loadtotalamount(){
    let total=0;
    if(this.Vwparticulars){
      for(let i=0;i<this.Vwparticulars.length;i++){
        let a=Number(this.Vwparticulars[i].AdminFeesCharges);
        total=total+a;
      }
    }
    
    this.grandtotalamount=total;
  }

  ngOnInit() { 


      this.route.params.forEach((params: Params) => {
                this.HSPAdminId= params["billid"];

      });

      let departmenttype:string="departmenttype";
      let policytype:string="policytype";
      
      this.clear();
       
      this.localService.getWS_viewhospitalizationipd_selectedit(this.HSPAdminId).subscribe(         
        /* happy path */ p => {
              this.vwhospitalization = p;
              this.loadotherfields();
            },
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done vwhospitalization' + JSON.stringify(this.vwhospitalization))
         );
     
 
        this.localService
      .get_WS_adminfees_sum_groupby_selectjson(this.HSPAdminId)
      .subscribe(
         /* happy path */ p => this.Vwparticulars= p,
         /* error path */ e => console.log( e),
         /* onComplete */ () => this.loadtotalamount() );

 
          

       
  }

  onbtnreloadparticulars(){

          this.localService
      .get_WS_concession_adminfees(this.HSPAdminId,this.concession)
      .subscribe(
         /* happy path */ p => {},
         /* error path */ e => console.log( e),
         /* onComplete */ () => {
                this.localService.get_WS_adminfees_sum_groupby_selectjson(this.HSPAdminId)
                .subscribe(
                  /* happy path */ p => this.Vwparticulars= p,
                  /* error path */ e => console.log( e),
                  /* onComplete */ () => this.loadtotalamount() );
                              
         });

  }

  printTheBill(){
      let id=this.HSPAdminId;//reciptvw.OPDReceiptId;
      
      let advancepymnt:string;
      let resultofws:Reportresult;
      
      console.log("ReceiptID is "+id);
      this.localService.printreportforthebill(id).subscribe(
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

    printdetailedfinalreport(){
      let id=this.HSPAdminId;//reciptvw.OPDReceiptId;
      
      let advancepymnt:string;
      let resultofws:Reportresult;
      
      console.log("ReceiptID is "+id);
      this.localService.printreportfordetailedfinalreport(id).subscribe(
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

  callfinalreceipt(){
    this.router.navigate(['/ipdreceipt',this.HSPAdminId,"Final"]);
  }
  
 

  initContact() {
        // initialize our address
        // return this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        //return this.userform = this.fb.group({'CountryName':new FormControl('', Validators. required),'CountryAliasName':new FormControl('', Validators. required),});
        return this.userform = this.fb.group({'OPDReceiptNos':new FormControl('', Validators. required),'OPDReceiptDate':new FormControl('', Validators. required),'IPDIdOPDReceipt':new FormControl('', Validators. required),'DoctorIdOPDReceipt':new FormControl('', Validators. required),'OPDReceiptAmount':new FormControl('', Validators. required),'OPDReceiptSuffering':new FormControl('', Validators. required),'OPDReceiptAppointmentType':new FormControl('', Validators. required),'OPDReceiptFromDate':new FormControl('', Validators. required),'OPDReceiptToDate':new FormControl('', Validators. required),});

    }

  //Dropdown change event capture
  drpchange(events1: any){
    // alert(events1.value);
  }

  

  get diagnostic() { return JSON.stringify(this.userform.value); }
 }
