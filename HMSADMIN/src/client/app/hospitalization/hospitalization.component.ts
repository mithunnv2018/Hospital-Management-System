import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router, Params } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {hospitalizationTS} from './hospitalization';
import {DataTableModule} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';
import { MyDateFormat } from '../shared/pipes/mydateformat.pipe';
import {MyTimeFormat} from '../shared/pipes/mytimeformat.pipe';
import { HospitalizationService } from '../shared/hospitalization/index';
import { vwhospitalizationipdpackagetrustcategorydiseasedetailsTS} from './vwhospitalizationipdpackagetrustcategorydiseasedetailsTS';
import {HospitalizationscreenService} from '../shared/hospitalizationscreen/index';
import { Observable } from 'rxjs/Rx';
/**
 * This class represents the lazy loaded countryComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-hospitalization',
  templateUrl: 'hospitalization.component.html',
  styleUrls: ['hospitalization.component.css'],
  providers:[MyDateFormat,MyTimeFormat]
})
export class HospitalizationComponent implements OnInit {
  
  userform: FormGroup;
  country_contacts:FormGroup;
  msgs: Message[]=[];
  VwBedsRoomsBedTypeHospital:  vwhospitalizationipdpackagetrustcategorydiseasedetailsTS;

   submitted: boolean;
   submittedcontact:boolean;
   hospitalizationVar: hospitalizationTS;
   selectedRow:  vwhospitalizationipdpackagetrustcategorydiseasedetailsTS;

    drpipdroptions:SelectItem[]=[];
    drpPackageoptions:SelectItem[]=[];
    drpTrustroptions:SelectItem[]=[];
    drpCategoryroptions:SelectItem[]=[];
    drpDiseaseroptions:SelectItem[]=[];

   newVwBedsRoomsBedTypeHospital: boolean;
   categorytype:string="";
   hospitalID:string="";
   CurrentLoginYear:string="";
   memberID:string="";

   ipdselected:SelectItem;
   ipdresults:SelectItem[]=[];    

   HSPAdminDate:Date;
   HSPAdmintime:Date;

   HSPAdminId:string;

   drpstatusoptions:SelectItem[]=[];


   newcontact: boolean;
      clear(){
            this.newVwBedsRoomsBedTypeHospital=true;
            this.hospitalizationVar=new hospitalizationTS();

            this.hospitalizationVar.PackageIdHospitalization="1";
            this.hospitalizationVar.TrustIdHospitalization="1";
            


      }

      
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private localService: HospitalizationService,
              private localHospitalizationscreenService:HospitalizationscreenService,
              private mydate1: MyDateFormat,
              private mytime1:MyTimeFormat){
    
              this.categorytype="hospitalizationtype";  
              // this.hospitalID="HSP1";  
              this.hospitalID=localStorage.getItem('hospitalID'); 
              this.CurrentLoginYear=localStorage.getItem('CurrentLoginYear');                
              this.memberID=localStorage.getItem('memberID');
  }
 
  onSubmit(){
      //   alert(JSON.stringify(this.selectedRow));

        this.hospitalizationVar.HSPAdminDate=this.mydate1.parse(this.HSPAdminDate);
        this.hospitalizationVar.HSPAdmintime=this.mytime1.parse(this.HSPAdmintime);
          
        this.hospitalizationVar.HospitalIdHospitalization=this.hospitalID;
        this.hospitalizationVar.MemberIdHospitalization=this.memberID;
        // this.hospitalizationVar.HSPAdminStatus="A";

         this.hospitalizationVar.IPDIdHospitalization=this.ipdselected.value;

        this.submitted = true;
        this.msgs = [];
        console.log(JSON.stringify(this.hospitalizationVar));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        if(this.newVwBedsRoomsBedTypeHospital){

        this.hospitalizationVar.HSPAdminStatus="A";

        this.localService
      .insert(JSON.stringify(this.hospitalizationVar),this.CurrentLoginYear)
      .subscribe(
         /* happy path */ p => this.VwBedsRoomsBedTypeHospital = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => {
                              this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'})
                                console.log("saved result=",this.VwBedsRoomsBedTypeHospital);
                                this.router.navigate(['/hospitalizationscreen',this.VwBedsRoomsBedTypeHospital.HSPAdminId]);
                      }
         );
        }
        else{
         this.localService
        .update(JSON.stringify(this.hospitalizationVar),this.CurrentLoginYear)
        .subscribe(
          /* happy path */ p => this.VwBedsRoomsBedTypeHospital = p,
          /* error path */ e => console.log(e),
          /* onComplete */ () => {
                                this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'})
                                  console.log("saved result=",this.VwBedsRoomsBedTypeHospital);
                                  this.router.navigate(['/hospitalizationscreen',this.HSPAdminId]);
                        }
         );
        } 
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'});
        this.clear();
  }
 
