import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {genericmedicinemasterTS} from './genericmedicinemaster';
import {DataTableModule} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';

import { GenericmedicinemasterService } from '../shared/genericmedicinemaster/index';
import {vwgenericmedicinechemicalmasterTS} from './vwgenericmedicinechemicalmasterTS';

import {GenericchemicalmasterService} from '../shared/genericchemicalmaster/index';

import {genericchemicalmasterTS} from '../genericchemicalmaster/genericchemicalmaster';

import {FileUpload} from './fileupload';
import {tbl_uploadedfile_masterTS} from './tbl_uploadedfile_masterTS';


import {BaseUrlService} from '../shared/baseurl/baseurl.service';
import { Observable } from 'rxjs/Rx';

/**
 * This class represents the lazy loaded countryComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-genericmedicinemaster',
  templateUrl: 'genericmedicinemaster.component.html',
  styleUrls: ['genericmedicinemaster.component.css']
})
export class GenericmedicinemasterComponent implements OnInit {
  
  userform: FormGroup;
  country_contacts:FormGroup;
  msgs: Message[]=[];
  vwgenericmedicinechemicalmaster: vwgenericmedicinechemicalmasterTS[]=[];

   submitted: boolean;
   submittedcontact:boolean;
   genericmedicinemasterVar: genericmedicinemasterTS;
   selectedRow: vwgenericmedicinechemicalmasterTS;

   //drpgenmedoptions:SelectItem[]=[];      
   

   newvwgenericmedicinechemicalmasterTS: boolean;
  //  categorytype:string="";
   hospitalID:string="";

   tbl_uploadedfile_masterTS:tbl_uploadedfile_masterTS[]=[];

   mybaseurl:string="";
   //Client format for file upload
  uploadedFiles: any[] = [];
  //server format for file upload
  fileuploadarr: FileUpload[]=[];
  fileupload: FileUpload;

  chemselected:SelectItem;
  chemresults:SelectItem[]=[];    

  displaynewchemicalname:boolean;
  newchemicalname:string;

   newcontact: boolean;
      clear(){
            this.newvwgenericmedicinechemicalmasterTS=true;
            this.genericmedicinemasterVar=new genericmedicinemasterTS();
            this.chemselected=null;  

            this.fileupload=new FileUpload();
            this.fileuploadarr=[];
            this.uploadedFiles=[];
    
      }

      
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private baseUrlservice:BaseUrlService,
              private localService: GenericmedicinemasterService,
              private genericchemicalmasterService:GenericchemicalmasterService){
    
              // this.categorytype="bedtype";  
              // this.hospitalID="HSP1";  
              this.hospitalID=localStorage.getItem('hospitalID'); 
              this.mybaseurl=baseUrlservice.getBaseurl();     
  }
 
  onSubmit(){
      //   alert(JSON.stringify(this.selectedRow));
        this.genericmedicinemasterVar.HospitalIdgenericmedicinemaster=this.hospitalID;

        this.genericmedicinemasterVar.GenericChemicalIdgenericmedicinemaster=this.chemselected.value;


        this.submitted = true;
        this.msgs = [];
        console.log(JSON.stringify(this.genericmedicinemasterVar));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        if(this.newvwgenericmedicinechemicalmasterTS){
        
        this.localService
      .insert(JSON.stringify(this.genericmedicinemasterVar))
      .subscribe(
         /* happy path */ p => this.vwgenericmedicinechemicalmaster = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }else{
      this.localService
      .update(JSON.stringify(this.genericmedicinemasterVar))
      .subscribe(
         /* happy path */ p => this.vwgenericmedicinechemicalmaster = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'}));
        }
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'});
        this.clear();
  }
 
