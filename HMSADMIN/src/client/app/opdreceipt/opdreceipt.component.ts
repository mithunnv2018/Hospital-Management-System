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

import { OpdreceiptService } from '../shared/opdreceipt/index';

import { Observable } from 'rxjs/Rx';
import {opdreceiptTS} from './opdreceipt';
import {VwOPDReceiptPatientDoctorHospitalTS} from './VwOPDReceiptPatientDoctorHospitalTS';
import { Reportresult } from '../shared/baseurl/reportresult';
import {HospitalizationService} from '../shared/hospitalization/hospitalization.service';
/**
 * This class represents the lazy loaded countryComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-opdreceipt',
  templateUrl: 'opdreceipt.component.html',
  styleUrls: ['opdreceipt.component.css'],
  providers:[MyDateFormat]

})
export class OpdreceiptComponent implements OnInit {
  
  userform: FormGroup;
  country_contacts:FormGroup;
  msgs: Message[]=[];
   
  VwOPDReceiptPatientDoctorHospital:VwOPDReceiptPatientDoctorHospitalTS[]=[];

   submitted: boolean;
   submittedcontact:boolean;
   opdreceiptVar: opdreceiptTS;
   selectedRow: VwOPDReceiptPatientDoctorHospitalTS;


   newVwOPDReceiptPatientDoctorHospital: boolean;
   newcontact: boolean;

    hospitalID:string="";
    memberID:string="";
    CurrentLoginYear:string="";

    OPDReceiptDate:Date;
    OPDReceiptFromDate:Date;
    OPDReceiptToDate:Date;
    

    drpipdoptions:SelectItem[]=[];
    drpdoctoroptions:SelectItem[]=[];

    ipdselected:SelectItem;
    ipdresults:SelectItem[]=[];

    drpappointtypeoptions:SelectItem[]=[];


    docselected:SelectItem;
    docresults:SelectItem[]=[];   


   clear(){
        this.  newVwOPDReceiptPatientDoctorHospital=true;
        this.opdreceiptVar=new opdreceiptTS();
        this.OPDReceiptDate=null;
        this.OPDReceiptFromDate=null;
        this.OPDReceiptToDate=null;

        this.ipdselected=null;
        this.docselected=null;
        //this.downloadfile("DUMMY");
    }

      
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private localService: OpdreceiptService,
              private localHospitalizationService:HospitalizationService,
              private mydate1: MyDateFormat){
                
               this.hospitalID=localStorage.getItem('hospitalID');  
               this.memberID=localStorage.getItem('memberID');  
               this.CurrentLoginYear=localStorage.getItem('CurrentLoginYear');  
                
  }





  onSubmit(){

      //   alert(JSON.stringify(this.selectedRow));
        this.opdreceiptVar.OPDReceiptDate=this.mydate1.parse(this.OPDReceiptDate);
        this.opdreceiptVar.OPDReceiptFromDate=this.mydate1.parse(this.OPDReceiptFromDate);
        this.opdreceiptVar.OPDReceiptToDate=this.mydate1.parse(this.OPDReceiptToDate);

        this.opdreceiptVar.HospitalIdOPDReceipt=this.hospitalID;
        this.opdreceiptVar.MemberIdOPDReceipt=this.memberID;
        this.opdreceiptVar.OPDReceiptYear=this.CurrentLoginYear;
        
        this.opdreceiptVar.IPDIdOPDReceipt=this.ipdselected.value;
        
        this.opdreceiptVar.DoctorIdOPDReceipt=this.docselected.value;
        
        this.submitted = true;
        this.msgs = [];
        console.log(JSON.stringify(this.opdreceiptVar));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        if(this.  newVwOPDReceiptPatientDoctorHospital){
          this.localService
            .insert(JSON.stringify(this.opdreceiptVar),this.CurrentLoginYear)
            .subscribe(
              /* happy path */ p => {

                   let temp=p;    
                   this.printReceipt(temp);
                  // this.VwOPDReceiptPatientDoctorHospital = p;
                },
              /* error path */ e => console.log(e),
              /* onComplete */ () => {
                  this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'})

                  this.localService
                  .getall(this.memberID,this.CurrentLoginYear,this.hospitalID)
                  .subscribe(
                    /* happy path */ p => this.VwOPDReceiptPatientDoctorHospital= p,
                    /* error path */ e => console.log( e),
                    /* onComplete */ () => console.log('done getDisplayAll2' + JSON.stringify(this.VwOPDReceiptPatientDoctorHospital)));

               }
              );
        }
         
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'});
        this.clear();
  }




    
    

  ngOnInit() { 

      let departmenttype:string="departmenttype";
      let policytype:string="policytype";
      
      this.clear();
      
      // this.userform = this.fb.group({'OPDReceiptNos':new FormControl('', Validators. required),'OPDReceiptDate':new FormControl('', Validators. required),'IPDIdOPDReceipt':new FormControl('', Validators. required),'DoctorIdOPDReceipt':new FormControl('', Validators. required),'OPDReceiptAmount':new FormControl('', Validators. required),'OPDReceiptSuffering':new FormControl('', Validators. required),'OPDReceiptAppointmentType':new FormControl('', Validators. required),'OPDReceiptFromDate':new FormControl('', Validators. required),'OPDReceiptToDate':new FormControl('', Validators. required),});
      this.userform = this.fb.group({'OPDReceiptDate':new FormControl('', Validators. required),'IPDIdOPDReceipt':new FormControl('', Validators. required),'DoctorIdOPDReceipt':new FormControl('', Validators. required),'OPDReceiptAmount':new FormControl('', Validators. required),'OPDReceiptSuffering':new FormControl('', Validators. required),'OPDReceiptAppointmentType':new FormControl('', Validators. required),'OPDReceiptFromDate':new FormControl('', Validators. required),'OPDReceiptToDate':new FormControl('', Validators. required),});
      
 

          this.localService.getipdmaster_HospitalIdIPDMasterdrp(this.hospitalID).subscribe(         
        /* happy path */ p => {
            this. drpipdoptions = p;
            this.drpipdoptions.unshift({label:"--Select Hospital--" , value:"1"} )
          },
         /* error path */ e => console.log( e),
         /* onComplete */ () => {console.log('done getDisplayAll2' + JSON.stringify(this.drpipdoptions))
                      this.localService.getDoctormaster_HospitalIdDoctorMasterdrp(this.hospitalID).subscribe(         
                      /* happy path */ p => {
                          this. drpdoctoroptions = p;
                          this.drpdoctoroptions.unshift({label:"--Select Doctor--" , value:"1"} )
                        },
                      /* error path */ e => console.log( e),
                      /* onComplete */ () => {console.log('done getDisplayAll2' + JSON.stringify(this.drpdoctoroptions))
                                          this.localService
                                          .getall(this.memberID,this.CurrentLoginYear,this.hospitalID)
                                          .subscribe(
                                            /* happy path */ p => this.VwOPDReceiptPatientDoctorHospital= p,
                                            /* error path */ e => console.log( e),
                                            /* onComplete */ () => console.log('done getDisplayAll2' + JSON.stringify(this.VwOPDReceiptPatientDoctorHospital)));
                          
                            
                          }
                      );
         
                  }
         );
        

         this.drpappointtypeoptions=[
           {
             label:"--Select Appointment Type--",
             value:"1"
           },
           {
             label:"Followup",
             value:"Followup"
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
         ] ;
 
          

         this.opdreceiptVar=new opdreceiptTS();
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
                  this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'})
                    
                  }
         );
 
    }

    doGetAmountDocChargesByDoctorId(event:any){
      let tempdocid=this.docselected.value;
      let tempapttype=this.opdreceiptVar.OPDReceiptAppointmentType;
      this.localService.getWS_GetAmountDocChargesByDoctorId(tempdocid,tempapttype).subscribe(         
        /* happy path */ p => {
            this.opdreceiptVar.OPDReceiptAmount=p;
             
          },
         /* error path */ e => console.log( e),
         /* onComplete */ () => {
           
            
         }
        );
    }


  printReceipt(reciptvw:VwOPDReceiptPatientDoctorHospitalTS){
      let id=reciptvw.OPDReceiptId;
      
      let resultofws:Reportresult;
      console.log("ReceiptID is "+id,reciptvw);
      this.localService.printreportforopdreceipt(id).subscribe(         
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

  gotoIPDNew(){
    this.router.navigate(['/ipdmaster']);
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

    aftercalldate(){
      this.OPDReceiptDate= new Date(Number(this.opdreceiptVar.OPDReceiptDate ));;
      this.OPDReceiptFromDate=new Date(Number(this.opdreceiptVar.OPDReceiptFromDate));
      this.OPDReceiptToDate=new Date(Number(this.opdreceiptVar.OPDReceiptToDate));
      
    }

    mysort(event:any) {
      let comparer = function (a:VwOPDReceiptPatientDoctorHospitalTS, b:VwOPDReceiptPatientDoctorHospitalTS): number {
        let date1=new Date(a.OPDReceiptDate);
        let date2=new Date(b.OPDReceiptDate);
        
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

      this.VwOPDReceiptPatientDoctorHospital.sort(comparer);
   }
 

  initContact() {
        // initialize our address
        // return this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        //return this.userform = this.fb.group({'CountryName':new FormControl('', Validators. required),'CountryAliasName':new FormControl('', Validators. required),});
        return this.userform = this.fb.group({'OPDReceiptDate':new FormControl('', Validators. required),'IPDIdOPDReceipt':new FormControl('', Validators. required),'DoctorIdOPDReceipt':new FormControl('', Validators. required),'OPDReceiptAmount':new FormControl('', Validators. required),'OPDReceiptSuffering':new FormControl('', Validators. required),'OPDReceiptAppointmentType':new FormControl('', Validators. required),'OPDReceiptFromDate':new FormControl('', Validators. required),'OPDReceiptToDate':new FormControl('', Validators. required),});

    }

  //Dropdown change event capture
  drpchange(events1: any){
    // alert(events1.value);
  }

  

  get diagnostic() { return JSON.stringify(this.userform.value); }
 }
