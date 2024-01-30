import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router,Params } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {hspreceiptpaymentdetailsTS} from './ipdreceipt';
import {DataTableModule} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';
import { MyDateFormat } from '../shared/pipes/mydateformat.pipe';
import {MyTimeFormat} from '../shared/pipes/mytimeformat.pipe';
import { IpdreceiptService } from '../shared/ipdreceipt/index';
import { vwhspreceiptpaymentdetailsTS} from './vwhspreceiptpaymentdetailsTS';
import { vwhospitalizationipdpackagetrustcategorydiseasedetailsTS } from '../hospitalization/vwhospitalizationipdpackagetrustcategorydiseasedetailsTS';
import { Reportresult } from '../shared/baseurl/reportresult';

import { Observable } from 'rxjs/Rx';
/**
 * This class represents the lazy loaded countryComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-ipdreceipt',
  templateUrl: 'ipdreceipt.component.html',
  styleUrls: ['ipdreceipt.component.css'],
  providers:[MyDateFormat,MyTimeFormat]
})
export class IpdreceiptComponent implements OnInit {
  
  userform: FormGroup;
  country_contacts:FormGroup;
  msgs: Message[]=[];
  vwhspreceiptpaymentdetails:  vwhspreceiptpaymentdetailsTS[]=[];

   submitted: boolean;
   submittedcontact:boolean;
   hspreceiptpaymentdetailsVar: hspreceiptpaymentdetailsTS;
   selectedRow:  vwhspreceiptpaymentdetailsTS;

   drppymntypeptions:SelectItem[]=[];
   
   newvwhspreceiptpaymentdetails: boolean;
   
   hospitalID:string="";
   CurrentLoginYear:string="";
   memberID:string="";


   HSPAdminId:string="";
   RCPPayDate:Date;

   paytype:string="";
   amountOutstanding:string="";
   vwhospitalization:vwhospitalizationipdpackagetrustcategorydiseasedetailsTS;
   HSPAdminStatus:string="";

   newcontact: boolean;
      clear(){
            this.newvwhspreceiptpaymentdetails=true;
            this.hspreceiptpaymentdetailsVar=new hspreceiptpaymentdetailsTS();

            this.RCPPayDate=null;         
            
      }

      
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private localService: IpdreceiptService,
              private mydate1: MyDateFormat,
              private mytime1:MyTimeFormat){
    
                
              // this.hospitalID="HSP1";  
              this.hospitalID=localStorage.getItem('hospitalID'); 
              this.CurrentLoginYear=localStorage.getItem('CurrentLoginYear');                
              this.memberID=localStorage.getItem('memberID');
  }
  loadotherfields(){
    let temp=this.vwhospitalization.HSPAdminStatus;
    this.HSPAdminStatus=temp;
    if(temp==="A"){
      this.HSPAdminStatus="Admitted";
    }
  }
 
  onSubmit(){
      //   alert(JSON.stringify(this.selectedRow));
 
        this.hspreceiptpaymentdetailsVar.RCPPayDate=this.mydate1.parse(this.RCPPayDate);
        
        this.hspreceiptpaymentdetailsVar.MemberIdhspreceiptpaymentdetails=this.memberID;
        
           
        this.hspreceiptpaymentdetailsVar.HSPAdminIdhspreceiptpaymentdetails=this.HSPAdminId;
        this.hspreceiptpaymentdetailsVar.RCPPayType=this.paytype;//"Advance";
        this.hspreceiptpaymentdetailsVar.RCPPayStatus="active";

        this.submitted = true;
        this.msgs = [];
        console.log(JSON.stringify(this.hspreceiptpaymentdetailsVar));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        if(this.newvwhspreceiptpaymentdetails){
          
        this.localService
      .insert(JSON.stringify(this.hspreceiptpaymentdetailsVar))
      .subscribe(
         /* happy path */ p => {
          //  this.vwhspreceiptpaymentdetails = p
           let temp=p;
           this.printReceipt(temp);
         },
         /* error path */ e => console.log(e),
         /* onComplete */ () => {
                              this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'})
                                console.log("saved result=",this.vwhspreceiptpaymentdetails);
                                
                                this.localService.get_WS_sumtotal_adminfees(this.HSPAdminId).subscribe(         
                                        /* happy path */ p => {
                                              this.amountOutstanding = p;
                                              
                                            },
                                        /* error path */ e => console.log( e),
                                        /* onComplete */ () => {
                                          console.log('done ' );
                                          this.localService.getall(this.HSPAdminId).subscribe(         
                                            /* happy path */ p => {
                                                  this.vwhspreceiptpaymentdetails = p;
                                                  
                                                },
                                            /* error path */ e => console.log( e),
                                            /* onComplete */ () => console.log('done vwhspreceiptpaymentdetails' + JSON.stringify(this.vwhspreceiptpaymentdetails))
                                          );
                                        }
                                        );

                      }
         );
        } 
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'});
        this.clear();
  }
 

  printReceipt(reciptvw:vwhspreceiptpaymentdetailsTS){
      let id=reciptvw.RCPPayId;
      
      let resultofws:Reportresult;
      console.log("ReceiptID is "+id,reciptvw);
      this.localService.printreportforipdreceipt(id).subscribe(         
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
 



  aftercalldate(){
    this.RCPPayDate  = new Date(Number(this.hspreceiptpaymentdetailsVar.RCPPayDate ));
    
  }
 
  ngOnInit() { 

      this.clear();
      
      this.route.params.forEach((params: Params) => {
                this.HSPAdminId= params["billid"];
                this.paytype=params["paytype"];  
              });

  

        // this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        this.userform = this.fb.group({'RCPPayDate':new FormControl('', Validators. required),'RCPPayAmount':new FormControl('', Validators. required),'RCPPayPaymentType':new FormControl('', Validators. required),'RCPPayRemarks':new FormControl('', Validators. required),});
        // this.userform = this.fb.group({'RCPPayDate':new FormControl('', Validators. required),'RCPPayAmount':new FormControl('', Validators. required),'RCPPayPaymentType':new FormControl('', Validators. required),'RCPPayType':new FormControl('', Validators. required),'RCPPayBankCashDetails':new FormControl('', Validators. required),'RCPPayRemarks':new FormControl('', Validators. required),'RCPPayStatus':new FormControl('', Validators. required),});

        this.localService.getWS_viewhospitalizationipd_selectedit(this.HSPAdminId).subscribe(         
        /* happy path */ p => {
              this.vwhospitalization = p;
              this.loadotherfields();
            },
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done vwhospitalization' + JSON.stringify(this.vwhospitalization))
         );
     
         this.localService.getall(this.HSPAdminId).subscribe(         
        /* happy path */ p => {
              this.vwhspreceiptpaymentdetails = p;
              
            },
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done vwhspreceiptpaymentdetails' + JSON.stringify(this.vwhspreceiptpaymentdetails))
         );

        this.localService.get_WS_sumtotal_adminfees(this.HSPAdminId).subscribe(         
        /* happy path */ p => {
              this.amountOutstanding = p;
              if(this.paytype==="Final"){
                  this.hspreceiptpaymentdetailsVar.RCPPayAmount=this.amountOutstanding;
              }
              
            },
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done ' )
         );

         this.drppymntypeptions=[
           {
             label:"--Select Payment Type--",
             value:"1"
           },
           {
             label:"Cash",
             value:"cash"
           },{
             label:"Cheque",
             value:"cheque"
           },{
             label:"RTGS",
             value:"rtgs"
           }
         ];

         this.hspreceiptpaymentdetailsVar=new hspreceiptpaymentdetailsTS();
  }

  
 

  initContact() {
        // initialize our address
        // return this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        return this.userform = this.fb.group({'RCPPayDate':new FormControl('', Validators. required),'RCPPayAmount':new FormControl('', Validators. required),'RCPPayPaymentType':new FormControl('', Validators. required),'RCPPayType':new FormControl('', Validators. required),'RCPPayBankCashDetails':new FormControl('', Validators. required),'RCPPayRemarks':new FormControl('', Validators. required),'RCPPayStatus':new FormControl('', Validators. required),});




    }

  //Dropdown change event capture
  drpchange(events1: any){
    // alert(events1.value);
  }

  get diagnostic() { return JSON.stringify(this.userform.value); }
 }
