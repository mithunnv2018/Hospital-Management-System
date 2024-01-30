import { Component,OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MessagesModule,Message,Growl} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {CountryMasterTS} from '../country/country';
import {DataTableModule} from 'primeng/primeng';
import {SelectItem,CalendarModule} from 'primeng/primeng';

import { MyDateFormat } from '../shared/pipes/mydateformat.pipe';

import { CosmeticbilldetailsService } from '../shared/cosmeticbilldetails/index';

import { Observable } from 'rxjs/Rx';
import {CosmeticBillParticularsTS} from './cosmeticbillparticularsmaster';
import {cosmeticbilldetailsTS} from './cosmeticbilldetails';
import {VwCosmeticBillDetailsPatientDoctorHospitalTS} from './VwCosmeticBillDetailsPatientDoctorHospitalTS';
import { Reportresult } from '../shared/baseurl/reportresult';
//import {vwopdbillhospitalTS} from './vwopdbillhospitalTS';
import {vwcosmeticbillparticularsdetailsTS} from './vwcosmeticbillparticularsdetailsTS';
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import {HospitalizationService} from '../shared/hospitalization/hospitalization.service';

import {taxheadmasterTS} from './taxheadmasterTS';
import {CosmeticBillTaxDetailsTS} from './CosmeticBillTaxDetailsTS';

