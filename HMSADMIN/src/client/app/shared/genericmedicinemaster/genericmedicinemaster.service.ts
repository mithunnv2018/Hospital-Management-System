import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { genericmedicinemasterTS} from '../../genericmedicinemaster/genericmedicinemaster';
import {tbl_uploadedfile_masterTS} from '../../genericmedicinemaster/tbl_uploadedfile_masterTS';
import {SelectItem} from 'primeng/primeng';
import {vwgenericmedicinechemicalmasterTS} from '../../genericmedicinemaster/vwgenericmedicinechemicalmasterTS';

import {BaseUrlService} from '../baseurl/baseurl.service';
// import 'rxjs/add/operator/do';  // for debugging

/**
 * This class provides the NameList service with methods to read names and add names.
 */
@Injectable()
export class GenericmedicinemasterService {

  /**
   * Creates a new NameListService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  //private baseUrl: string = 'http://localhost:8080/TaskManagerWS/rest/atultest/';
  private baseUrl: string;// = 'http://192.168.0.55:8080/TaskManagerWS/rest/taskmanager/';
  private baseUrlcategory:string;  
  private baseUrlhospitalization:string;

  constructor(private http : Http,private baseurlservice:BaseUrlService){
    this.baseUrl=baseurlservice.getBaseurl()+'genericmedicinemaster/';
    this.baseUrlhospitalization=baseurlservice.getBaseurl()+'hospitalization/';
    this.baseUrlcategory=baseurlservice.getBaseurl()+'staffmaster/';
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


 

 

// insert(inparam0: string,inparam1: string): Observable<vwhospitalizationipdpackagetrustcategorydiseasedetailsTS>{
// let headers1 = new Headers();

// headers1.append('Content-Type', 'application/x-www-form-urlencoded');
// var body1 = `input0=${ inparam0}&input1=${ inparam1}`;
// var url2 = `${this.baseUrl}WS_hospitalization_create`;
// let returnval$ = this.http.post(url2 , body1 ,{headers: headers1})
// .map((res:Response) => res.json()).catch(this.handleError);
// return returnval$;
// }

////////


////start here actual genericmedicinemaster.
insert(inparam0: string): Observable<vwgenericmedicinechemicalmasterTS[]>{
let headers1 = new Headers();

headers1.append('Content-Type', 'application/x-www-form-urlencoded');
var body1 = `input0=${ inparam0}`;
var url2 = `${this.baseUrl}WS_genericmedicinemaster_create`;
let returnval$ = this.http.post(url2 , body1 ,{headers: headers1})
.map((res:Response) => res.json()).catch(this.handleError);
return returnval$;
}

 

update(inparam0: string): Observable<vwgenericmedicinechemicalmasterTS[]>{
let headers1 = new Headers();

headers1.append('Content-Type', 'application/x-www-form-urlencoded');
var body1 = `input0=${ inparam0}`;
var url2 = `${this.baseUrl}WS_genericmedicinemaster_update`;
let returnval$ = this.http.post(url2 , body1 ,{headers: headers1})
.map((res:Response) => res.json()).catch(this.handleError);
return returnval$;
}

 

getall(inparam0: string): Observable<vwgenericmedicinechemicalmasterTS[]>{
let headers1 = new Headers();

headers1.append('Content-Type', 'application/x-www-form-urlencoded');
var body1 = `input0=${ inparam0}`;
var url2 = `${this.baseUrl}WS_vwgenericmedicinechemicalmaster_selectjson`;
let returnval$ = this.http.post(url2 , body1 ,{headers: headers1})
.map((res:Response) => res.json()).catch(this.handleError);
return returnval$;
}

 

edit(inparam0: string): Observable<genericmedicinemasterTS>{
let headers1 = new Headers();

headers1.append('Content-Type', 'application/x-www-form-urlencoded');
var body1 = `input0=${ inparam0}`;
var url2 = `${this.baseUrl}WS_genericmedicinemaster_selectedit`;
let returnval$ = this.http.post(url2 , body1 ,{headers: headers1})
.map((res:Response) => res.json()).catch(this.handleError);
return returnval$;
}

 getgenericchemicalmasterdrp(inparam0:string): Observable<SelectItem[]>{
let headers1 = new Headers();

headers1.append('Content-Type', 'application/x-www-form-urlencoded');
var body1 = `input0=${ inparam0}`;
var url2 = `${this.baseUrl}WS_genericchemicalmaster_drpjson`;
let returnval$ = this.http.post(url2 , body1 ,{headers: headers1})
.map((res:Response) => res.json()).catch(this.handleError);
return returnval$;
}


importWS_genericmedicine_excelsave(inparam0: string,inparam1: string): Observable<vwgenericmedicinechemicalmasterTS[]>{
let headers1 = new Headers();

headers1.append('Content-Type', 'application/x-www-form-urlencoded');
var body1 = `input0=${ inparam0}&input1=${ inparam1}`;
var url2 = `${this.baseUrl}WS_genericmedicine_excelsave`;
let returnval$ = this.http.post(url2 , body1 ,{headers: headers1})
.map((res:Response) => res.json()).catch(this.handleError);
return returnval$;
}

getWS_genericchemicalmaster_autocomplete_drpjson(inparam0: string,inparam1: string): Observable<SelectItem[]>{
let headers1 = new Headers();

headers1.append('Content-Type', 'application/x-www-form-urlencoded');
var body1 = `input0=${ inparam0}&input1=${ inparam1}`;
var url2 = `${this.baseUrl}WS_genericchemicalmaster_autocomplete_drpjson`;
let returnval$ = this.http.post(url2 , body1 ,{headers: headers1})
.map((res:Response) => res.json()).catch(this.handleError);
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

