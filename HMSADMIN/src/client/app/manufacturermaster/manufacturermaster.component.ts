import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {manufacturerTS} from './manufacturermaster';
import {DataTableModule} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';

import { ManufacturerMasterService } from '../shared/manufacturermaster/index';
import {vwmanufacturermanuftypehospitalTS} from './vwmanufacturermanuftypehospitalTS';

import { Observable } from 'rxjs/Rx';
/**
 * This class represents the lazy loaded countryComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-manufacturermaster',
  templateUrl: 'manufacturermaster.component.html',
  styleUrls: ['manufacturermaster.component.css']
})
export class ManufacturerMasterComponent implements OnInit {
  
  userform: FormGroup;
  country_contacts:FormGroup;
  msgs: Message[]=[];
  vwmanufacturermanuftypehospital: vwmanufacturermanuftypehospitalTS[]=[];

   submitted: boolean;
   submittedcontact:boolean;
   manufacturerVar: manufacturerTS;
   selectedRow: vwmanufacturermanuftypehospitalTS;

   drpcategoryoptions:SelectItem[]=[];      

   newvwmanufacturermanuftypehospital: boolean;
   categorytype:string="";
   hospitalID:string="";

   newcontact: boolean;
      clear(){
            this.newvwmanufacturermanuftypehospital=true;
            this.manufacturerVar=new manufacturerTS();
            
      }

      
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private localService: ManufacturerMasterService){
    
              this.categorytype="manufacturertype";  
              // this.hospitalID="HSP1";  
              this.hospitalID=localStorage.getItem('hospitalID'); 
  }
 
  onSubmit(){
      //   alert(JSON.stringify(this.selectedRow));
        this.manufacturerVar.HospitalIdManufacturer=this.hospitalID;

        this.submitted = true;
        this.msgs = [];
        console.log(JSON.stringify(this.manufacturerVar));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        if(this.newvwmanufacturermanuftypehospital){
        this.localService
      .insert(JSON.stringify(this.manufacturerVar))
      .subscribe(
         /* happy path */ p => this.vwmanufacturermanuftypehospital = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }else{
      this.localService
      .update(JSON.stringify(this.manufacturerVar))
      .subscribe(
         /* happy path */ p => this.vwmanufacturermanuftypehospital = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'});
        this.clear();
  }

 

onRowSelectvwmanufacturermanuftypehospital(event: any){

this.newvwmanufacturermanuftypehospital=false;
 let tempvwmanufacturermanuftypehospital:vwmanufacturermanuftypehospitalTS;
 tempvwmanufacturermanuftypehospital=this.selectedRow;

//this.ngModelManufacturerId= tempvwmanufacturermanuftypehospital.ManufacturerId;

this.localService.edit(tempvwmanufacturermanuftypehospital.ManufacturerId).subscribe(
p => this.manufacturerVar=p,
 e => console.log( e), 
 () => console.log( "Edit") );

}





    
    

  ngOnInit() { 

      this.clear();
      
  

        // this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        this.userform = this.fb.group({'ManufacturerName':new FormControl('', Validators. required),'ManufacturerAliasName':new FormControl('', Validators. required),'CategoryIdManufacturer':new FormControl('', Validators. required),});

        this.localService
      .getall(this.hospitalID)
      .subscribe(
         /* happy path */ p => this.vwmanufacturermanuftypehospital = p,
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done getDisplayAll2' + JSON.stringify(this.manufacturerVar)));


        this.localService.getCategoryMasterdrp(this.categorytype,this.hospitalID).subscribe(         
        /* happy path */ p => {
              this.drpcategoryoptions = p;
              this.drpcategoryoptions.unshift({label:"--Select Category--" , value:"1"} )  
            },
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done drpcatstaffoptions' + JSON.stringify(this.drpcategoryoptions))
         );


         this.manufacturerVar=new manufacturerTS();
  }

  
 

  initContact() {
        // initialize our address
        // return this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        return this.userform = this.fb.group({'ManufacturerName':new FormControl('', Validators. required),'ManufacturerAliasName':new FormControl('', Validators. required),'CategoryIdManufacturer':new FormControl('', Validators. required),});

    }

  //Dropdown change event capture
  drpchange(events1: any){
    // alert(events1.value);
  }

  get diagnostic() { return JSON.stringify(this.userform.value); }
 }