/**
 * This class represents the lazy loaded countryComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-cosmeticbilldetails',
  templateUrl: 'cosmeticbilldetails.component.html',
  styleUrls: ['cosmeticbilldetails.component.css'],
  providers:[MyDateFormat,ConfirmationService]

})
export class CosmeticBillDetailsComponent implements OnInit {
  
  userform: FormGroup;
  usersubform:FormGroup;


  country_contacts:FormGroup;
  msgs: Message[]=[];
   
  VwCosmeticBillDetailsPatientDoctorHospital:VwCosmeticBillDetailsPatientDoctorHospitalTS[]=[];

   submitted: boolean;
   submittedcontact:boolean;
   cosmeticbilldetailsVar: cosmeticbilldetailsTS;
   selectedRow: VwCosmeticBillDetailsPatientDoctorHospitalTS;

   //new sub form ts
   cosmeticbillparticularsVar:vwcosmeticbillparticularsdetailsTS;//CosmeticBillParticularsTS;

   vwcosmeticbillparticularsdetailsVar:vwcosmeticbillparticularsdetailsTS[]=[];


   newVwCosmeticBillDetailsPatientDoctorHospital: boolean;
   newcontact: boolean;

    hospitalID:string="";
    memberID:string="";
    CurrentLoginYear:string="";

    CosmeticBillDetailsDate:Date;
     

    drpipdoptions:SelectItem[]=[];
    drpdoctoroptions:SelectItem[]=[];

    drpbillparticularsoptions:SelectItem[]=[];
    
    drppaymenttypeoptions:SelectItem[]=[];

    ipdselected:SelectItem;
    ipdresults:SelectItem[]=[];    

   docselected:SelectItem;
   docresults:SelectItem[]=[];   

   taxheadmastersVar:taxheadmasterTS[]=[];
   cosmeticBillTaxDetailsTSVar:CosmeticBillTaxDetailsTS[]=[];

   amounttoshow:string="";

  fromdate:Date;
  todate:Date;
  drpstatuscosbill:SelectItem[]=[]
  selectedstatuscobill:string="";

   clear(){
        this.  newVwCosmeticBillDetailsPatientDoctorHospital=true;
        this.cosmeticbilldetailsVar=new cosmeticbilldetailsTS();

        this.CosmeticBillDetailsDate=null;

        this.cosmeticbillparticularsVar=new vwcosmeticbillparticularsdetailsTS();     

        this.vwcosmeticbillparticularsdetailsVar=[];
        this.ipdselected=null;
        this.docselected=null;
        this.cosmeticbilldetailsVar.CosmeticBillDetailsDiscount="0";
        this.amounttoshow="";
        //this.downloadfile("DUMMY");
    }

      
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private localService: CosmeticbilldetailsService,
              private localHospitalizationService: HospitalizationService ,
              private mydate1: MyDateFormat,
              private confirmationService:ConfirmationService){
                
               this.hospitalID=localStorage.getItem('hospitalID');  
               this.memberID=localStorage.getItem('memberID');  
               this.CurrentLoginYear=localStorage.getItem('CurrentLoginYear');  
                
  }





  onSubmit(){
        this.aftercalldate();

        //alert(JSON.stringify(this.selectedRow));
        this.cosmeticbilldetailsVar.CosmeticBillDetailsDate=this.mydate1.parse(this.CosmeticBillDetailsDate);
        
        this.cosmeticbilldetailsVar.HospitalIdCosmeticBillDetails=this.hospitalID;
        this.cosmeticbilldetailsVar.MemberIdCosmeticBillDetails=this.memberID;
        this.cosmeticbilldetailsVar.CosmeticBillDetailsYear=this.CurrentLoginYear;
        
        this.cosmeticbilldetailsVar.IPDIdCosmeticBillDetails=this.ipdselected.value;

        this.cosmeticbilldetailsVar.DoctorIdCosmeticBillDetails=this.docselected.value;


        this.submitted = true;
        this.msgs = [];
        console.log(JSON.stringify(this.cosmeticbilldetailsVar));
        this.msgs.push({severity:'info', summary:'Please wait', detail:'Form Submitted Successfully.. Please wait..'})
        if(this.  newVwCosmeticBillDetailsPatientDoctorHospital){
          this.localService
            .insert(JSON.stringify(this.cosmeticbilldetailsVar),JSON.stringify(this.vwcosmeticbillparticularsdetailsVar),JSON.stringify(this.cosmeticBillTaxDetailsTSVar))
            .subscribe(
              /* happy path */ p => {
                // this.VwCosmeticBillDetailsPatientDoctorHospital = p;
                let temp=p;
                this.printReceipt(temp);
            },
              /* error path */ e => console.log(e),
              /* onComplete */ () => {
                this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'});
                // this.localService.getall(this.memberID,this.CurrentLoginYear,this.hospitalID)
                //     .subscribe(
                //       /* happy path */ p => this.VwCosmeticBillDetailsPatientDoctorHospital= p,
                //       /* error path */ e => console.log( e),
                //       /* onComplete */ () => console.log('done getDisplayAll2' + JSON.stringify(this.VwCosmeticBillDetailsPatientDoctorHospital)));                
              }
            );
        }
         
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'});
        this.clear();
  }
  filterDOCName(event:any) {
        this.docresults = [];
        let query=event.query;
        this.localHospitalizationService
      .getWS_doctormaster_HospitalIdDoctorMaster_byDoctorName_drpjson(this.hospitalID,query)
      .subscribe(
         /* happy path */ p => this.docresults = p,
         /* error path */ e => console.log(e),
         /* onComplete */ () => {this.msgs.push({severity:'info', summary:'Success', detail:'Form Update Successfully'})
                                
                      }
         );
 
    }


  onSubmitParticulars(){
    
    let a=this.cosmeticbillparticularsVar.CosmeticBillParticularsIdCosmeticBillParticularsDetails;
    let b:SelectItem;

    b=this.drpbillparticularsoptions.find(parti=>parti.value===a);

    this.cosmeticbillparticularsVar.CosmeticBillParticularsName=b.label;

    this.vwcosmeticbillparticularsdetailsVar.push(this.cosmeticbillparticularsVar);
    this.cosmeticbillparticularsVar=new vwcosmeticbillparticularsdetailsTS();

    this.calculateAmountSum();
  }

  deleteSubmitParticularsRow(cont: vwcosmeticbillparticularsdetailsTS) {


      this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {


            let selectedkeywordgridRow:vwcosmeticbillparticularsdetailsTS=cont;
            this.vwcosmeticbillparticularsdetailsVar.splice(this.findSelectedKeywordSubcatIndex(selectedkeywordgridRow), 1);
            cont = null;
            // this.selectedkeywordgridRow=null;
            
            // this.clearKeywordSubcat();
            this.calculateAmountSum();

            this.msgs = [];
            this.msgs.push({severity:'info', summary:'Confirmed', detail:'You have accepted'});
            }
        });

  }

  findSelectedKeywordSubcatIndex(p:vwcosmeticbillparticularsdetailsTS): number {
        return this.vwcosmeticbillparticularsdetailsVar.indexOf(p);
  }  


  gotoIPDNew(){
    this.router.navigate(['/ipdmaster']);
  }
    
    

  ngOnInit() { 
 
      this.clear();
      
      this.userform = this.fb.group({'IPDIdCosmeticBillDetails':new FormControl('', Validators. required),
                'CosmeticBillDetailsBillAmt':new FormControl('', Validators. required),
                'CosmeticBillDetailsTotalAmt':new FormControl('', Validators. required),
                'CosmeticBillDetailsDate':new FormControl('', Validators. required),
                'DoctorIdCosmeticBillDetails':new FormControl('', Validators. required),
                'CosmeticBillDetailsPaymentType':new FormControl('', Validators. required),});
      // this.userform = this.fb.group({'CosmeticBillDetailsNos':new FormControl('', Validators. required),'IPDIdCosmeticBillDetails':new FormControl('', Validators. required),'CosmeticBillDetailsBillAmt':new FormControl('', Validators. required),'CosmeticBillDetailsTotalAmt':new FormControl('', Validators. required),'CosmeticBillDetailsDate':new FormControl('', Validators. required),'DoctorIdCosmeticBillDetails':new FormControl('', Validators. required),'CosmeticBillDetailsPaymentType':new FormControl('', Validators. required),});

      this.usersubform = this.fb.group({'CosmeticBillParticularsAmount':new FormControl('', Validators. required),});

        
          this.localService.getipdmaster_HospitalIdIPDMasterdrp(this.hospitalID).subscribe(         
        /* happy path */ p => {
            this. drpipdoptions = p;
            this.drpipdoptions.unshift({label:"--Select IPD--" , value:"1"} )
          },
         /* error path */ e => console.log( e),
         /* onComplete */ () =>{ console.log('done getDisplayAll2' + JSON.stringify(this.drpipdoptions));
                
                                this.localService.getcosmeticbillparticulars_HspCosBillParticulars_drpjson(this.hospitalID).subscribe(         
                                /* happy path */ p => {
                                    this. drpbillparticularsoptions = p;
                                    this.drpbillparticularsoptions.unshift({label:"--Select Patriculars--" , value:"1"} )
                                  },
                                /* error path */ e => console.log( e),
                                /* onComplete */ () => {console.log('done getDisplayAll2' + JSON.stringify(this.drpbillparticularsoptions))
                                             
                                                  this.localService.getWS_taxheadmaster_percent_selectjson(this.hospitalID,this.CurrentLoginYear)
                                                  .subscribe(
                                                    /* happy path */ p => this.taxheadmastersVar= p,
                                                    /* error path */ e => console.log( e),
                                                    /* onComplete */ () => {console.log('done getDisplayAll2');
                                                      
                                                    }
                                                  );  
                                              }
                                            );

                                  }
                                );
                    
                     

              
            
        


        this.drppaymenttypeoptions=[{
          label:"--Select Payment Type",
          value:"1"
        },
        {
          label:"Cash",
          value:"Cash"
        },
        {
          label:"Cheque",
          value:"Cheque"
        },
        {
          label:"Debit / Credit Card",
          value:"DebitCredit"
        },
        {
          label:"Net Banking",
          value:"NetBanking"
        },
        {
          label:"RTGS",
          value:"RTGS"
        }] ;         

         this.cosmeticbilldetailsVar=new cosmeticbilldetailsTS();
         this.cosmeticbilldetailsVar.CosmeticBillDetailsDiscount="0";
         this.drpstatuscosbill=[
           {
             label:"Active",
             value:"active"
           },
           {
             label:"Cancel",
             value:"cancelled"
           }
         ];
  }

      mysort(event:any) {
      let comparer = function (a:VwCosmeticBillDetailsPatientDoctorHospitalTS, b:VwCosmeticBillDetailsPatientDoctorHospitalTS): number {
        let date1=new Date(a.CosmeticBillDetailsDate);
        let date2=new Date(b.CosmeticBillDetailsDate);
        
        let tempa=mydatetemp.parse(date1);
        let tempb=mydatetemp.parse(date2);
        
        let realdate1=new Date(tempa);
        let realdate2=new Date(tempb);
        
        console.log("The 1 dates are=",realdate1);  
        console.log("The 2 dates are=",realdate2);

        let result: number = -1;
        
        if(realdate1.getTime() >realdate2.getTime())result=1;  
        
        return result * event.order;
      };

      let mydatetemp=this.mydate1;

      this.VwCosmeticBillDetailsPatientDoctorHospital.sort(comparer);
   }

