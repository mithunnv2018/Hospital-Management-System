import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router,Params } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {hsproomallotmentdetailsTS} from './roomallotment';
import {DataTableModule} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';
import { MyDateFormat } from '../shared/pipes/mydateformat.pipe';
import {MyTimeFormat} from '../shared/pipes/mytimeformat.pipe';
import { RoomallotmentService } from '../shared/roomallotment/index';
import { vwhsproomallotmentdetailsTS} from './vwhsproomallotmentdetailsTS';

import { Observable } from 'rxjs/Rx';
/**
 * This class represents the lazy loaded countryComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-roomallotment',
  templateUrl: 'roomallotment.component.html',
  styleUrls: ['roomallotment.component.css'],
  providers:[MyDateFormat,MyTimeFormat]
})
export class RoomallotmentComponent implements OnInit {
  
  userform: FormGroup;
  country_contacts:FormGroup;
  msgs: Message[]=[];
  vwhsproomallotmentdetails:  vwhsproomallotmentdetailsTS[]=[];

   submitted: boolean;
   submittedcontact:boolean;
   hsproomallotmentdetailsVar: hsproomallotmentdetailsTS;
   selectedRow:  vwhsproomallotmentdetailsTS;

   optRoomsId:SelectItem[]=[];
   ngModelRoomsId:string="";
   drpbedsnosoptions:SelectItem[]=[];
   drproomallotstatusoptions:SelectItem[]=[];

   newvwhsproomallotmentdetails: boolean;
   
   hospitalID:string="";
   CurrentLoginYear:string="";
   memberID:string="";


   
 
   
   HSPAdminId:string="";
   RoomAllotFromDate:Date;
   RoomAllotToDate:Date;
   RoomAllotRoundOff:boolean=false;

   newcontact: boolean;
      clear(){
            this.newvwhsproomallotmentdetails=true;
            this.hsproomallotmentdetailsVar=new hsproomallotmentdetailsTS();

            this.RoomAllotFromDate=null;         
            this.RoomAllotToDate=null;
      }

      
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private localService: RoomallotmentService,
              private mydate1: MyDateFormat,
              private mytime1:MyTimeFormat){
    
                
              // this.hospitalID="HSP1";  
              this.hospitalID=localStorage.getItem('hospitalID'); 
              this.CurrentLoginYear=localStorage.getItem('CurrentLoginYear');                
              this.memberID=localStorage.getItem('memberID');
  }
 
  onSubmit(){
      //   alert(JSON.stringify(this.selectedRow));

        if(this.RoomAllotRoundOff===true){
            this.hsproomallotmentdetailsVar.RoomAllotRoundOff="yes";
        }
        else if(this.RoomAllotRoundOff===false){
          this.hsproomallotmentdetailsVar.RoomAllotRoundOff="no";

        }
        let dt2=this.mydate1.parse(this.RoomAllotFromDate);
        let time2=this.mytime1.parse(this.RoomAllotFromDate);
        this.hsproomallotmentdetailsVar.RoomAllotFromDate=dt2+" "+time2;

        let dt3=this.mydate1.parse(this.RoomAllotToDate);
        let time3=this.mytime1.parse(this.RoomAllotToDate);
        this.hsproomallotmentdetailsVar.RoomAllotToDate=dt3+" "+time3;
        
        this.hsproomallotmentdetailsVar.MemberIdhsproomallotmentdetail=this.memberID;
        
           
         this.hsproomallotmentdetailsVar.HSPAdminIdhsproomallotmentdetails=this.HSPAdminId;

        this.submitted = true;
        this.msgs = [];
        console.log(JSON.stringify(this.hsproomallotmentdetailsVar));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        if(this.newvwhsproomallotmentdetails){
        
        this.localService
      .insert(JSON.stringify(this.hsproomallotmentdetailsVar))
      .subscribe(
         /* happy path */ p => this.vwhsproomallotmentdetails = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => {
                              this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'})
                                console.log("saved result=",this.vwhsproomallotmentdetails);
                                
                      }
         );
        }else{
      this.localService
      .update(JSON.stringify(this.hsproomallotmentdetailsVar))
      .subscribe(
         /* happy path */ p => this.vwhsproomallotmentdetails = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        } 
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'});
        this.clear();
  }
 

