import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {hspreceiptpaymentdetailsTS} from './ipdreceipt';

import {DataTableModule} from 'primeng/primeng';
import {SelectItem,ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import { MyDateFormat } from '../shared/pipes/mydateformat.pipe';
import {MyTimeFormat} from '../shared/pipes/mytimeformat.pipe';
import { IpdreceiptcancelService } from '../shared/ipdreceiptcancel/index';
import {BaseUrlService} from '../shared/baseurl/baseurl.service';
import {FileUpload} from './fileupload';

import { Observable } from 'rxjs/Rx';
/**
 * This class represents the lazy loaded countryComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-ipdreceiptcancel',
  templateUrl: 'ipdreceiptcancel.component.html',
  styleUrls: ['ipdreceiptcancel.component.css'],
  providers:[MyDateFormat,MyTimeFormat,BaseUrlService,ConfirmationService]
})
export class IpdreceiptcancelComponent implements OnInit {
  
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
 
   hspreceiptpaymentdetails:hspreceiptpaymentdetailsTS[]=[];

   mybaseurl:string="";
   
   newcontact: boolean;

   fromdate:Date;
   todate:Date;

  //  newipdpapers:boolean=false;


      clear(){

            this.fromdate=null;
            this.todate=null;

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
              private localService: IpdreceiptcancelService,
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
        
        this.localService
      .getWS_hspreceiptpaymentdetails_bydate_selectjson(strfromdate,strtodate)
      .subscribe(
         /* happy path */ p => this.hspreceiptpaymentdetails = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => {
                              
                                console.log("grid result=",this.hspreceiptpaymentdetails);
                                
                      }
         );
        
        this.submitted = true;
        // this.msgs = [];
        // this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'});
        // this.clear();
  }
  
    
  deleteSubmitParticularsRow(cont:hspreceiptpaymentdetailsTS){

     this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {
            let id=cont.RCPPayId;  
            this.localService
          .getWS_hspreceiptpaymentdetails_cancel(id)
          .subscribe(
            /* happy path */ p => console.log("done delete"),
            /* error path */ e => console.log(e),
            /* onComplete */ () => {
                                    console.log("done delete");
                          }
            );


            let selectedkeywordgridRow:hspreceiptpaymentdetailsTS=cont;
            this.hspreceiptpaymentdetails.splice(this.findSelectedKeywordSubcatIndex(selectedkeywordgridRow), 1);
            cont = null;


            this.msgs = [];
            this.msgs.push({severity:'info', summary:'Confirmed', detail:'You have accepted'});
            }
        });
 

  }
  findSelectedKeywordSubcatIndex(p:hspreceiptpaymentdetailsTS): number {
        return this.hspreceiptpaymentdetails.indexOf(p);
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
