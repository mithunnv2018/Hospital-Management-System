import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';


import {SelectItem} from 'primeng/primeng';

import {BaseUrlService} from '../baseurl/baseurl.service';
import {Reportresult} from '../baseurl/reportresult';
import {VwOPDBillPrintingTS} from '../../opdbillcancelreport/VwOPDBillPrintingTS'
// import 'rxjs/add/operator/do';  // for debugging

/**
 * This class provides the NameList service with methods to read names and add names.
 */
@Injectable()
export class OpdbillcancelreportService {

  /**
   * Creates a new NameListService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  //private baseUrl: string = 'http://localhost:8080/TaskManagerWS/rest/atultest/';
  private baseUrl: string;// = 'http://192.168.0.55:8080/TaskManagerWS/rest/taskmanager/';
  private baseUrlcategory:string;  
  private baseUrlhospitalization:string;
  private baseUrlreport:string;

  constructor(private http : Http,private baseurlservice:BaseUrlService){
    this.baseUrl=baseurlservice.getBaseurl()+'opdreceiptbillcancel/';
    this.baseUrlhospitalization=baseurlservice.getBaseurl()+'hospitalization/';
    this.baseUrlcategory=baseurlservice.getBaseurl()+'staffmaster/';
    this.baseUrlreport=baseurlservice.getBaseurl()+'report/';
    //this.baseUrl='http://localhost:3001/';
    

  }
  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {string[]} The Observable for the HTTP request.
   */
  get(): Observable<string[]> {
    return this.http.get('/assets/data.json')
                    .map((res: Response) => res.json())
    //              .do(data => console.log('server data:', data))  // debug
                    .catch(this.handleError);
  }


 

 


////////


printreportforopdreceiptcancel(inparam0: string,inparam1: string,inparam2: string): Observable<Reportresult>{
let headers1 = new Headers();

headers1.append('Content-Type', 'application/x-www-form-urlencoded');
var body1 = `param_hospitalid=${inparam0}&param_fromdate=${ inparam1}&param_todate=${ inparam2}`;
var url2 = `${this.baseUrlreport}WS_OPDBillCancelReport`;
let returnval$ = this.http.post(url2 , body1 ,{headers: headers1})
.map((res:Response) => res.json()).catch(this.handleError);
// .map((res:Response) => res.text()).catch(this.handleError);
return returnval$;
}

getreportforopdreceiptcancel(inparam0: string,inparam1: string,inparam2: string): Observable<VwOPDBillPrintingTS[]>{
let headers1 = new Headers();

headers1.append('Content-Type', 'application/x-www-form-urlencoded');
var body1 = `input0=${ inparam1}&input1=${ inparam2}&input2=${inparam0}`;
var url2 = `${this.baseUrl}WS_VwOPDBillPrinting_bydate_selectjson`;
let returnval$ = this.http.post(url2 , body1 ,{headers: headers1})
.map((res:Response) => res.json()).catch(this.handleError);
// .map((res:Response) => res.text()).catch(this.handleError);
return returnval$;
}


printreportforopdbilldetails(inparam0: string): Observable<Reportresult>{
let headers1 = new Headers();

headers1.append('Content-Type', 'application/x-www-form-urlencoded');
var body1 = `param_opdbilldetailsid=${ inparam0}`;
var url2 = `${this.baseUrlreport}WS_OPDBillDetailsReport`;
let returnval$ = this.http.post(url2 , body1 ,{headers: headers1})
.map((res:Response) => res.json()).catch(this.handleError);
// .map((res:Response) => res.text()).catch(this.handleError);
return returnval$;
}


   private getHeaders(){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }
  private getHeaders2(){
    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });  
    let options = new RequestOptions({ headers: headers });
    return options;
  }
  private getHeadersUrlencode(){
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });  
    let options = new RequestOptions({ headers: headers });
    return options;
  }
  private getHeadersUrlencodeUtf8(){
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' });  
    let options = new RequestOptions({ headers: headers });
    return options;
  }

  /**
    * Handle HTTP error
    */
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}

