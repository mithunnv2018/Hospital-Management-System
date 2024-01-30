import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router,Params } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {hspdailychargesdetailsTS} from './hspdailychargesdetails';
import {DataTableModule} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';
import { MyDateFormat } from '../shared/pipes/mydateformat.pipe';
import {MyTimeFormat} from '../shared/pipes/mytimeformat.pipe';
import { HspdailychargesdetailsService } from '../shared/hspdailychargesdetails/index';
import { vwhspdailychargesdetailsTS} from './vwhspdailychargesdetailsTS';

import { Observable } from 'rxjs/Rx';
/**
 * This class represents the lazy loaded countryComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-hspdailychargesdetails',
  templateUrl: 'hspdailychargesdetails.component.html',
  styleUrls: ['hspdailychargesdetails.component.css'],
  providers:[MyDateFormat,MyTimeFormat]
})
export class HspdailychargesdetailsComponent implements OnInit {
  
  userform: FormGroup;
  country_contacts:FormGroup;
  msgs: Message[]=[];
  vwhspdailychargesdetails:  vwhspdailychargesdetailsTS[]=[];

   submitted: boolean;
   submittedcontact:boolean;
   hspdailychargesdetailsVar: hspdailychargesdetailsTS;
   selectedRow:  vwhspdailychargesdetailsTS;

   drpbillingheadsoptions:SelectItem[]=[];

   newvwhspdailychargesdetails: boolean;
   
   hospitalID:string="";
   CurrentLoginYear:string="";
   memberID:string="";

   
 
   
   HSPAdminId:string="";
   DailyChargesDetailsFromDate:Date;
   DailyChargesDetailsToDate:Date;

   DailyChargesDetailsRoundOff:boolean=false;
   newcontact: boolean;
      clear(){
            this.newvwhspdailychargesdetails=true;
            this.hspdailychargesdetailsVar=new hspdailychargesdetailsTS();

            this.DailyChargesDetailsFromDate=null;         
            this.DailyChargesDetailsToDate=null;
      }

      
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private localService: HspdailychargesdetailsService,
              private mydate1: MyDateFormat,
              private mytime1:MyTimeFormat){
    
                
              // this.hospitalID="HSP1";  
              this.hospitalID=localStorage.getItem('hospitalID'); 
              this.CurrentLoginYear=localStorage.getItem('CurrentLoginYear');                
              this.memberID=localStorage.getItem('memberID');
  }
 
  onSubmit(){
      //   alert(JSON.stringify(this.selectedRow));

        if(this.DailyChargesDetailsRoundOff===true){
            this.hspdailychargesdetailsVar.DailyChargesDetailsRoundOff="yes";
        }
        else if(this.DailyChargesDetailsRoundOff===false){
          this.hspdailychargesdetailsVar.DailyChargesDetailsRoundOff="no";

        }

        let dt2=this.mydate1.parse(this.DailyChargesDetailsFromDate);
        let time2=this.mytime1.parse(this.DailyChargesDetailsFromDate);
        this.hspdailychargesdetailsVar.DailyChargesDetailsFromDate=dt2+" "+time2;


        let dt3=this.mydate1.parse(this.DailyChargesDetailsToDate);
        let time3=this.mytime1.parse(this.DailyChargesDetailsToDate);
        this.hspdailychargesdetailsVar.DailyChargesDetailsToDate=dt3+" "+time3;



        // this.hspdailychargesdetailsVar.DailyChargesDetailsFromDate=this.mydate1.parse(this.DailyChargesDetailsFromDate);
        // this.hspdailychargesdetailsVar.DailyChargesDetailsToDate=this.mydate1.parse(this.DailyChargesDetailsToDate);
        this.hspdailychargesdetailsVar.MemberIdhspdailychargesdetails=this.memberID;
        
           
         this.hspdailychargesdetailsVar.HSPAdminIdhspdailychargesdetails=this.HSPAdminId;

        this.submitted = true;
        this.msgs = [];
        console.log(JSON.stringify(this.hspdailychargesdetailsVar));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        if(this.newvwhspdailychargesdetails){
        
        this.localService
      .insert(JSON.stringify(this.hspdailychargesdetailsVar))
      .subscribe(
         /* happy path */ p => this.vwhspdailychargesdetails = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => {
                              this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'})
                                console.log("saved result=",this.vwhspdailychargesdetails);
                                
                      }
         );
        }else{
      this.localService
      .update(JSON.stringify(this.hspdailychargesdetailsVar))
      .subscribe(
         /* happy path */ p => this.vwhspdailychargesdetails = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        } 
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'});
        this.clear();
  }
 
 loadamount($event:any){
    let a=this.hspdailychargesdetailsVar.IPDBillingHeadsIdhspdailychargesdetails;

    this.localService.getWS_GetAmountIPDBillingHeadsByIPDBillingHeadsId(a,this.HSPAdminId).subscribe
    (p =>{this.hspdailychargesdetailsVar.DailyChargesDetailsAmount=p;
        },
    e => console.log(e),
    () =>console.log("amount==>"+this.hspdailychargesdetailsVar.DailyChargesDetailsAmount));
}


