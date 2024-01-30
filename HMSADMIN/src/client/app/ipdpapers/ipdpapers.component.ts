import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {ipdpapersTS} from './ipdpapers';
import {tbl_uploadedfile_masterTS} from './tbl_uploadedfile_masterTS';
import {DataTableModule} from 'primeng/primeng';
import {SelectItem,ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import { MyDateFormat } from '../shared/pipes/mydateformat.pipe';
import {MyTimeFormat} from '../shared/pipes/mytimeformat.pipe';
import { IpdpapersService } from '../shared/ipdpapers/index';
import {BaseUrlService} from '../shared/baseurl/baseurl.service';
import {FileUpload} from './fileupload';

import { Observable } from 'rxjs/Rx';
/**
 * This class represents the lazy loaded countryComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-ipdpapers',
  templateUrl: 'ipdpapers.component.html',
  styleUrls: ['ipdpapers.component.css'],
  providers:[MyDateFormat,MyTimeFormat,BaseUrlService,ConfirmationService]
})
export class IpdpapersComponent implements OnInit {
  
  userform: FormGroup;
  country_contacts:FormGroup;
  msgs: Message[]=[];
 
   submitted: boolean;
   submittedcontact:boolean;
   ipdpapersVar: ipdpapersTS;
  //  selectedRow:  vwhospitalizationipdpackagetrustcategorydiseasedetailsTS;


   drphospitalizationoptions:SelectItem[]=[];
 
   categorytype:string="";
   hospitalID:string="";
   CurrentLoginYear:string="";
   memberID:string="";

   ipdselected:SelectItem;
   ipdresults:SelectItem[]=[];    

   hospitalizationid:string="";

   tbl_uploadedfile_masterTS:tbl_uploadedfile_masterTS[]=[];

   mybaseurl:string="";
   //Client format for file upload
  uploadedFiles: any[] = [];
  //server format for file upload
  fileuploadarr: FileUpload[]=[];
  fileupload: FileUpload;

   newcontact: boolean;

   newipdpapers:boolean=false;


      clear(){
            this.newipdpapers=true;
            this.ipdpapersVar=new ipdpapersTS();

            // this.ipdpapersVar.PackageIdHospitalization="1";
            // this.ipdpapersVar.TrustIdHospitalization="1";
            

            this.fileupload=new FileUpload();
            this.fileuploadarr=[];
            this.uploadedFiles=[];

            // this.drphospitalizationoptions=[];

            // this.ipdselected=null;

      }

      
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private localService: IpdpapersService,
              private mydate1: MyDateFormat,
              private mytime1:MyTimeFormat,
              private baseUrlservice:BaseUrlService,
              private confirmationService:ConfirmationService){
    
              //this.categorytype="hospitalizationtype";  
              // this.hospitalID="HSP1";  
              this.hospitalID=localStorage.getItem('hospitalID'); 
              this.CurrentLoginYear=localStorage.getItem('CurrentLoginYear');                
              this.memberID=localStorage.getItem('memberID');
              this.mybaseurl=baseUrlservice.getBaseurl();     
  }
 
  onSubmit(){
      //   alert(JSON.stringify(this.selectedRow));

        this.onFinalFileUpload();

        this.ipdpapersVar.HSPAdminIdIPDPapers=this.hospitalizationid;

        this.ipdpapersVar.MemberIdIPDPapers=this.memberID;
        // this.ipdpapersVar.HSPAdminStatus="A";

        //  this.ipdpapersVar.IPDIdHospitalization=this.ipdselected.value;

        this.submitted = true;
        this.msgs = [];
        console.log(JSON.stringify(this.ipdpapersVar));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        if(this.newipdpapers){
        
        this.localService
      .getWS_IPDPapers_create(JSON.stringify(this.ipdpapersVar),JSON.stringify(this.fileuploadarr))
      .subscribe(
         /* happy path */ p => this.tbl_uploadedfile_masterTS = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => {
                              this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'})
                                console.log("saved result=",this.tbl_uploadedfile_masterTS);
                                
                      }
         );
        } 
        else{
          this.localService
          .getWS_IPDPapers_create_fileupload(this.hospitalizationid,JSON.stringify(this.fileuploadarr))
          .subscribe(
         /* happy path */ p => this.tbl_uploadedfile_masterTS = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => {
                              this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'})
                                console.log("saved result=",this.tbl_uploadedfile_masterTS);
                                
                      }
         );
        }
        this.submitted = true;
        // this.msgs = [];
        // this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'});
        this.clear();
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
          //break;
  }//console.log(event.xhr.response);
  this.msgs = [];
  this.msgs.push({severity: 'info', summary: 'File Uploaded', detail: ''});
} 

