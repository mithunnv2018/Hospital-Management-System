import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router,Params } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {hspipdbillingheadsdetailsTS} from './hspipdheads';
import {DataTableModule} from 'primeng/primeng';
import {SelectItem,ConfirmationService} from 'primeng/primeng';
import { MyDateFormat } from '../shared/pipes/mydateformat.pipe';
import {MyTimeFormat} from '../shared/pipes/mytimeformat.pipe';
import { HspipdheadsService } from '../shared/hspipdheads/index';
import { vwhspipdbillingheadsdetailsTS} from './vwhspipdbillingheadsdetailsTS';

import { Observable } from 'rxjs/Rx';
/**
 * This class represents the lazy loaded countryComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-hspipdheads',
  templateUrl: 'hspipdheads.component.html',
  styleUrls: ['hspipdheads.component.css'],
  providers:[MyDateFormat,MyTimeFormat,ConfirmationService]
})
export class HspipdheadsComponent implements OnInit {
  
  userform: FormGroup;
  country_contacts:FormGroup;
  msgs: Message[]=[];
  vwhspipdbillingheadsdetails:  vwhspipdbillingheadsdetailsTS[]=[];

   submitted: boolean;
   submittedcontact:boolean;
   hspipdbillingheadsdetailsVar: hspipdbillingheadsdetailsTS;
   selectedRow:  vwhspipdbillingheadsdetailsTS;

   drpbillingheadsoptions:SelectItem[]=[];

   newvwhspipdbillingheadsdetailsTS: boolean;
   
   hospitalID:string="";
   CurrentLoginYear:string="";
   memberID:string="";

   ipdselected:SelectItem;
   ipdresults:SelectItem[]=[];    

   HSPAdminDate:Date;
   HSPAdmintime:Date;
   HSPAdminId:string="";
   IPDBillingHeadsDetailsDate:Date;


   newcontact: boolean;
      clear(){
            this.newvwhspipdbillingheadsdetailsTS=true;
            this.hspipdbillingheadsdetailsVar=new hspipdbillingheadsdetailsTS();

            this.IPDBillingHeadsDetailsDate=null;         
      }

      
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private localService: HspipdheadsService,
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

        this.hspipdbillingheadsdetailsVar.IPDBillingHeadsDetailsDate=this.mydate1.parse(this.IPDBillingHeadsDetailsDate);
        
           
         this.hspipdbillingheadsdetailsVar.HSPAdminIdHSPIPDBillingHeadsDetails=this.HSPAdminId;
         this.hspipdbillingheadsdetailsVar.MemberIdHSPIPDBillingHeadsDetails=this.memberID;


        this.submitted = true;
        this.msgs = [];
        console.log(JSON.stringify(this.hspipdbillingheadsdetailsVar));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        if(this.newvwhspipdbillingheadsdetailsTS){
        
        this.localService
      .insert(JSON.stringify(this.hspipdbillingheadsdetailsVar))
      .subscribe(
         /* happy path */ p => this.vwhspipdbillingheadsdetails = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => {
                              this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'})
                                console.log("saved result=",this.vwhspipdbillingheadsdetails);
                                
                      }
         );
        }
        else
        {
          this.localService
            .update(JSON.stringify(this.hspipdbillingheadsdetailsVar))
            .subscribe(
              /* happy path */ p => this.vwhspipdbillingheadsdetails = p,
              /* error path */ e => console.log(e),
              /* onComplete */ () => {
                                    this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'})
                                      console.log("saved result=",this.vwhspipdbillingheadsdetails);
                                
                      }
         );

        } 
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'});
        this.clear();
  }

loadamount($event:any){
    let a=this.hspipdbillingheadsdetailsVar.IPDBillingHeadsIdHSPIPDBillingHeadsDetails;

    this.localService.getWS_GetAmountIPDBillingHeadsByIPDBillingHeadsId(a,this.HSPAdminId).subscribe
    (p =>{this.hspipdbillingheadsdetailsVar.IPDBillingHeadsDetailsAmount=p;
        },
    e => console.log(e),
    () =>console.log("amount==>"+this.hspipdbillingheadsdetailsVar.IPDBillingHeadsDetailsAmount));
}

