import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {PackageTS} from './packagemaster';
import {DataTableModule} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';

import { PackageMasterService } from '../shared/packagemaster/index';
import {VwPackageHospitalTS } from './VwPackageHospitalTS';
import { Observable } from 'rxjs/Rx';
/**
 * This class represents the lazy loaded citymasterComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-packagemaster',
  templateUrl: 'packagemaster.component.html',
  styleUrls: ['packagemaster.component.css']
})
export class PackageMasterComponent implements OnInit {
  
  userform: FormGroup;
  country_contacts:FormGroup;
  msgs: Message[]=[];
  VwPackageHospital: VwPackageHospitalTS[]=[];

   submitted: boolean;
   submittedcontact:boolean;
   PackageVar: PackageTS;
   selectedRow: VwPackageHospitalTS;

   newVwPackageHospital: boolean;
   
   drpcountryoptionss:SelectItem[]=[];      
   drpstateoptions:SelectItem[]=[];
   drpcityoptions:SelectItem[]=[];

   ngModelCountryId:string="";
   ngModelStateId:string="";

  hospitalID="";   
  drppackageaddonsoptionss:SelectItem[]=[];

    clear(){
            this.newVwPackageHospital=true;
            this.PackageVar=new PackageTS();
            this.PackageVar.HospitalIdPackage=this.hospitalID;
    }

      
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private localService: PackageMasterService){
                
              this.hospitalID=localStorage.getItem('hospitalID'); 
   
  }
 


  onSubmit(){
      //   alert(JSON.stringify(this.selectedRow));
        this.submitted = true;
        this.msgs = [];
        // this.PackageVar.HospitalId=this.hospitalID;
        this.PackageVar.HospitalIdPackage=this.hospitalID;

        console.log(JSON.stringify(this.PackageVar));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        if(this.newVwPackageHospital){
        this.localService
      .insert(JSON.stringify(this.PackageVar))
      .subscribe(
         /* happy path */ p => this.VwPackageHospital = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }else{
      this.localService
      .update(JSON.stringify(this.PackageVar))
      .subscribe(
         /* happy path */ p => this.VwPackageHospital = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'});
        this.clear();
  }


   onRowSelectVwPackageHospital(event: any){

    this.newVwPackageHospital=false;
    let tempVwPackageHospital:VwPackageHospitalTS;
    tempVwPackageHospital=this.selectedRow;

    //this.ngModelPackageId= tempVwPackageHospital.PackageId;

    this.localService.edit(tempVwPackageHospital.PackageId).subscribe(
    p => this.PackageVar=p,
    e => console.log( e), 
    () => console.log( "edit" ));

}




 

  ngOnInit() { 

      this.clear();

      this.userform = this.fb.group({'PackageName':new FormControl('', Validators. required),'PackageAmount':new FormControl('', Validators. required),'PackageTrustAmount':new FormControl('', Validators. required),'PackageAddons':new FormControl('', Validators. required),});


      this.localService
      .getall(this.hospitalID)
      .subscribe(
         /* happy path */ p => this.VwPackageHospital = p,
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done getDisplayAll2' + JSON.stringify(this.PackageVar)));

         this.drppackageaddonsoptionss=[
           {
             label:"--Select Package Addons--",
             value:"1"
           },
           {
             label:"Yes",
             value:"yes"
           },
           {
             label:"No",
             value:"no"
           },
           
         ] ;

         this.PackageVar=new PackageTS();
  }

  
 

  initContact() {
        // initialize our address
        // return this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        this.userform = this.fb.group({'PackageName':new FormControl('', Validators. required),'PackageAmount':new FormControl('', Validators. required),'PackageTrustAmount':new FormControl('', Validators. required),'PackageAddons':new FormControl('', Validators. required),});










    }

  //Dropdown change event capture
  drpchange(events1: any){
    // alert(events1.value);
  }

  get diagnostic() { return JSON.stringify(this.userform.value); }
 }
