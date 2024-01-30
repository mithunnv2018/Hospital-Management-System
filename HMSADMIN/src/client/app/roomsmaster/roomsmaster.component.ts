import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {roomsTS} from './roomsmaster';
import {DataTableModule} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';

import { RoomsMasterService } from '../shared/roomsmaster/index';
import {VwRoomsRoomTypeHospitalTS} from './VwRoomsRoomTypeHospitalTS';

import { Observable } from 'rxjs/Rx';
/**
 * This class represents the lazy loaded countryComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-roomsmaster',
  templateUrl: 'roomsmaster.component.html',
  styleUrls: ['roomsmaster.component.css']
})
export class RoomsMasterComponent implements OnInit {
  
  userform: FormGroup;
  country_contacts:FormGroup;
  msgs: Message[]=[];
  VwRoomsRoomTypeHospital: VwRoomsRoomTypeHospitalTS[]=[];

   submitted: boolean;
   submittedcontact:boolean;
   roomsVar: roomsTS;
   selectedRow: VwRoomsRoomTypeHospitalTS;

   drpcategorytypeoptions:SelectItem[]=[];      

   newVwRoomsRoomTypeHospital: boolean;
   categorytype:string="";
   hospitalID:string="";

   newcontact: boolean;
      clear(){
            this.newVwRoomsRoomTypeHospital=true;
            this.roomsVar=new roomsTS();
            
      }

      
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private localService: RoomsMasterService){
    
              this.categorytype="roomtype";  
              // this.hospitalID="HSP1";  
              this.hospitalID=localStorage.getItem('hospitalID'); 
  }
 
  onSubmit(){
      //   alert(JSON.stringify(this.selectedRow));
        this.roomsVar.HospitalIdRooms=this.hospitalID;

        this.submitted = true;
        this.msgs = [];
        console.log(JSON.stringify(this.roomsVar));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        if(this.newVwRoomsRoomTypeHospital){
        this.localService
      .insert(JSON.stringify(this.roomsVar))
      .subscribe(
         /* happy path */ p => this.VwRoomsRoomTypeHospital = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }else{
      this.localService
      .update(JSON.stringify(this.roomsVar))
      .subscribe(
         /* happy path */ p => this.VwRoomsRoomTypeHospital = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'});
        this.clear();
  }

  onRowSelectVwRoomsRoomTypeHospital(event: any){

    this.newVwRoomsRoomTypeHospital=false;
    let tempVwRoomsRoomTypeHospital:VwRoomsRoomTypeHospitalTS;
    tempVwRoomsRoomTypeHospital=this.selectedRow;

    //this.ngModelRoomsId= tempVwRoomsRoomTypeHospital.RoomsId;

    this.localService.edit(tempVwRoomsRoomTypeHospital.RoomsId).subscribe(
    p => this.roomsVar=p,
    e => console.log( e), 
    () => console.log("roomsvar=",this.roomsVar));

}



    
    

  ngOnInit() { 

      this.clear();
      
  

        // this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        this.userform = this.fb.group(
          {'CategoryIdRoomsTypeRooms':new FormControl('', Validators. required),'RoomsNameNos':new FormControl('', Validators. required),'RoomsFloorNos':new FormControl('', Validators. required),'RoomsPerdayCharges':new FormControl('', Validators. required),'RoomsTrustPerdayCharges':new FormControl('', Validators. required),'RoomsOtherDetails':new FormControl('', Validators. required),});


        this.localService
      .getall(this.hospitalID)
      .subscribe(
         /* happy path */ p => this.VwRoomsRoomTypeHospital = p,
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done getDisplayAll2' + JSON.stringify(this.roomsVar)));


        this.localService.getCategoryMasterdrp(this.categorytype,this.hospitalID).subscribe(         
        /* happy path */ p => {
              this.drpcategorytypeoptions = p;
              this.drpcategorytypeoptions.unshift({label:"--Select Category--" , value:"1"} )  
            },
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done drpcatstaffoptions' + JSON.stringify(this.drpcategorytypeoptions))
         );


         this.roomsVar=new roomsTS();
  }

  
 

  initContact() {
        // initialize our address
        // return this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        return this.userform = this.fb.group({'CategoryIdRoomsTypeRooms':new FormControl('', Validators. required),'RoomsNameNos':new FormControl('', Validators. required),'RoomsFloorNos':new FormControl('', Validators. required),'RoomsPerdayCharges':new FormControl('', Validators. required),'RoomsTrustPerdayCharges':new FormControl('', Validators. required),'RoomsOtherDetails':new FormControl('', Validators. required),});

    }

  //Dropdown change event capture
  drpchange(events1: any){
    // alert(events1.value);
  }

  get diagnostic() { return JSON.stringify(this.userform.value); }
 }
