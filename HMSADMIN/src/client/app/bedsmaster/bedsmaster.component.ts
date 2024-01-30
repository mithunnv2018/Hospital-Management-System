import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {bedsTS} from './bedsmaster';
import {DataTableModule} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';

import { BedsMasterService } from '../shared/bedsmaster/index';
import {VwBedsRoomsBedTypeHospitalTS} from './VwBedsRoomsBedTypeHospitalTS';

import { Observable } from 'rxjs/Rx';
/**
 * This class represents the lazy loaded countryComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-bedsmaster',
  templateUrl: 'bedsmaster.component.html',
  styleUrls: ['bedsmaster.component.css']
})
export class BedsMasterComponent implements OnInit {
  
  userform: FormGroup;
  country_contacts:FormGroup;
  msgs: Message[]=[];
  VwBedsRoomsBedTypeHospital: VwBedsRoomsBedTypeHospitalTS[]=[];

   submitted: boolean;
   submittedcontact:boolean;
   bedsVar: bedsTS;
   selectedRow: VwBedsRoomsBedTypeHospitalTS;

   drpcategorytypeoptions:SelectItem[]=[];      
   drproomsoptions:SelectItem[]=[];

   newVwBedsRoomsBedTypeHospital: boolean;
   categorytype:string="";
   hospitalID:string="";

   newcontact: boolean;
      clear(){
            this.newVwBedsRoomsBedTypeHospital=true;
            this.bedsVar=new bedsTS();
            
      }

      
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private localService: BedsMasterService){
    
              this.categorytype="bedtype";  
              // this.hospitalID="HSP1";  
              this.hospitalID=localStorage.getItem('hospitalID'); 
  }
 
  onSubmit(){
      //   alert(JSON.stringify(this.selectedRow));
        this.bedsVar.HospitalIdBeds=this.hospitalID;
        

        this.submitted = true;
        this.msgs = [];
        console.log(JSON.stringify(this.bedsVar));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        if(this.newVwBedsRoomsBedTypeHospital){
        this.bedsVar.BedsOccupied="No"; 
        this.localService
      .insert(JSON.stringify(this.bedsVar))
      .subscribe(
         /* happy path */ p => this.VwBedsRoomsBedTypeHospital = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }else{
      this.localService
      .update(JSON.stringify(this.bedsVar))
      .subscribe(
         /* happy path */ p => this.VwBedsRoomsBedTypeHospital = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'});
        this.clear();
  }
 

onRowSelectVwBedsRoomsBedTypeHospital(event: any){

  this.newVwBedsRoomsBedTypeHospital=false;
  let tempVwBedsRoomsBedTypeHospital:VwBedsRoomsBedTypeHospitalTS;
  tempVwBedsRoomsBedTypeHospital=this.selectedRow;

//this.ngModelBedsId= tempVwBedsRoomsBedTypeHospital.BedsId;

  this.localService.edit(tempVwBedsRoomsBedTypeHospital.BedsId).subscribe(
    p => this.bedsVar=p,
    e => console.log( e), 
    () => console.log( "edit==>",this.bedsVar) );

}



  ngOnInit() { 

      this.clear();
      
  

        // this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        this.userform = this.fb.group({'CategoryIdBedsTypeBeds':new FormControl('', Validators. required),'RoomsIdBeds':new FormControl('', Validators. required),'BedsNos':new FormControl('', Validators. required),'BedsPerdayCharges':new FormControl('', Validators. required),'BedsTrustPerdayCharges':new FormControl('', Validators. required),});

        this.localService
      .getall(this.hospitalID)
      .subscribe(
         /* happy path */ p => this.VwBedsRoomsBedTypeHospital = p,
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done getDisplayAll2' + JSON.stringify(this.bedsVar)));


        this.localService.getCategoryMasterdrp(this.categorytype,this.hospitalID).subscribe(         
        /* happy path */ p => {
              this.drpcategorytypeoptions = p;
              this.drpcategorytypeoptions.unshift({label:"--Select Category--" , value:"1"} )  
            },
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done drpcatstaffoptions' + JSON.stringify(this.drpcategorytypeoptions))
         );

         this.localService.getRooms_HospitalIdRoomsdrp(this.hospitalID).subscribe(         
        /* happy path */ p => {
              this.drproomsoptions = p;
              this.drproomsoptions.unshift({label:"--Select Rooms--" , value:"1"} )  
            },
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done drproomsoptions' + JSON.stringify(this.drproomsoptions))
         );



         this.bedsVar=new bedsTS();
  }

  
 

  initContact() {
        // initialize our address
        // return this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        return this.userform = this.fb.group({'CategoryIdBedsTypeBeds':new FormControl('', Validators. required),'RoomsIdBeds':new FormControl('', Validators. required),'BedsNos':new FormControl('', Validators. required),'BedsPerdayCharges':new FormControl('', Validators. required),'BedsTrustPerdayCharges':new FormControl('', Validators. required),});

    }

  //Dropdown change event capture
  drpchange(events1: any){
    // alert(events1.value);
  }

  get diagnostic() { return JSON.stringify(this.userform.value); }
 }
