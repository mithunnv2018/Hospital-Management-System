import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
// import {hspreceiptpaymentdetailsTS} from './ipdreceipt';

import {DataTableModule} from 'primeng/primeng';
import {SelectItem,ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import { MyDateFormat } from '../shared/pipes/mydateformat.pipe';
import {MyTimeFormat} from '../shared/pipes/mytimeformat.pipe';
import { IpddoctorchargesdetailsreportService } from '../shared/ipddoctorchargesdetailsreport/index';
import {BaseUrlService} from '../shared/baseurl/baseurl.service';
import {HospitalizationService} from '../shared/hospitalization/hospitalization.service';

import { Observable } from 'rxjs/Rx';
import {Reportresult} from '../shared/baseurl/reportresult';

/**
 * This class represents the lazy loaded countryComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-ipddoctorchargesdetailsreport',
  templateUrl: 'ipddoctorchargesdetailsreport.component.html',
  styleUrls: ['ipddoctorchargesdetailsreport.component.css'],
  providers:[MyDateFormat,MyTimeFormat,BaseUrlService,ConfirmationService]
})
export class IpddoctorchargesdetailsreportComponent implements OnInit {
  
  userform: FormGroup;
  country_contacts:FormGroup;
  msgs: Message[]=[];
 
   submitted: boolean;
   submittedcontact:boolean;
  //  ipdpapersVar: ipdpapersTS;
  //  selectedRow:  vwhospitalizationipdpackagetrustcategorydiseasedetailsTS;


  
   categorytype:string="";
   hospitalID:string="";
   CurrentLoginYear:string="";
   memberID:string="";
 
  //  hspreceiptpaymentdetails:hspreceiptpaymentdetailsTS[]=[];

   mybaseurl:string="";

   docselected:SelectItem;
   docresults:SelectItem[]=[];   
   
   newcontact: boolean;

   fromdate:Date;
   todate:Date;


  //  newipdpapers:boolean=false;


      clear(){

            this.fromdate=null;
            this.todate=null;
            this.docselected=null;

            // this.newipdpapers=true;
            // this.ipdpapersVar=new ipdpapersTS();

            // this.ipdpapersVar.PackageIdHospitalization="1";
            // this.ipdpapersVar.TrustIdHospitalization="1";
            

    
            // this.drphospitalizationoptions=[];

            // this.ipdselected=null;

      }

      
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private localService: IpddoctorchargesdetailsreportService,
              private localHospitalizationService: HospitalizationService ,
              private mydate1: MyDateFormat,
              private mytime1:MyTimeFormat,
              private baseUrlservice:BaseUrlService,
              private confirmationService:ConfirmationService){
    
              //this.categorytype="hospitalizationtype";  
              // this.hospitalID="HSP1";  
              this.hospitalID=localStorage.getItem('hospitalID'); 
              this.CurrentLoginYear=localStorage.getItem('CurrentLoginYear');                
              this.memberID=localStorage.getItem('memberID');
              this.mybaseurl=baseUrlservice.getBaseurl();     
  }
 
 
  onSubmit(){
      //   alert(JSON.stringify(this.selectedRow));

        // this.ipdpapersVar.HSPAdminStatus="A";

        //  this.ipdpapersVar.IPDIdHospitalization=this.ipdselected.value;
        let strfromdate=this.mydate1.parse(this.fromdate);
        let strtodate=this.mydate1.parse(this.todate);

        

        this.submitted = true;
        this.msgs = [];
        this.printReceipt();
         
        this.submitted = true;
        // this.msgs = [];
        // this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'});
        // this.clear();
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
    
    printReceipt(){
      

      let strfromdate=this.mydate1.parse(this.fromdate);
      let strtodate=this.mydate1.parse(this.todate);
      let tempdoctorid=this.docselected.value;

      let resultofws:Reportresult;
      
      this.localService.printreportforipddoctorchargesdetails(this.hospitalID,strfromdate,strtodate,tempdoctorid).subscribe(         
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
  

  ngOnInit() { 

      this.clear();
      
  

        // this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        // this.userform = this.fb.group({'HSPAdminDate':new FormControl('', Validators. required),'HSPAdmintime':new FormControl('', Validators. required),'IPDIdHospitalization':new FormControl('', Validators. required),'CategoryIdHospitalizationDepartment':new FormControl('', Validators. required),'DiseaseIdHospitalization':new FormControl('', Validators. required),});
        // this.userform = this.fb.group({'HSPAdminDate':new FormControl('', Validators. required),'HSPAdmintime':new FormControl('', Validators. required),'HSPAdminStatus':new FormControl('', Validators. required),'IPDIdHospitalization':new FormControl('', Validators. required),'CategoryIdHospitalizationDepartment':new FormControl('', Validators. required),'DiseaseIdHospitalization':new FormControl('', Validators. required),});

     
       
                  //this.ipdpapersVar=new hospitalizationTS();
  }


  gotoIPDNew(){
    this.router.navigate(['/ipdmaster']);
  }
    
  
 

  initContact() {
        // initialize our address
        // return this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        // return this.userform = this.fb.group({'HSPAdminDate':new FormControl('', Validators. required),'HSPAdmintime':new FormControl('', Validators. required),'HSPAdminStatus':new FormControl('', Validators. required),'IPDIdHospitalization':new FormControl('', Validators. required),'CategoryIdHospitalizationDepartment':new FormControl('', Validators. required),'DiseaseIdHospitalization':new FormControl('', Validators. required),});

    }

  //Dropdown change event capture
  drpchange(events1: any){
    // alert(events1.value);
  }

  get diagnostic() { return JSON.stringify(this.userform.value); }
 }