filterIPDName(event:any) {
        this.ipdresults = [];
        let query=event.query;
        this.localService
      .getipdmaster_HospitalIdIPDMaster_SearchNamedrp(this.hospitalID,query)
      .subscribe(
         /* happy path */ p => this.ipdresults = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => {this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'})
                                console.log("saved result=",this.VwBedsRoomsBedTypeHospital);
                      }
         );
 
    } 


  ngOnInit() { 

      this.clear();
      
       

        // this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        this.userform = this.fb.group({'HSPAdminDate':new FormControl('', Validators. required),'HSPAdmintime':new FormControl('', Validators. required),'IPDIdHospitalization':new FormControl('', Validators. required),'CategoryIdHospitalizationDepartment':new FormControl('', Validators. required),'DiseaseIdHospitalization':new FormControl('', Validators. required),});
        // this.userform = this.fb.group({'HSPAdminDate':new FormControl('', Validators. required),'HSPAdmintime':new FormControl('', Validators. required),'HSPAdminStatus':new FormControl('', Validators. required),'IPDIdHospitalization':new FormControl('', Validators. required),'CategoryIdHospitalizationDepartment':new FormControl('', Validators. required),'DiseaseIdHospitalization':new FormControl('', Validators. required),});

        //done comment as on 02 may 2017 since we have autocomplete for IPD
        // this.localService.getipdmaster_HospitalIdIPDMasterdrp(this.hospitalID).subscribe(         
        // /* happy path */ p => {
        //       this.drpipdroptions = p;
        //       this.drpipdroptions.unshift({label:"--Select IPD--" , value:"1"} )  
        //     },
        //  /* error path */ e => console.log( e),
        //  /* onComplete */ () => console.log('done drpipdroptions' + JSON.stringify(this.drpipdroptions))
        //  );

        this.localService.getPackage_HospitalIdPackagedrp(this.hospitalID).subscribe(         
        /* happy path */ p => {
              this.drpPackageoptions = p;
              this.drpPackageoptions.unshift({label:"--Select Package--" , value:"1"} )  
            },
         /* error path */ e => console.log( e),
         /* onComplete */ () => 
              {
                  console.log('done drpPackageoptions' + JSON.stringify(this.drpPackageoptions));
                      this.localService.getTrust_HospitalIdTrustdrp(this.hospitalID).subscribe(         
                      /* happy path */ p => {
                            this.drpTrustroptions = p;
                            this.drpTrustroptions.unshift({label:"--Select Trust--" , value:"1"} )  
                          },
                      /* error path */ e => console.log( e),
                      /* onComplete */ () => {console.log('done drpTrustroptions' + JSON.stringify(this.drpTrustroptions))
                                   this.localService.getCategoryMasterdrp(this.categorytype,this.hospitalID).subscribe(         
                                    /* happy path */ p => {
                                          this.drpCategoryroptions = p;
                                          this.drpCategoryroptions.unshift({label:"--Select Category--" , value:"1"} )  
                                        },
                                    /* error path */ e => console.log( e),
                                    /* onComplete */ () => {console.log('done drpCategoryroptions' + JSON.stringify(this.drpCategoryroptions))
                                                this.localService.getDiseasemaster_HospitalIdDiseaseMasterdrp(this.hospitalID).subscribe(         
                                                /* happy path */ p => {
                                                      this.drpDiseaseroptions = p;
                                                      this.drpDiseaseroptions.unshift({label:"--Select Disease--" , value:"1"} )  
                                                    },
                                                /* error path */ e => console.log( e),
                                                /* onComplete */ () => console.log('done drpCategoryroptions' + JSON.stringify(this.drpDiseaseroptions))
                                                );

                                      }
                                    );

                        }
                      );
 
              }
         );
         
         this.drpstatusoptions=[{
           label:"Admitted",
           value:"A"
         },
         {
           label:"Discharged",
           value:"D"
         },
         {
           label:"Cancelled",
           value:"C"
         }];

         this.drpstatusoptions.unshift({label:"--Select Status--" , value:"1"} );

      this.route.params.forEach((params: Params) => {
                this.HSPAdminId= params["billid"];
                if(this.HSPAdminId){
               this.localHospitalizationscreenService.getWS_viewhospitalizationipd_selectedit(this.HSPAdminId).subscribe(         
                  /* happy path */ p => {
                        this.VwBedsRoomsBedTypeHospital = p;
                        this.HSPAdminDate=new Date(this.VwBedsRoomsBedTypeHospital.HSPAdminDate);
                        
                        this.HSPAdmintime=new  Date("01-01-1970 "+this.VwBedsRoomsBedTypeHospital.HSPAdmintime);
                        this.ipdselected={
                          label:this.VwBedsRoomsBedTypeHospital.IPDName,
                          value:this.VwBedsRoomsBedTypeHospital.IPDId
                        };
                        this.hospitalizationVar.PackageIdHospitalization=this.VwBedsRoomsBedTypeHospital.PackageIdHospitalization;
                        this.hospitalizationVar.TrustIdHospitalization=this.VwBedsRoomsBedTypeHospital.TrustIdHospitalization;
                        this.hospitalizationVar.CategoryIdHospitalizationDepartment=this.VwBedsRoomsBedTypeHospital.CategoryIdHospitalizationDepartment;
                        this.hospitalizationVar.DiseaseIdHospitalization=this.VwBedsRoomsBedTypeHospital.DiseaseIdHospitalization;
                        this.hospitalizationVar.HSPAdminStatus=this.VwBedsRoomsBedTypeHospital.HSPAdminStatus;  
                        this.newVwBedsRoomsBedTypeHospital=false;
                        this.hospitalizationVar.HSPAdminId=this.VwBedsRoomsBedTypeHospital.HSPAdminId; 
                        this.hospitalizationVar.HSPAdminStatus=this.VwBedsRoomsBedTypeHospital.HSPAdminStatus;
                      },
                  /* error path */ e => console.log( e),
                  /* onComplete */ () => {

                  }
                  );  
                }
         });



         //this.hospitalizationVar=new hospitalizationTS();
  }


  gotoIPDNew(){
    this.router.navigate(['/ipdmaster']);
  }
    
  
 

  initContact() {
        // initialize our address
        // return this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        return this.userform = this.fb.group({'HSPAdminDate':new FormControl('', Validators. required),'HSPAdmintime':new FormControl('', Validators. required),'HSPAdminStatus':new FormControl('', Validators. required),'IPDIdHospitalization':new FormControl('', Validators. required),'CategoryIdHospitalizationDepartment':new FormControl('', Validators. required),'DiseaseIdHospitalization':new FormControl('', Validators. required),});

    }

  //Dropdown change event capture
  drpchange(events1: any){
    // alert(events1.value);
  }

  get diagnostic() { return JSON.stringify(this.userform.value); }
 }
