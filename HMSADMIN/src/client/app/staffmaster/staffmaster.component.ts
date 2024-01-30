import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {staffmasterTS} from './staffmaster';
import {DataTableModule} from 'primeng/primeng';
import {SelectItem,CalendarModule} from 'primeng/primeng';


import { MyDateFormat } from '../shared/pipes/mydateformat.pipe';
import { StaffMasterService } from '../shared/staffmaster/index';
import {vwhospitalcitystatecountryTS} from './vwhospitalcitystatecountryTS';
import { Observable } from 'rxjs/Rx';
/**
 * This class represents the lazy loaded citymasterComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-staffmaster',
  templateUrl: 'staffmaster.component.html',
  styleUrls: ['staffmaster.component.css'],
  providers:[MyDateFormat]

})
export class StaffMasterComponent implements OnInit {
  
  userform: FormGroup;
  country_contacts:FormGroup;
  msgs: Message[]=[];
  staffmaster: staffmasterTS[]=[];

   submitted: boolean;
   
   staffmasterVar: staffmasterTS;
   selectedRow: staffmasterTS;

   newstaffmaster: boolean;
   
   drpcatstaffoptions:SelectItem[]=[];      
   drpStaffSexoptions:SelectItem[]=[];
   drpMaritalStatusoptions:SelectItem[]=[];


  hospitalID="";   
  categorytype="";

  StaffDob:Date;
  StaffJoinDate:Date;
  StaffRetirementDate:Date;
  StaffRemovalDate:Date;


    clear(){
            this.newstaffmaster=true;
            this.staffmasterVar=new staffmasterTS();
            this.staffmasterVar.HospitalIdStaffMaster=this.hospitalID;
            this.StaffDob=new Date();
            this.StaffJoinDate=new Date();
            this.StaffRetirementDate=new Date();
            this.StaffRemovalDate=new Date();
            
            this.StaffDob=null;
            this.StaffJoinDate=null;
            this.StaffRetirementDate=null;
            this.StaffRemovalDate=null;
    }

      
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private localService: StaffMasterService,
              private mydate1: MyDateFormat){
                

                // this.hospitalID="HSP1";
                this.hospitalID=localStorage.getItem('hospitalID');
                this.categorytype="staff";
   
  }
 


  onSubmit(){
      //   alert(JSON.stringify(this.selectedRow));
        this.submitted = true;
        this.msgs = [];
        
        this.staffmasterVar.StaffDob=this.mydate1.parse(this.StaffDob);
        this.staffmasterVar.StaffJoinDate=this.mydate1.parse(this.StaffJoinDate);
        this.staffmasterVar.StaffRetirementDate=this.mydate1.parse(this.StaffRetirementDate);
        this.staffmasterVar.StaffRemovalDate=this.mydate1.parse(this.StaffRemovalDate);
        
       
        this.staffmasterVar.HospitalIdStaffMaster=this.hospitalID;
        //this.staffmasterVar.CategoryIdStaffCategoryStaff=this.categorytype;

        console.log(JSON.stringify(this.staffmasterVar));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        if(this.newstaffmaster){
        this.localService
      .insert(JSON.stringify(this.staffmasterVar))
      .subscribe(
         /* happy path */ p => this.staffmaster = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }else{
      this.localService
      .update(JSON.stringify(this.staffmasterVar))
      .subscribe(
         /* happy path */ p => this.staffmaster = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'});
        this.clear();
  }



  onRowSelectstaffmaster(event: any){

  this.newstaffmaster=false;
  let tempstaffmaster:staffmasterTS;
  tempstaffmaster=this.selectedRow;

  //this.ngModelStaffId= tempstaffmaster.StaffId;

  this.localService.edit(tempstaffmaster.StaffId).subscribe(
  p => this.staffmasterVar=p,
  e => console.log( e), 
  () => this.aftercalldate() );

}
// populateCategoryMaster($events1: any){
//   this.ngModelMaincatId=events1.value;
//   this.localService.getCategoryMasterdrp("Staff").subscribe
//   (p =>{this.ngModelCategoryId=p;
//   this.ngModelCategoryId.unshift({label:"--Select--" , value:"1"} )},e => 
//   console.log(e),() => 
// console.log(this.ngModelCategoryId));
// }


  aftercalldate(){
    

    this.StaffDob= new Date(Number(this.staffmasterVar.StaffDob ));;
    this.StaffJoinDate= new Date(Number(this.staffmasterVar.StaffJoinDate ));
    this.StaffRetirementDate= new Date(Number(this.staffmasterVar.StaffRetirementDate));
    this.StaffRemovalDate= new Date(Number(this.staffmasterVar.StaffRemovalDate ));

  }


 


  


  ngOnInit() { 

      this.clear();

      this.userform = this.fb.group({'StaffFName':new FormControl('', Validators. required),
      'StaffMName':new FormControl('', Validators. required),
      'StaffLName':new FormControl('', Validators. required),
      'StaffName':new FormControl('', Validators. required),
      'StaffDob':new FormControl('', Validators. required),
      'CategoryIdStaffCategoryStaff':new FormControl('', Validators. required),
      'StaffAddress1':new FormControl('', Validators. required),
      'StaffAddress2':new FormControl('', Validators. required)});


      this.drpStaffSexoptions=[
        {
        label:'--Select Gender--',
        value:"1"
        },
        {
        label:'Male',
        value:"Male"
        },
        {
          label:'Female',
          value:'Female'
        }
      ];

      this.drpMaritalStatusoptions=[
        {
          label:'--Select Marital Status--',
          value:"1"
        },
        {
          label:'Married',
          value:'Married'
        },
        {
          label:'Unmarried',
          value:'Unmarried'
        },
        {
          label:'Divorced',
          value:'Divorced'
        },
        {
          label:'Widow',
          value:'Widow'
        }
      ];





      this.localService.getCategoryMasterdrp(this.categorytype,this.hospitalID).subscribe(         
        /* happy path */ p => {
              this.drpcatstaffoptions = p;
              this.drpcatstaffoptions.unshift({label:"--Select Category--" , value:"1"} )  
            },
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done drpcatstaffoptions' + JSON.stringify(this.drpcatstaffoptions))
         );

      this.localService
      .getall('DUMMY')
      .subscribe(
         /* happy path */ p => this.staffmaster = p,
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done getDisplayAll2' + JSON.stringify(this.staffmasterVar)));

         this.staffmasterVar=new staffmasterTS();
  }

  
 

  initContact() {
        // initialize our address
        // return this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        return this.userform = this.fb.group({'StaffFName':new FormControl('', Validators. required),'StaffMName':new FormControl('', Validators. required),'StaffLName':new FormControl('', Validators. required),'StaffName':new FormControl('', Validators. required),'StaffDob':new FormControl('', Validators. required),'CategoryIdStaffCategoryStaff':new FormControl('', Validators. required),'StaffAddress1':new FormControl('', Validators. required),'StaffAddress2':new FormControl('', Validators. required),});









    }

  //Dropdown change event capture
  drpchange(events1: any){
    // alert(events1.value);
  }

  get diagnostic() { return JSON.stringify(this.userform.value); }
 }