onRowSelectvwgenericmedicinechemicalmaster(event: any){

this.newvwgenericmedicinechemicalmasterTS=false;
 let tempvwgenericmedicinechemicalmaster:vwgenericmedicinechemicalmasterTS;
 tempvwgenericmedicinechemicalmaster=this.selectedRow;

this.chemselected={
  label:tempvwgenericmedicinechemicalmaster.GenericChemicalName,
  value:tempvwgenericmedicinechemicalmaster.GenericChemicalIdgenericmedicinemaster
}; 
//this.ngModelGenericId= tempvwgenericmedicinechemicalmaster.GenericId;

this.localService.edit(tempvwgenericmedicinechemicalmaster.GenericId).subscribe(
    p => this.genericmedicinemasterVar=p,
    e => console.log( e), 
    () => console.log( "Done Edit") );

}


 


  onFinalFileUpload(){   
  
    // alert(this.uploadedFiles.length);
    for(let i=0;i<this.uploadedFiles.length;i++){
          let filename=this.uploadedFiles[i].name;
         
          let tempfileupload=new FileUpload();
          
          tempfileupload.fileName=filename;
          tempfileupload.filePath='';
          tempfileupload.fileStatus='Yes';
          tempfileupload.fileType='img';
          tempfileupload.uploadfile_filename='';
         // alert("insidefileupload: " + JSON.stringify(this.fileupload));
          this.fileuploadarr.push(tempfileupload);
         
        }
   
  }

  //upload files to the server
onUpload(event: any){
  //alert(event.files);
  //this.uploadedFiles=[];
  for(let file of event.files) {
          
          this.uploadedFiles.push(file);
          break;
  }//console.log(event.xhr.response);
  this.msgs = [];
  this.msgs.push({severity: 'info', summary: 'File Uploaded', detail: ''});
} 
onImportExcel(){
  
  this.onFinalFileUpload();

  let firstparam=this.fileuploadarr[0].fileName;
  let hospitaladmitid=this.hospitalID;
  this.localService.importWS_genericmedicine_excelsave(firstparam,hospitaladmitid)
    .subscribe(arg => this.vwgenericmedicinechemicalmaster = arg,
    e=>console.log(e),
    ()=>{
      console.log("Done Import",this.vwgenericmedicinechemicalmaster);
  });
  this.clear();

}

 
ngOnInit() 
{ 
  this.clear();
  this.userform = this.fb.group({'GenericMedicinename':new FormControl('', Validators. required),'GenericGenericname':new FormControl('', Validators. required),'GenericChemicalIdgenericmedicinemaster':new FormControl('', Validators. required),});


    this.localService
    .getall(this.hospitalID)
    .subscribe(
    p => this.vwgenericmedicinechemicalmaster = p,
    e => console.log( e),
    () => console.log('done getDisplayAll2' + JSON.stringify(this.vwgenericmedicinechemicalmaster)));

    //  this.localService.getgenericchemicalmasterdrp(this.hospitalID).subscribe(         
    //     /* happy path */ p => {
    //           this.drpgenmedoptions = p;
    //           this.drpgenmedoptions.unshift({label:"--Select Chemical Name--" , value:"1"} )  
    //         },
    //      /* error path */ e => console.log( e),
    //      /* onComplete */ () => console.log('done drpgenmedoptions' + JSON.stringify(this.drpgenmedoptions))
    //      );


}  
 filterChemicalName(event:any) {
        this.chemresults = [];
        let query=event.query;
        this.localService
      .getWS_genericchemicalmaster_autocomplete_drpjson(query,this.hospitalID)
      .subscribe(
         /* happy path */ p => this.chemresults= p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => {this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'})
                                console.log("saved result=");
                      }
         );
 
    } 

gotoChemicalNew(){
    if(this.newchemicalname){

        let obj=new genericchemicalmasterTS();
        obj.GenericChemicalAliasname=this.newchemicalname;
        obj.GenericChemicalName=this.newchemicalname;
        obj.HospitalIdgenericchemicalmaster=this.hospitalID;
        
        this.genericchemicalmasterService
      .getWS_genericchemicalmaster_popup_create(JSON.stringify(obj))
      .subscribe(
         /* happy path */ p =>{
            this.chemselected={
              label:p.GenericChemicalName,
              value:p.GenericChemicalId
            };
           } ,
         /* error path */ e => console.log(e),
         /* onComplete */ () => this.msgs.push({severity:'info', summary:'Success', detail:'Chemical Name Saved Successfully'}));
      

         this.displaynewchemicalname=false;

      
    }
    else{
      this.msgs.push({severity:'error', summary:'Error', detail:'Enter Chemical Name'});
    }
  }

  initContact() {
        // initialize our address
        // return this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        return this.userform = this.fb.group({'GenericMedicinename':new FormControl('', Validators. required),'GenericGenericname':new FormControl('', Validators. required),'GenericChemicalIdgenericmedicinemaster':new FormControl('', Validators. required),});

    }

  //Dropdown change event capture
  drpchange(events1: any){
    // alert(events1.value);
  }

  get diagnostic() { return JSON.stringify(this.userform.value); }
 }
