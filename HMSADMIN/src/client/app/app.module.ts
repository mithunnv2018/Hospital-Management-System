import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

import {PanelModule} from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';
import {MessagesModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';

import { AboutModule } from './about/about.module';
import { HomeModule } from './home/home.module';
// import { democompModule } from './democomp/democomp.module';
import { LoginModule } from './login/login.module';
 
import { SharedModule } from './shared/shared.module';
import {InputTextModule} from 'primeng/primeng';
import {DataTableModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';
import {SpinnerModule} from 'primeng/primeng';
import {EditorModule,SharedModule as primengSharedModule} from 'primeng/primeng';
import {CalendarModule,InputTextareaModule} from 'primeng/primeng';
import {FileUploadModule,ScheduleModule} from 'primeng/primeng';

//as done on 9 feb 2017 by Mandar for userrights form
import {InputSwitchModule} from 'primeng/primeng';

import {AuthGuard} from './login/auth.guard';
import {ProjectModule} from './project/project.module';

import {UserrightsModule} from './userrights/userrights.module';
import { CountryModule } from './country/country.module';
import { StateMasterModule } from './statemaster/statemaster.module';
import { CityMasterModule } from './citymaster/citymaster.module';
import { HospitalMasterModule } from './hospitalmaster/hospitalmaster.module';
import { CategoryMasterModule } from './categorymaster/categorymaster.module';
import {StaffMasterModule } from './staffmaster/staffmaster.module';
import {RoomsMasterModule } from './roomsmaster/roomsmaster.module';
import {BedsMasterModule } from './bedsmaster/bedsmaster.module';
import {SurgeryModule } from './surgery/surgery.module';
import {PackageMasterModule } from './packagemaster/packagemaster.module';
import {OpdbillparticularsMasterModule } from './opdbillparticularsmaster/opdbillparticularsmaster.module';
import {ManufacturerMasterModule } from './manufacturermaster/manufacturermaster.module';
import {PatientmedicalrecordMasterModule } from './patientmedicalrecordmaster/patientmedicalrecordmaster.module';
import {SonographyheadsMasterModule } from './sonographyheadsmaster/sonographyheadsmaster.module';
import {SupplierMasterModule } from './suppliermaster/suppliermaster.module';
import {TrustMasterModule } from './trustmaster/trustmaster.module';
import {DoctorMasterModule } from './doctormaster/doctormaster.module';
import {IpdbillingheadsMasterModule } from './ipdbillingheadsmaster/ipdbillingheadsmaster.module';
import {InsuranceMasterModule } from './insurancemaster/insurancemaster.module';
import {IpdMasterModule } from './ipdmaster/ipdmaster.module';
import {OpdreceiptModule } from './opdreceipt/opdreceipt.module';
import {OPDBillDetailsModule } from './opdbilldetails/opdbilldetails.module';
import {DiseaseMasterModule } from './diseasemaster/diseasemaster.module';
import {HospitalizationModule } from './hospitalization/hospitalization.module';
import {HospitalizationscreenModule } from './hospitalizationscreen/hospitalizationscreen.module';
import {HspipdheadsModule } from './hspipdheads/hspipdheads.module';
import {HspotherheadsdetailsModule } from './hspotherheadsdetails/hspotherheadsdetails.module';
import {HospitalizationsearchModule } from './hospitalizationsearch/hospitalizationsearch.module';
import {SonographychargesModule } from './sonographycharges/sonographycharges.module';
import {HspdoctorvisitdetailsModule } from './hspdoctorvisitdetails/hspdoctorvisitdetails.module';
import {HspdailychargesdetailsModule } from './hspdailychargesdetails/hspdailychargesdetails.module';
import {RoomallotmentModule } from './roomallotment/roomallotment.module';
import {IpdreceiptModule } from './ipdreceipt/ipdreceipt.module';
import {BillingModule } from './billing/billing.module';
import {HspipddischargedetailsModule } from './hspipddischargedetails/hspipddischargedetails.module';
import {IpdpapersModule } from './ipdpapers/ipdpapers.module';
import {IpdreceiptcancelModule } from './ipdreceiptcancel/ipdreceiptcancel.module';
import {OpdreceiptcancelModule } from './opdreceiptcancel/opdreceiptcancel.module';
import {OpdbillcancelModule } from './opdbillcancel/opdbillcancel.module';
import {IpdreceiptcancelreportModule } from './ipdreceiptcancelreport/ipdreceiptcancelreport.module';
import {OpdreceiptcancelreportModule } from './opdreceiptcancelreport/opdreceiptcancelreport.module';
import {OpdbillcancelreportModule } from './opdbillcancelreport/opdbillcancelreport.module';
import {OpdbillsortbyparticularsreportModule } from './opdbillsortbyparticularsreport/opdbillsortbyparticularsreport.module';
import {IpdpaymentdischargereportModule } from './ipdpaymentdischargereport/ipdpaymentdischargereport.module';
import {IpddoctorchargesreportModule} from './ipddoctorchargesreport/ipddoctorchargesreport.module';
import {IpddoctorchargesdetailsreportModule} from './ipddoctorchargesdetailsreport/ipddoctorchargesdetailsreport.module';
import {GenericmedicinemasterModule} from './genericmedicinemaster/genericmedicinemaster.module';
import {GenericchemicalmasterModule} from './genericchemicalmaster/genericchemicalmaster.module';
import {OpdprescriptionModule} from './opdprescription/opdprescription.module';

import {CosmeticBillParticularsMasterModule} from './cosmeticbillparticularsmaster/cosmeticbillparticularsmaster.module';
import {CosmeticBillDetailsModule} from './cosmeticbilldetails/cosmeticbilldetails.module';    

@NgModule({
  imports: [BrowserModule, 
  HttpModule, AppRoutingModule,
  FormsModule,ReactiveFormsModule,EditorModule,primengSharedModule,
  GrowlModule,PanelModule,MessagesModule,ButtonModule,DropdownModule,DataTableModule,DialogModule,CalendarModule,FileUploadModule,InputTextareaModule,SpinnerModule,
  // FormsModule,PanelModule,ReactiveFormsModule,GrowlModule,MessagesModule,
    HomeModule,LoginModule, InputSwitchModule,ScheduleModule,
   UserrightsModule,
  StateMasterModule, CountryModule,CityMasterModule,HospitalMasterModule,CategoryMasterModule,StaffMasterModule,
  RoomsMasterModule,BedsMasterModule, SurgeryModule,PackageMasterModule, OpdbillparticularsMasterModule,
  ManufacturerMasterModule,PatientmedicalrecordMasterModule,SonographyheadsMasterModule,SupplierMasterModule,
  TrustMasterModule,DoctorMasterModule,IpdbillingheadsMasterModule,InsuranceMasterModule,IpdMasterModule,
  OpdreceiptModule,OPDBillDetailsModule,DiseaseMasterModule,HospitalizationModule,HospitalizationscreenModule,
  HspipdheadsModule,HspotherheadsdetailsModule,HospitalizationsearchModule,SonographychargesModule,
  HspdoctorvisitdetailsModule,HspdailychargesdetailsModule,RoomallotmentModule,IpdreceiptModule,
  BillingModule,HspipddischargedetailsModule,IpdpapersModule,IpdreceiptcancelModule,OpdreceiptcancelModule,
  OpdbillcancelModule,IpdreceiptcancelreportModule,OpdreceiptcancelreportModule,OpdbillcancelreportModule,
  OpdbillsortbyparticularsreportModule,IpdpaymentdischargereportModule,IpddoctorchargesreportModule,
  IpddoctorchargesdetailsreportModule,GenericmedicinemasterModule,GenericchemicalmasterModule,
  OpdprescriptionModule, CosmeticBillParticularsMasterModule,
  ProjectModule,CosmeticBillDetailsModule,
  AboutModule, InputTextModule, SharedModule.forRoot()],
  declarations: [AppComponent],
  providers: [
    AuthGuard,
    {
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  }],
  bootstrap: [AppComponent]

})
export class AppModule { }
