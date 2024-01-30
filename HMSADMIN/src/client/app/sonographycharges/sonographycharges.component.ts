import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router,Params } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {hspsonographyheadsdetailsTS} from './sonographycharges';
import {DataTableModule} from 'primeng/primeng';
import {SelectItem,ConfirmationService} from 'primeng/primeng';
import { MyDateFormat } from '../shared/pipes/mydateformat.pipe';
import {MyTimeFormat} from '../shared/pipes/mytimeformat.pipe';
import { SonographychargesService } from '../shared/sonographycharges/index';
import { vwhspsonographyheadsdetailsTS} from './vwhspsonographyheadsdetailsTS';

import { Observable } from 'rxjs/Rx';
/**
 * This class represents the lazy loaded countryComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-sonographycharges',
  templateUrl: 'sonographycharges.component.html',
  styleUrls: ['sonographycharges.component.css'],
  providers:[MyDateFormat,MyTimeFormat,ConfirmationService]
})
export class SonographychargesComponent implements OnInit {
  
  userform: FormGroup;
  country_contacts:FormGroup;
  msgs: Message[]=[];
  vwhspsonographyheadsdetails:  vwhspsonographyheadsdetailsTS[]=[];

   submitted: boolean;
   submittedcontact:boolean;
   hspsonographyheadsdetailsVar: hspsonographyheadsdetailsTS;
   selectedRow:  vwhspsonographyheadsdetailsTS;

   drpsonographyoptions:SelectItem[]=[];

   newvwhspsonographyheadsdetails: boolean;
   
   hospitalID:string="";
   CurrentLoginYear:string="";
   memberID:string="";

   ipdselected:SelectItem;
   ipdresults:SelectItem[]=[];    

   
   HSPAdminId:string="";
   SonographyHeadsDetDate:Date;


   newcontact: boolean;
      clear(){
            this.newvwhspsonographyheadsdetails=true;
            this.hspsonographyheadsdetailsVar=new hspsonographyheadsdetailsTS();

            this.SonographyHeadsDetDate=null;         
      }

      
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private localService: SonographychargesService,
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

        this.hspsonographyheadsdetailsVar.SonographyHeadsDetDate=this.mydate1.parse(this.SonographyHeadsDetDate);
        this.hspsonographyheadsdetailsVar.MemberIdhspsonographyheadsdetails=this.memberID;
        
           
         this.hspsonographyheadsdetailsVar.HSPAdminIdhspsonographyheadsdetails=this.HSPAdminId;

        this.submitted = true;
        this.msgs = [];
        console.log(JSON.stringify(this.hspsonographyheadsdetailsVar));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        if(this.newvwhspsonographyheadsdetails){
        
        this.localService
      .insert(JSON.stringify(this.hspsonographyheadsdetailsVar))
      .subscribe(
         /* happy path */ p => this.vwhspsonographyheadsdetails = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => {
                              this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'})
                                console.log("saved result=",this.vwhspsonographyheadsdetails);
                                
                      }
         );
        }
        else{
          this.localService
          .update(JSON.stringify(this.hspsonographyheadsdetailsVar))
          .subscribe(
              /* happy path */ p => this.vwhspsonographyheadsdetails = p,
              /* error path */ e => console.log(e),
              /* onComplete */ () => {
                                  this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'})
                                    console.log("saved result=",this.vwhspsonographyheadsdetails);
                                    
                          }
          );
        } 
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'});
        this.clear();
  }

  loadamount($event:any){
    let a=this.hspsonographyheadsdetailsVar.SonographyHeadsIdhspsonographyheadsdetails;

    this.localService.getWS_GetAmountSonographyHeadsBySonographyHeadsId(a,this.HSPAdminId).subscribe
    (p =>{this.hspsonographyheadsdetailsVar.SonographyHeadsDetAmount=p;
        },
    e => console.log(e),
    () =>console.log("amount==>"+this.hspsonographyheadsdetailsVar.SonographyHeadsDetAmount));
}

onRowSelectvwhspsonographyheadsdetails(event: any){

this.newvwhspsonographyheadsdetails=false;
 let tempvwhspsonographyheadsdetails:vwhspsonographyheadsdetailsTS;
 tempvwhspsonographyheadsdetails=this.selectedRow;

//this.ngModelDailyChargesDetailsId= tempvwhspdailychargesdetails.DailyChargesDetailsId;

this.localService.edit(tempvwhspsonographyheadsdetails.SonographyHeadsDetId).subscribe(
p => this.hspsonographyheadsdetailsVar=p,
 e => console.log( e), 
 () => this.aftercalldate() );

}

  aftercalldate(){
    
    this.SonographyHeadsDetDate  = new Date(Number(this.hspsonographyheadsdetailsVar.SonographyHeadsDetDate ));
    
  }

  deleteSubmitParticularsRow(cont: vwhspsonographyheadsdetailsTS) {
      
      this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'fa fa-trash',
        accept: () => {

        let selectedkeywordgridRow:vwhspsonographyheadsdetailsTS=cont;

        this.localService.deleteWS_vwhspsonographyheadsdetails_delete(selectedkeywordgridRow.SonographyHeadsDetId).subscribe(         
        /* happy path */ p => {
             },
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done deleting')
         );
  
        
        this.vwhspsonographyheadsdetails.splice(this.findSelectedKeywordSubcatIndex(selectedkeywordgridRow), 1);
        cont = null;

      }
    });
     

        // this.selectedkeywordgridRow=null;
        
        // this.clearKeywordSubcat();
        
  }

  findSelectedKeywordSubcatIndex(p:vwhspsonographyheadsdetailsTS): number {
        return this.vwhspsonographyheadsdetails.indexOf(p);
  }  


 
  ngOnInit() { 

      this.clear();
      
      this.route.params.forEach((params: Params) => {
                this.HSPAdminId= params["billid"];

              });

  

        // this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        this.userform = this.fb.group({'SonographyHeadsDetDate':new FormControl('', Validators. required),'SonographyHeadsDetAmount':new FormControl('', Validators. required),'SonographyHeadsIdhspsonographyheadsdetails':new FormControl('', Validators. required),});


     
        this.localService.getsonographyheads_HospitalIdSonographyHeadsdrp(this.hospitalID).subscribe(         
        /* happy path */ p => {
              this.drpsonographyoptions = p;
              this.drpsonographyoptions.unshift({label:"--Select Sonography Heads--" , value:"1"} )  
            },
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done drpsonographyoptions' + JSON.stringify(this.drpsonographyoptions))
         );

         this.localService.getall(this.HSPAdminId).subscribe(         
        /* happy path */ p => {
              this.vwhspsonographyheadsdetails = p;
              
            },
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done vwhspsonographyheadsdetails' + JSON.stringify(this.vwhspsonographyheadsdetails))
         );


         this.hspsonographyheadsdetailsVar=new hspsonographyheadsdetailsTS();
  }

  
 

  initContact() {
        // initialize our address
        // return this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        return this.userform = this.fb.group({'SonographyHeadsDetDate':new FormControl('', Validators. required),'SonographyHeadsDetAmount':new FormControl('', Validators. required),'SonographyHeadsIdhspsonographyheadsdetails':new FormControl('', Validators. required),});

    }

  //Dropdown change event capture
  drpchange(events1: any){
    // alert(events1.value);
  }

  get diagnostic() { return JSON.stringify(this.userform.value); }
 }
