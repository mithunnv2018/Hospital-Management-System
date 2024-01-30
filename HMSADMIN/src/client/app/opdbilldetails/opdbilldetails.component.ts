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

import { OPDBillDetailsService } from '../shared/opdbilldetails/index';

import { Observable } from 'rxjs/Rx';
import {opdbilldetailsTS} from './opdbilldetails';
import {VwOPDBillDetailsPatientDoctorHospitalTS} from './VwOPDBillDetailsPatientDoctorHospitalTS';
import { Reportresult } from '../shared/baseurl/reportresult';
import {vwopdbillhospitalTS} from './vwopdbillhospitalTS';
import {vw_opdbillparticularsdetailsTS} from './vw_opdbillparticularsdetailsTS';
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import {HospitalizationService} from '../shared/hospitalization/hospitalization.service';

/**
 * This class represents the lazy loaded countryComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-opdbilldetails',
  templateUrl: 'opdbilldetails.component.html',
  styleUrls: ['opdbilldetails.component.css'],
  providers:[MyDateFormat,ConfirmationService]

})
export class OPDBillDetailsComponent implements OnInit {
  
  userform: FormGroup;
  usersubform:FormGroup;


  country_contacts:FormGroup;
  msgs: Message[]=[];
   
  VwOPDBillDetailsPatientDoctorHospital:VwOPDBillDetailsPatientDoctorHospitalTS[]=[];

   submitted: boolean;
   submittedcontact:boolean;
   opdbilldetailsVar: opdbilldetailsTS;
   selectedRow: VwOPDBillDetailsPatientDoctorHospitalTS;

   //new sub form ts
   vwopdbillhospitalVar:vw_opdbillparticularsdetailsTS;

   vw_opdbillparticularsdetails:vw_opdbillparticularsdetailsTS[]=[];


   newVwOPDBillDetailsPatientDoctorHospital: boolean;
   newcontact: boolean;

    hospitalID:string="";
    memberID:string="";
    CurrentLoginYear:string="";

    OPDBillDetailsDate:Date;
     

    drpipdoptions:SelectItem[]=[];
    drpdoctoroptions:SelectItem[]=[];

    drpbillparticularsoptions:SelectItem[]=[];
    
    drppaymenttypeoptions:SelectItem[]=[];

    ipdselected:SelectItem;
    ipdresults:SelectItem[]=[];    

   docselected:SelectItem;
   docresults:SelectItem[]=[];   


   clear(){
        this.  newVwOPDBillDetailsPatientDoctorHospital=true;
        this.opdbilldetailsVar=new opdbilldetailsTS();

        this.OPDBillDetailsDate=null;

        this.vwopdbillhospitalVar=new vw_opdbillparticularsdetailsTS();     

        this.vw_opdbillparticularsdetails=[];
        this.ipdselected=null;
        this.docselected=null;
        this.opdbilldetailsVar.OPDBillDetailsDiscount="0";
        //this.downloadfile("DUMMY");
    }

      
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private localService: OPDBillDetailsService,
              private localHospitalizationService: HospitalizationService ,
              private mydate1: MyDateFormat,
              private confirmationService:ConfirmationService){
                
               this.hospitalID=localStorage.getItem('hospitalID');  
               this.memberID=localStorage.getItem('memberID');  
               this.CurrentLoginYear=localStorage.getItem('CurrentLoginYear');  
                
  }





  onSubmit(){

      //   alert(JSON.stringify(this.selectedRow));
        this.opdbilldetailsVar.OPDBillDetailsDate=this.mydate1.parse(this.OPDBillDetailsDate);
        
        this.opdbilldetailsVar.HospitalIdOPDBillDetails=this.hospitalID;
        this.opdbilldetailsVar.MemberIdOPDBillDetails=this.memberID;
        this.opdbilldetailsVar.OPDBillDetailsYear=this.CurrentLoginYear;
        
        this.opdbilldetailsVar.IPDIdOPDBillDetails=this.ipdselected.value;

        this.opdbilldetailsVar.DoctorIdOPDBillDetails=this.docselected.value;


        this.submitted = true;
        this.msgs = [];
        console.log(JSON.stringify(this.opdbilldetailsVar));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        if(this.  newVwOPDBillDetailsPatientDoctorHospital){
          this.localService
            .insert(JSON.stringify(this.opdbilldetailsVar),JSON.stringify(this.vw_opdbillparticularsdetails),this.CurrentLoginYear)
            .subscribe(
              /* happy path */ p => {
                // this.VwOPDBillDetailsPatientDoctorHospital = p;
                let temp=p;
                this.printReceipt(temp);
            },
              /* error path */ e => console.log(e),
              /* onComplete */ () => {
                this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'});
                this.localService.getall(this.memberID,this.CurrentLoginYear,this.hospitalID)
                    .subscribe(
                      /* happy path */ p => this.VwOPDBillDetailsPatientDoctorHospital= p,
                      /* error path */ e => console.log( e),
                      /* onComplete */ () => console.log('done getDisplayAll2' + JSON.stringify(this.VwOPDBillDetailsPatientDoctorHospital)));                
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


  onSubmitParticulars(){
    
    let a=this.vwopdbillhospitalVar.OPDBillParticularsIdOPDBillParticularsDetails;
    let b:SelectItem;

    b=this.drpbillparticularsoptions.find(parti=>parti.value===a);

    this.vwopdbillhospitalVar.OPDBillParticularsName=b.label;

    this.vw_opdbillparticularsdetails.push(this.vwopdbillhospitalVar);
    this.vwopdbillhospitalVar=new vw_opdbillparticularsdetailsTS();

    this.calculateAmountSum();
  }

  deleteSubmitParticularsRow(cont: vw_opdbillparticularsdetailsTS) {


      this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {


            let selectedkeywordgridRow:vw_opdbillparticularsdetailsTS=cont;
            this.vw_opdbillparticularsdetails.splice(this.findSelectedKeywordSubcatIndex(selectedkeywordgridRow), 1);
            cont = null;
            // this.selectedkeywordgridRow=null;
            
            // this.clearKeywordSubcat();
            this.calculateAmountSum();

            this.msgs = [];
            this.msgs.push({severity:'info', summary:'Confirmed', detail:'You have accepted'});
            }
        });

  }

  findSelectedKeywordSubcatIndex(p:vw_opdbillparticularsdetailsTS): number {
        return this.vw_opdbillparticularsdetails.indexOf(p);
  }  


  gotoIPDNew(){
    this.router.navigate(['/ipdmaster']);
  }
    
    

  ngOnInit() { 
 
      this.clear();
      
      this.userform = this.fb.group({'IPDIdOPDBillDetails':new FormControl('', Validators. required),'OPDBillDetailsBillAmt':new FormControl('', Validators. required),'OPDBillDetailsTotalAmt':new FormControl('', Validators. required),'OPDBillDetailsDate':new FormControl('', Validators. required),'DoctorIdOPDBillDetails':new FormControl('', Validators. required),'OPDBillDetailsPaymentType':new FormControl('', Validators. required),});
      // this.userform = this.fb.group({'OPDBillDetailsNos':new FormControl('', Validators. required),'IPDIdOPDBillDetails':new FormControl('', Validators. required),'OPDBillDetailsBillAmt':new FormControl('', Validators. required),'OPDBillDetailsTotalAmt':new FormControl('', Validators. required),'OPDBillDetailsDate':new FormControl('', Validators. required),'DoctorIdOPDBillDetails':new FormControl('', Validators. required),'OPDBillDetailsPaymentType':new FormControl('', Validators. required),});

      this.usersubform = this.fb.group({'OPDBillParticularsDetailsAmount':new FormControl('', Validators. required),});

        
          this.localService.getipdmaster_HospitalIdIPDMasterdrp(this.hospitalID).subscribe(         
        /* happy path */ p => {
            this. drpipdoptions = p;
            this.drpipdoptions.unshift({label:"--Select IPD--" , value:"1"} )
          },
         /* error path */ e => console.log( e),
         /* onComplete */ () =>{ console.log('done getDisplayAll2' + JSON.stringify(this.drpipdoptions))
                this.localService.getDoctormaster_HospitalIdDoctorMasterdrp(this.hospitalID).subscribe(         
                /* happy path */ p => {
                    this. drpdoctoroptions = p;
                    this.drpdoctoroptions.unshift({label:"--Select Doctor--" , value:"1"} )
                  },
                /* error path */ e => console.log( e),
                /* onComplete */ () => {console.log('done getDisplayAll2' + JSON.stringify(this.drpdoctoroptions))
                                this.localService.getopdbillparticularsHospitalIdOPDBillParticularsdrp(this.hospitalID).subscribe(         
                                /* happy path */ p => {
                                    this. drpbillparticularsoptions = p;
                                    this.drpbillparticularsoptions.unshift({label:"--Select Patriculars--" , value:"1"} )
                                  },
                                /* error path */ e => console.log( e),
                                /* onComplete */ () => {console.log('done getDisplayAll2' + JSON.stringify(this.drpbillparticularsoptions))
                                            this.localService.getall(this.memberID,this.CurrentLoginYear,this.hospitalID)
                                            .subscribe(
                                              /* happy path */ p => this.VwOPDBillDetailsPatientDoctorHospital= p,
                                              /* error path */ e => console.log( e),
                                              /* onComplete */ () => console.log('done getDisplayAll2' + JSON.stringify(this.VwOPDBillDetailsPatientDoctorHospital)));

                                  }
                                );
                    
                    }
                );

              
            }
         );
        


        this.drppaymenttypeoptions=[{
          label:"--Select Payment Type",
          value:"1"
        },
        {
          label:"Cash",
          value:"Cash"
        },
        {
          label:"Cheque",
          value:"Cheque"
        },
        {
          label:"Debit / Credit Card",
          value:"DebitCredit"
        },
        {
          label:"Net Banking",
          value:"NetBanking"
        },
        {
          label:"RTGS",
          value:"RTGS"
        }] ;         

         this.opdbilldetailsVar=new opdbilldetailsTS();
         this.opdbilldetailsVar.OPDBillDetailsDiscount="0";
  }

      mysort(event:any) {
      let comparer = function (a:VwOPDBillDetailsPatientDoctorHospitalTS, b:VwOPDBillDetailsPatientDoctorHospitalTS): number {
        let date1=new Date(a.OPDBillDetailsDate);
        let date2=new Date(b.OPDBillDetailsDate);
        
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

      this.VwOPDBillDetailsPatientDoctorHospital.sort(comparer);
   }

  printReceipt(reciptvw:VwOPDBillDetailsPatientDoctorHospitalTS){
      let id=reciptvw.OPDBillDetailsId;
      
      let resultofws:Reportresult;
      console.log("opdbilldetailsid is "+id,reciptvw);
      this.localService.printreportforopdbilldetails(id).subscribe(         
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

filterIPDName(event:any) {
        this.ipdresults = [];

        let b=this.drpipdoptions.find(parti=>parti.label===event.query);

        
        for(let i = 0; i < this.drpipdoptions.length; i++) {
            let ipdopt = this.drpipdoptions[i];
            if(ipdopt.label.toLowerCase().indexOf(event.query.toLowerCase())==0){
              this.ipdresults.push(ipdopt);
            }
         }
    }

calculateAmountSum(){
  
  let amount2=0;
  for(let i=0;i<this.vw_opdbillparticularsdetails.length;i++){
    
      let temp=this.vw_opdbillparticularsdetails[i].OPDBillParticularsDetailsAmount;
      amount2=amount2+Number(temp);
  }
  this.opdbilldetailsVar.OPDBillDetailsBillAmt=amount2+"";

  let discount=0;
  
  if(this.opdbilldetailsVar.OPDBillDetailsDiscount){
    discount=Number(this.opdbilldetailsVar.OPDBillDetailsDiscount);
  }

  let totalamount=amount2-discount;

  this.opdbilldetailsVar.OPDBillDetailsTotalAmt=totalamount+"";


}

    aftercalldate(){
      this.OPDBillDetailsDate= new Date(Number(this.opdbilldetailsVar.OPDBillDetailsDate));
    }

 

  initContact() {
        // initialize our address
        // return this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        //return this.userform = this.fb.group({'CountryName':new FormControl('', Validators. required),'CountryAliasName':new FormControl('', Validators. required),});
        return this.userform = this.fb.group({'IPDIdOPDBillDetails':new FormControl('', Validators. required),'OPDBillDetailsBillAmt':new FormControl('', Validators. required),'OPDBillDetailsTotalAmt':new FormControl('', Validators. required),'OPDBillDetailsDate':new FormControl('', Validators. required),'DoctorIdOPDBillDetails':new FormControl('', Validators. required),'OPDBillDetailsPaymentType':new FormControl('', Validators. required),});


    }

  //Dropdown change event capture
  drpchange(events1: any){
    // alert(events1.value);
  }

  

  get diagnostic() { return JSON.stringify(this.userform.value); }
 }