onRowSelectvwhspdailychargesdetails(event: any){

this.newvwhspdailychargesdetails=false;
 let tempvwhspdailychargesdetails:vwhspdailychargesdetailsTS;
 tempvwhspdailychargesdetails=this.selectedRow;

//this.ngModelDailyChargesDetailsId= tempvwhspdailychargesdetails.DailyChargesDetailsId;

this.localService.edit(tempvwhspdailychargesdetails.DailyChargesDetailsId).subscribe(
p => this.hspdailychargesdetailsVar=p,
 e => console.log( e), 
 () => this.aftercalldate() );

}


  aftercalldate(){
    
    this.DailyChargesDetailsFromDate  = new Date(Number(this.hspdailychargesdetailsVar.DailyChargesDetailsFromDate ));
    this.DailyChargesDetailsToDate  = new Date(Number(this.hspdailychargesdetailsVar.DailyChargesDetailsToDate ));
    
    
  }
 
  ngOnInit() { 

      this.clear();
      
      this.route.params.forEach((params: Params) => {
                this.HSPAdminId= params["billid"];

              });

  

        // this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        this.userform = this.fb.group({'IPDBillingHeadsIdhspdailychargesdetails':new FormControl('', Validators. required),'DailyChargesDetailsFromDate':new FormControl('', Validators. required),'DailyChargesDetailsToDate':new FormControl('', Validators. required),'DailyChargesDetailsAmount':new FormControl('', Validators. required),'DailyChargesDetailsRoundOff':new FormControl('', Validators. required),});

     
        this.localService.getipdbillingheads_HospitalIdIPDBillingHeadsdrp(this.hospitalID).subscribe(         
        /* happy path */ p => {
              this.drpbillingheadsoptions = p;
              this.drpbillingheadsoptions.unshift({label:"--Select IPD Bill--" , value:"1"} )  
            },
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done drpbillingheadsoptions' + JSON.stringify(this.drpbillingheadsoptions))
         );

         this.localService.getall(this.HSPAdminId).subscribe(         
        /* happy path */ p => {
              this.vwhspdailychargesdetails = p;
              
            },
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done vwhspdailychargesdetails' + JSON.stringify(this.vwhspdailychargesdetails))
         );
 
         this.hspdailychargesdetailsVar=new hspdailychargesdetailsTS();
  }

  
 

  initContact() {
        // initialize our address
        // return this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        return this.userform = this.fb.group({'IPDBillingHeadsIdhspdailychargesdetails':new FormControl('', Validators. required),'DailyChargesDetailsFromDate':new FormControl('', Validators. required),'DailyChargesDetailsToDate':new FormControl('', Validators. required),'DailyChargesDetailsAmount':new FormControl('', Validators. required),'DailyChargesDetailsRoundOff':new FormControl('', Validators. required),});


    }

  //Dropdown change event capture
  drpchange(events1: any){
    // alert(events1.value);
  }

  get diagnostic() { return JSON.stringify(this.userform.value); }
 }
