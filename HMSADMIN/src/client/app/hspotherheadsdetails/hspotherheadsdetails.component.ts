import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router,Params } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {hspotherheadsdetailsTS} from './hspotherheadsdetails';
import {DataTableModule} from 'primeng/primeng';
import {SelectItem,ConfirmationService} from 'primeng/primeng';
import { MyDateFormat } from '../shared/pipes/mydateformat.pipe';
import {MyTimeFormat} from '../shared/pipes/mytimeformat.pipe';
import { HspotherheadsdetailsService } from '../shared/hspotherheadsdetails/index';

import { Observable } from 'rxjs/Rx';
/**
 * This class represents the lazy loaded countryComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-hspotherheadsdetails',
  templateUrl: 'hspotherheadsdetails.component.html',
  styleUrls: ['hspotherheadsdetails.component.css'],
  providers:[MyDateFormat,MyTimeFormat,ConfirmationService]
})
export class HspotherheadsdetailsComponent implements OnInit {
  
  userform: FormGroup;
  country_contacts:FormGroup;
  msgs: Message[]=[];
  hspotherheadsdetails:  hspotherheadsdetailsTS[]=[];

   submitted: boolean;
   submittedcontact:boolean;
    hspotherheadsdetailsVar: hspotherheadsdetailsTS;
   selectedRow:  hspotherheadsdetailsTS;

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
   OtherHeadsDate:Date;


   newcontact: boolean;
      clear(){
            this.newvwhspipdbillingheadsdetailsTS=true;
            this. hspotherheadsdetailsVar=new hspotherheadsdetailsTS();

            this.OtherHeadsDate=null;         
      }

      
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private localService: HspotherheadsdetailsService,
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

        this. hspotherheadsdetailsVar.OtherHeadsDate=this.mydate1.parse(this.OtherHeadsDate);
        
           
         this. hspotherheadsdetailsVar.HSPAdminIdHSPOtherHeadsDetails=this.HSPAdminId;
         this. hspotherheadsdetailsVar.MemberIdHSPOtherHeadsDetails=this.HSPAdminId;
          
        this.submitted = true;
        this.msgs = [];
        console.log(JSON.stringify(this. hspotherheadsdetailsVar));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        if(this.newvwhspipdbillingheadsdetailsTS){
        
        this.localService
      .insert(JSON.stringify(this. hspotherheadsdetailsVar))
      .subscribe(
         /* happy path */ p => this.hspotherheadsdetails = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => {
                              this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'})
                                console.log("saved result=",this.hspotherheadsdetails);
                                
                      }
         );
        } 
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'});
        this.clear();
  }

  deleteSubmitParticularsRow(cont: hspotherheadsdetailsTS) {
      
      this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {

                let selectedkeywordgridRow:hspotherheadsdetailsTS=cont;

                this.localService.deleteWS_hspotherheadsdetails_delete(selectedkeywordgridRow.OtherHeadsId).subscribe(         
                /* happy path */ p => {
                    },
                /* error path */ e => console.log( e),
                /* onComplete */ () => console.log('done deleting')
                );
          
                
                this.hspotherheadsdetails.splice(this.findSelectedKeywordSubcatIndex(selectedkeywordgridRow), 1);
                cont = null;

            }
              
          });

        // this.selectedkeywordgridRow=null;
        
        // this.clearKeywordSubcat();
        
  }

  findSelectedKeywordSubcatIndex(p:hspotherheadsdetailsTS): number {
        return this.hspotherheadsdetails.indexOf(p);
  }  


 
  ngOnInit() { 

      this.clear();
      
      this.route.params.forEach((params: Params) => {
                this.HSPAdminId= params["billid"];

              });

  

        // this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        this.userform = this.fb.group({'OtherHeadsName':new FormControl('', Validators. required),'OtherHeadsDate':new FormControl('', Validators. required),'OtherHeadsAmount':new FormControl('', Validators. required),});

     
          this.localService.getall(this.HSPAdminId).subscribe(         
        /* happy path */ p => {
              this.hspotherheadsdetails = p;
              
            },
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done hspotherheadsdetails' + JSON.stringify(this.hspotherheadsdetails))
         );


         this. hspotherheadsdetailsVar=new hspotherheadsdetailsTS();
  }

  
 

  initContact() {
        // initialize our address
        // return this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        return this.userform = this.fb.group({'OtherHeadsName':new FormControl('', Validators. required),'OtherHeadsDate':new FormControl('', Validators. required),'OtherHeadsAmount':new FormControl('', Validators. required),});


    }

  //Dropdown change event capture
  drpchange(events1: any){
    // alert(events1.value);
  }

  get diagnostic() { return JSON.stringify(this.userform.value); }
 }