search(){
  let strfromdate=this.mydate1.parse(this.fromdate);
  let strtodate=this.mydate1.parse(this.todate);
  let status=this.selectedstatuscobill;


  this.localService.getall(strfromdate,strtodate,status).subscribe(p=>{
    this.VwCosmeticBillDetailsPatientDoctorHospital=p;
  },
  e=> console.log(e),
  ()=>{
    console.log("Got the search data");
  });      

}
cancelReceipt(recep:any){
  let id=recep.CosmeticBillDetailsId;
  this.localService.setcancel(id).subscribe(p=>{
    
  },
  e=> console.log(e),
  ()=>{
    console.log("set cancel");
    this.msgs.push({severity:'info', summary:'Alert', detail:'You have cancelled Bill :'+id });
  }); 
}
  printReceipt(reciptvw:any){
      let id=reciptvw.CosmeticBillDetailsId;
      
      let resultofws:Reportresult;
      console.log("cosmeticbilldetailsid is "+id,reciptvw);
      
      this.localService.printreportforcosmeticbilldetails(id).subscribe(         
        /* happy path */ p => {
             resultofws=p;
             
          },
         /* error path */ e => console.log( e),
         /* onComplete */ () => {
           let a=resultofws.FilePath;
           if(a){
             window.open(a);
           }   
            
         }
        );
  }