filterIPDName(event:any) {
        this.ipdresults = [];
        let query=event.query;
        this.localService
      .getipdmaster_HospitalIdIPDMaster_SearchNamedrp(this.hospitalID,query)
      .subscribe(
         /* happy path */ p => this.ipdresults = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => {
                                console.log("filter result=",this.ipdresults);
                      }
         );
 
    } 

    loadHospitalizationdrp(val:any){

      let tempipdid=this.ipdselected.value;    
      this.localService
      .getWS_hospitalization_IPDIdHospitalization_drpjson(tempipdid)
      .subscribe(
         /* happy path */ p =>{ 
           this.drphospitalizationoptions = p;
           this.drphospitalizationoptions.unshift({label:"--Select Hospitalization--" , value:"1"} )
         },
         /* error path */ e => console.log(e),
         /* onComplete */ () => {
                                console.log("Loaded drphospitalizationoptions=",this.drphospitalizationoptions);
                      }
         );
         this.tbl_uploadedfile_masterTS=[];
    }

    loadFileUploadHospitalizationGrid(event:any){
      if(this.hospitalizationid){
        this.localService
      .getWS_IPDPapers_selectjson_fileupload(this.hospitalizationid)
      .subscribe(
         /* happy path */ p => this.tbl_uploadedfile_masterTS = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => {
                                console.log("Loaded tbl_uploadedfile_masterTS=",this.tbl_uploadedfile_masterTS);
                      }
         );

         this.localService
      .getWS_IPDPapers_selectjson(this.hospitalizationid)
      .subscribe(
         /* happy path */ p => {
           if(p && p.length>0){
             this.newipdpapers=false;
           }
           else{
             this.newipdpapers=true;
           }
           console.log("IPDPAPERS IS NEW"+this.newipdpapers);
          }
         ,
         /* error path */ e => console.log(e),
         /* onComplete */ () => {
                                console.log("Loaded tbl_uploadedfile_masterTS=",this.tbl_uploadedfile_masterTS);
                      }
         );
         
      }
      
    }

  deleteSubmitParticularsRow(cont:tbl_uploadedfile_masterTS){

     this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {
            let id=cont.uploadfile_id;  
            this.localService
          .getWS_tbl_uploadedfile_master_delete(id)
          .subscribe(
            /* happy path */ p => console.log("done delete"),
            /* error path */ e => console.log(e),
            /* onComplete */ () => {
                                    console.log("done delete");
                          }
            );


            let selectedkeywordgridRow:tbl_uploadedfile_masterTS=cont;
            this.tbl_uploadedfile_masterTS.splice(this.findSelectedKeywordSubcatIndex(selectedkeywordgridRow), 1);
            cont = null;


            this.msgs = [];
            this.msgs.push({severity:'info', summary:'Confirmed', detail:'You have accepted'});
            }
        });
 

  }
  findSelectedKeywordSubcatIndex(p:tbl_uploadedfile_masterTS): number {
        return this.tbl_uploadedfile_masterTS.indexOf(p);
  }  

  ngOnInit() { 

      this.clear();
      
  

        // this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        // this.userform = this.fb.group({'HSPAdminDate':new FormControl('', Validators. required),'HSPAdmintime':new FormControl('', Validators. required),'IPDIdHospitalization':new FormControl('', Validators. required),'CategoryIdHospitalizationDepartment':new FormControl('', Validators. required),'DiseaseIdHospitalization':new FormControl('', Validators. required),});
        // this.userform = this.fb.group({'HSPAdminDate':new FormControl('', Validators. required),'HSPAdmintime':new FormControl('', Validators. required),'HSPAdminStatus':new FormControl('', Validators. required),'IPDIdHospitalization':new FormControl('', Validators. required),'CategoryIdHospitalizationDepartment':new FormControl('', Validators. required),'DiseaseIdHospitalization':new FormControl('', Validators. required),});

     
       
                  //this.ipdpapersVar=new hospitalizationTS();
  }


  gotoIPDNew(){
    this.router.navigate(['/ipdmaster']);
  }
    
  
 

  initContact() {
        // initialize our address
        // return this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        // return this.userform = this.fb.group({'HSPAdminDate':new FormControl('', Validators. required),'HSPAdmintime':new FormControl('', Validators. required),'HSPAdminStatus':new FormControl('', Validators. required),'IPDIdHospitalization':new FormControl('', Validators. required),'CategoryIdHospitalizationDepartment':new FormControl('', Validators. required),'DiseaseIdHospitalization':new FormControl('', Validators. required),});

    }

  //Dropdown change event capture
  drpchange(events1: any){
    // alert(events1.value);
  }

  get diagnostic() { return JSON.stringify(this.userform.value); }
 }