onRowSelectvwhspipdbillingheadsdetails(event: any){

this.newvwhspipdbillingheadsdetailsTS=false;
 let tempvwhspipdbillingheadsdetails:vwhspipdbillingheadsdetailsTS;
 tempvwhspipdbillingheadsdetails=this.selectedRow;

//this.ngModelDailyChargesDetailsId= tempvwhspdailychargesdetails.DailyChargesDetailsId;

this.localService.edit(tempvwhspipdbillingheadsdetails.IPDBillingHeadsDetailsId).subscribe(
p => this.hspipdbillingheadsdetailsVar=p,
 e => console.log( e), 
 () => this.aftercalldate() );

}

  aftercalldate(){
    
    this.IPDBillingHeadsDetailsDate  = new Date(Number(this.hspipdbillingheadsdetailsVar.IPDBillingHeadsDetailsDate ));
    
    
    
  }


  deleteSubmitParticularsRow(cont: vwhspipdbillingheadsdetailsTS) {
      
        this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {

                let selectedkeywordgridRow:vwhspipdbillingheadsdetailsTS=cont;

                this.localService.deleteWS_hspipdbillingheadsdetails_delete(selectedkeywordgridRow.IPDBillingHeadsDetailsId).subscribe(         
                /* happy path */ p => {
                    },
                /* error path */ e => console.log( e),
                /* onComplete */ () => console.log('done deleting')
                );
          
                
                this.vwhspipdbillingheadsdetails.splice(this.findSelectedKeywordSubcatIndex(selectedkeywordgridRow), 1);
                cont = null;
            }
        });


        // this.selectedkeywordgridRow=null;
        
        // this.clearKeywordSubcat();
        
  }

  findSelectedKeywordSubcatIndex(p:vwhspipdbillingheadsdetailsTS): number {
        return this.vwhspipdbillingheadsdetails.indexOf(p);
  }  


 
  ngOnInit() { 

      this.clear();
      
      this.route.params.forEach((params: Params) => {
                this.HSPAdminId= params["billid"];

              });

  

        // this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        this.userform = this.fb.group({'IPDBillingHeadsIdHSPIPDBillingHeadsDetails':new FormControl('', Validators. required),'IPDBillingHeadsDetailsDate':new FormControl('', Validators. required),'IPDBillingHeadsDetailsAmount':new FormControl('', Validators. required),});


     
        this.localService.getipdbillingheads_HospitalIdIPDBillingHeadsdrp(this.hospitalID).subscribe(         
        /* happy path */ p => {
              this.drpbillingheadsoptions = p;
              this.drpbillingheadsoptions.unshift({label:"--Select Billing Heads--" , value:"1"} )  
            },
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done drpbillingheadsoptions' + JSON.stringify(this.drpbillingheadsoptions))
         );

         this.localService.getall(this.HSPAdminId).subscribe(         
        /* happy path */ p => {
              this.vwhspipdbillingheadsdetails = p;
              
            },
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done vwhspipdbillingheadsdetails' + JSON.stringify(this.vwhspipdbillingheadsdetails))
         );


         this.hspipdbillingheadsdetailsVar=new hspipdbillingheadsdetailsTS();
  }

  
 

  initContact() {
        // initialize our address
        // return this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        return this.userform = this.fb.group({'IPDBillingHeadsIdHSPIPDBillingHeadsDetails':new FormControl('', Validators. required),'IPDBillingHeadsDetailsDate':new FormControl('', Validators. required),'IPDBillingHeadsDetailsAmount':new FormControl('', Validators. required),});

    }

  //Dropdown change event capture
  drpchange(events1: any){
    // alert(events1.value);
  }

  get diagnostic() { return JSON.stringify(this.userform.value); }
 }
