import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {categorymasterTS} from './categorymaster';
import {DataTableModule} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';

import { CategoryMasterService } from '../shared/categorymaster/index';

import { Observable } from 'rxjs/Rx';
/**
 * This class represents the lazy loaded citymasterComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-categorymaster',
  templateUrl: 'categorymaster.component.html',
  styleUrls: ['categorymaster.component.css']
})
export class CategoryMasterComponent implements OnInit {
  
  userform: FormGroup;
  country_contacts:FormGroup;
  msgs: Message[]=[];
  categorymaster: categorymasterTS[]=[];

   submitted: boolean;
   submittedcontact:boolean;
   categorymasterVar: categorymasterTS;
   selectedRow: categorymasterTS;

   newcategorymaster: boolean;
   
    drpcategorytypeoptions:SelectItem[]=[];      
   

    
    hospitalID="";   

    clear(){
            this.newcategorymaster=true;
            this.categorymasterVar=new categorymasterTS();
            this.categorymasterVar.CategoryTypeIdCategoryMaster=this.hospitalID;
    }

      
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private localService: CategoryMasterService){
                
                this.hospitalID="HSP1";
   
  }
 


  onSubmit(){
      //   alert(JSON.stringify(this.selectedRow));
        this.submitted = true;
        this.msgs = [];

        this.categorymasterVar.HospitalIdCategoryMaster=this.hospitalID;
        // this.categorymasterVar.CategoryTypeIdCategoryMaster="DUMMY";

        console.log(JSON.stringify(this.categorymasterVar));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        if(this.newcategorymaster){
        this.localService
      .insert(JSON.stringify(this.categorymasterVar))
      .subscribe(
         /* happy path */ p => this.categorymaster = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }else{
      this.localService
      .update(JSON.stringify(this.categorymasterVar))
      .subscribe(
         /* happy path */ p => this.categorymaster = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'});
        this.clear();
  }


 
  onRowSelectcategorymaster(event: any){

  this.newcategorymaster=false;
  let tempcategorymaster:categorymasterTS;
  tempcategorymaster=this.selectedRow;

  //this.ngModelCategoryId= tempcategorymaster.CategoryId;

  this.localService.edit(tempcategorymaster.CategoryId).subscribe(
    p => this.categorymasterVar=p,
    e => console.log( e), 
    () => console.log("edit ",this.categorymasterVar) );

}



 


  ngOnInit() { 

      this.clear();

      this.userform = this.fb.group({'CategoryName':new FormControl('', Validators. required),
      'CategoryAliasname':new FormControl('', Validators. required),
      'CategoryTypeIdCategoryMaster':new FormControl('', Validators. required),});






      this.localService.getCategoryTypeMasterdrp().subscribe(         
        /* happy path */ p => {
            this. drpcategorytypeoptions = p;
            this.drpcategorytypeoptions.unshift({label:"--Select Category Type--" , value:"1"} )
          },
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done getDisplayAll2' + JSON.stringify(this. drpcategorytypeoptions))
         );

      this.localService
      .getall('DUMMY')
      .subscribe(
         /* happy path */ p => this.categorymaster = p,
         /* error path */ e => console.log( e),
         /* onComplete */ () => console.log('done getDisplayAll2' + JSON.stringify(this.categorymaster)));

         this.categorymasterVar=new categorymasterTS();
  }

  
 

  initContact() {
        // initialize our address
        // return this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        return this.userform = this.fb.group({'CategoryName':new FormControl('', Validators. required),'CategoryAliasname':new FormControl('', Validators. required),'CategoryTypeIdCategoryMaster':new FormControl('', Validators. required),});








    }

  //Dropdown change event capture
  drpchange(events1: any){
    // alert(events1.value);
  }

  get diagnostic() { return JSON.stringify(this.userform.value); }
 }