onRowSelectvwhsproomallotmentdetails(event: any){

this.newvwhsproomallotmentdetails=false;
 let tempvwhsproomallotmentdetails:vwhsproomallotmentdetailsTS;
 tempvwhsproomallotmentdetails=this.selectedRow;
this.ngModelRoomsId=tempvwhsproomallotmentdetails.RoomsIdBeds;

//this.ngModelRoomAllotId= tempvwhsproomallotmentdetails.RoomAllotId;

this.localService.edit(tempvwhsproomallotmentdetails.RoomAllotId).subscribe(
p => this.hsproomallotmentdetailsVar=p,
 e => console.log( e), 
 () => {
   this.aftercalldate();
   let bedid=tempvwhsproomallotmentdetails.BedsId;
   this.localService.getbedsdrp(this.ngModelRoomsId).subscribe
                  (p =>{this.drpbedsnosoptions=p;
                  this.drpbedsnosoptions.unshift({label:"--Select Beds--" , value:"1"} )},
                  e => console.log(e),
                  () =>{
                      this.hsproomallotmentdetailsVar.BedsIdhsproomallotmentdetails= bedid;
                  });
    this.populateRoundOff();              
  }
 );
 
}

populatebeds($event: any){
   // this.ngModelMaincatId=events1.value;

    this.localService.getbedsdrp(this.ngModelRoomsId).subscribe
    (p =>{this.drpbedsnosoptions=p;
    this.drpbedsnosoptions.unshift({label:"--Select Beds--" , value:"1"} )},
    e => console.log(e),
    () =>console.log("drpbedsnosoptions==>",this.drpbedsnosoptions));

}

populateRoundOff(){
        if(this.hsproomallotmentdetailsVar.RoomAllotRoundOff==="yes"){
            this.RoomAllotRoundOff=true;
        }
        else if(this.hsproomallotmentdetailsVar.RoomAllotRoundOff==="no"){
          this.RoomAllotRoundOff=false;

        }
}

loadamount($event:any){
    let a=this.hsproomallotmentdetailsVar.BedsIdhsproomallotmentdetails;

    this.localService.getWS_GetAmountBedsByBedsId(a,this.HSPAdminId).subscribe
    (p =>{this.hsproomallotmentdetailsVar.RoomAllotCharges=p;
        },
    e => console.log(e),
    () =>console.log("amount==>"+this.hsproomallotmentdetailsVar.RoomAllotCharges));
}


  aftercalldate(){
    
    this.RoomAllotFromDate  = new Date(Number(this.hsproomallotmentdetailsVar.RoomAllotFromDate ));
    this.RoomAllotToDate  = new Date(Number(this.hsproomallotmentdetailsVar.RoomAllotToDate ));
    
    
  }
 
  ngOnInit() { 

      this.clear();
      
      this.route.params.forEach((params: Params) => {
                this.HSPAdminId= params["billid"];

              });

  

        // this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        this.userform = this.fb.group({'BedsIdhsproomallotmentdetails':new FormControl('', Validators. required),'RoomAllotFromDate':new FormControl('', Validators. required),'RoomAllotToDate':new FormControl('', Validators. required),'RoomAllotCharges':new FormControl('', Validators. required),'RoomAllotStatus':new FormControl('', Validators. required),'RoomAllotRoundOff':new FormControl('', Validators. required),});


     
        this.localService.getroomsdrp(this.hospitalID).subscribe(         
        /* happy path */ p => {
              this.optRoomsId = p;
              this.optRoomsId.unshift({label:"--Select Room--" , value:"1"} )  
            },
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done optRoomsId' + JSON.stringify(this.optRoomsId))
         );

         this.localService.getall(this.HSPAdminId).subscribe(         
        /* happy path */ p => {
              this.vwhsproomallotmentdetails = p;
              
            },
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done vwhsproomallotmentdetails' + JSON.stringify(this.vwhsproomallotmentdetails))
         );
         
         this.drproomallotstatusoptions=[
           {
             label:"--Select Allotment--",
             value:"1"
           },
           {
             label:"Occupied",
             value:"occupied"
           },
           {
             label:"Vacant",
             value:"vacant"
           }
         ]
         this.hsproomallotmentdetailsVar=new hsproomallotmentdetailsTS();
  }

  
 

  initContact() {
        // initialize our address
        // return this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        return this.userform = this.fb.group({'BedsIdhsproomallotmentdetails':new FormControl('', Validators. required),'RoomAllotFromDate':new FormControl('', Validators. required),'RoomAllotToDate':new FormControl('', Validators. required),'RoomAllotCharges':new FormControl('', Validators. required),'RoomAllotStatus':new FormControl('', Validators. required),'RoomAllotRoundOff':new FormControl('', Validators. required),});



    }

  //Dropdown change event capture
  drpchange(events1: any){
    // alert(events1.value);
  }

  get diagnostic() { return JSON.stringify(this.userform.value); }
 }
