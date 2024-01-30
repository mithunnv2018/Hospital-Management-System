import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {CountryMasterTS} from '../country/country';
import {DataTableModule} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';

import { CountryService } from '../shared/country/index';
import { SupplierMasterService } from '../shared/suppliermaster/index';

import { Observable } from 'rxjs/Rx';
import {supplierTS} from './suppliermaster';
import {VwSupplierManufacturerHospitalTS} from './VwSupplierManufacturerHospitalTS';

/**
 * This class represents the lazy loaded countryComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-suppliermaster',
  templateUrl: 'suppliermaster.component.html',
  styleUrls: ['suppliermaster.component.css']
})
export class SupplierMasterComponent implements OnInit {
  
  userform: FormGroup;
  country_contacts:FormGroup;
  msgs: Message[]=[];
  countrys: CountryMasterTS[]=[];
  
  VwSupplierManufacturerHospital:VwSupplierManufacturerHospitalTS[]=[];

   submitted: boolean;
   submittedcontact:boolean;
   supplierVar: supplierTS;
   selectedRow: VwSupplierManufacturerHospitalTS;


     newVwSupplierManufacturerHospital: boolean;
   newcontact: boolean;

   drpmanufactureroptions:SelectItem[]=[];
   ngModelCountryName:string="";
   hospitalID:string="";

   clear(){
        this.  newVwSupplierManufacturerHospital=true;
        this.supplierVar=new supplierTS();
        
        //this.downloadfile("DUMMY");
    }

      
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private localService: SupplierMasterService){
                
               this.hospitalID=localStorage.getItem('hospitalID');  
   
  }

 

 onRowSelectVwSupplierManufacturerHospital(event: any){

this.newVwSupplierManufacturerHospital=false;
 let tempVwSupplierManufacturerHospital:VwSupplierManufacturerHospitalTS;
 tempVwSupplierManufacturerHospital=this.selectedRow;

//this.ngModelSupplierId= tempVwSupplierManufacturerHospital.SupplierId;


this.localService.edit(tempVwSupplierManufacturerHospital.SupplierId).subscribe(
p => this.supplierVar=p,
 e => console.log( e), 
 () => console.log("Edit") );

}

  onSubmit(){
      //   alert(JSON.stringify(this.selectedRow));
        // this.supplierVar.CountryIdState=this.ngModelCountryName;
        this.submitted = true;
        this.msgs = [];
        console.log(JSON.stringify(this.supplierVar));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        if(this.  newVwSupplierManufacturerHospital){
        this.localService
      .insert(JSON.stringify(this.supplierVar))
      .subscribe(
         /* happy path */ p => this.VwSupplierManufacturerHospital = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }else{
      this.localService
      .update(JSON.stringify(this.supplierVar))
      .subscribe(
         /* happy path */ p => this.VwSupplierManufacturerHospital = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'});
        this.clear();
  }




    
    

  ngOnInit() { 

      this.clear();
      
  

        this.userform = this.fb.group({'SupplierName':new FormControl('', Validators. required),'SupplierAliasName':new FormControl('', Validators. required),'ManufacturerIdSupplier':new FormControl('', Validators. required),});

      
        this.localService.getManufacturer_HospitalIdManufacturerdrp(this.hospitalID).subscribe(
         /* happy path */ p => {this.drpmanufactureroptions= p;this.drpmanufactureroptions.unshift({label:"--Select Manufacturer--" , value:"1"} )},
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done getDisplayAll2' + JSON.stringify(this.drpmanufactureroptions)));



        this.localService
      .getall(this.hospitalID)
      .subscribe(
         /* happy path */ p => this.VwSupplierManufacturerHospital= p,
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done getDisplayAll2' + JSON.stringify(this.VwSupplierManufacturerHospital)));

         this.supplierVar=new supplierTS();
  }

  
 

  initContact() {
        // initialize our address
        // return this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        //return this.userform = this.fb.group({'CountryName':new FormControl('', Validators. required),'CountryAliasName':new FormControl('', Validators. required),});
        return this.userform = this.fb.group({'SupplierName':new FormControl('', Validators. required),'SupplierAliasName':new FormControl('', Validators. required),'ManufacturerIdSupplier':new FormControl('', Validators. required),});






    }

  //Dropdown change event capture
  drpchange(events1: any){
    // alert(events1.value);
  }

  

  get diagnostic() { return JSON.stringify(this.userform.value); }
 }