filterIPDName(event:any) {
        this.ipdresults = [];

        let b=this.drpipdoptions.find(parti=>parti.label===event.query);

        
        for(let i = 0; i < this.drpipdoptions.length; i++) {
            let ipdopt = this.drpipdoptions[i];
            if(ipdopt.label.toLowerCase().indexOf(event.query.toLowerCase())==0){
              this.ipdresults.push(ipdopt);
            }
         }
    }

calculateAmountSum(){
  
  this.cosmeticBillTaxDetailsTSVar=[]
  let amount2=0;
  for(let i=0;i<this.vwcosmeticbillparticularsdetailsVar.length;i++){
    
      let temp=this.vwcosmeticbillparticularsdetailsVar[i].CosmeticBillParticularsDetailsAmount;//CosmeticBillParticularsAmount;
      amount2=amount2+Number(temp);
  }
  this.cosmeticbilldetailsVar.CosmeticBillDetailsBillAmt=amount2+"";

  let discount=0;
  
  if(this.cosmeticbilldetailsVar.CosmeticBillDetailsDiscount){
    discount=Number(this.cosmeticbilldetailsVar.CosmeticBillDetailsDiscount);
  }

  let totalamount=amount2-discount;
  let realtotalamount=0;

  this.amounttoshow=totalamount+"";

  this.taxheadmastersVar.forEach(a=>{
    let headname=a.TaxHeadName;
    let perc=parseFloat(a.TaxHeadPercent);
    let realamount=0;
    realamount=totalamount*perc;
    realamount=realamount/100;
    
    let realamount2=Math.abs(realamount);

    let cosmticbill =new CosmeticBillTaxDetailsTS();
    cosmticbill.CosmeticBillTaxName=headname;
    cosmticbill.CosmeticBillTaxPercentage=perc.toString();
    cosmticbill.CosmeticBillTaxAmount=realamount2.toString();

    this.cosmeticBillTaxDetailsTSVar.push(cosmticbill);

    realtotalamount+=realamount2;
  });

    realtotalamount+=totalamount;
    realtotalamount=Math.round(realtotalamount);
  this.cosmeticbilldetailsVar.CosmeticBillDetailsTotalAmt=realtotalamount+"";


}

    aftercalldate(){
      this.CosmeticBillDetailsDate= new Date(Number(this.cosmeticbilldetailsVar.CosmeticBillDetailsDate));
    }

 

  initContact() {
        // initialize our address
        // return this.userform = this.fb.group({'country_name':new FormControl('', Validators. required),'country_aliasname':new FormControl('', Validators. required),});
        //return this.userform = this.fb.group({'CountryName':new FormControl('', Validators. required),'CountryAliasName':new FormControl('', Validators. required),});
        return this.userform = this.fb.group({'IPDIdCosmeticBillDetails':new FormControl('', Validators. required),'CosmeticBillDetailsBillAmt':new FormControl('', Validators. required),'CosmeticBillDetailsTotalAmt':new FormControl('', Validators. required),'CosmeticBillDetailsDate':new FormControl('', Validators. required),'DoctorIdCosmeticBillDetails':new FormControl('', Validators. required),'CosmeticBillDetailsPaymentType':new FormControl('', Validators. required),});


    }

  //Dropdown change event capture
  drpchange(events1: any){
    // alert(events1.value);
  }

  

  get diagnostic() { return JSON.stringify(this.userform.value); }
 }
