import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { CountryMasterTS } from '../../country/country';
import {statemasterTS } from '../../statemaster/statemaster';
import {vw_state_countryTS} from '../../statemaster/vw_state_countryTS';

import {SelectItem} from 'primeng/primeng';

import {BaseUrlService} from '../baseurl/baseurl.service';
// import 'rxjs/add/operator/do';  // for debugging

/**
 * This class provides the NameList service with methods to read names and add names.
 */
@Injectable()
export class StateMasterService {

  /**
   * Creates a new NameListService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  //private baseUrl: string = 'http://localhost:8080/TaskManagerWS/rest/atultest/';
  private baseUrl: string;// = 'http://192.168.0.55:8080/TaskManagerWS/rest/taskmanager/';
  
  constructor(private http : Http,private baseurlservice:BaseUrlService){
    this.baseUrl=baseurlservice.getBaseurl()+'statemaster/';

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

ORGINALgetMyFileFromBackend(mycontent: string): Observable<any>{
     let headers1 = new Headers();

    headers1.append('Content-Type', 'application/json');
    var body1 = `{"template":{"shortid":"r1r3XY4Ae","recipe":"phantom-pdf","preview":true},"data":{"countrylist":${mycontent}}}`;
    // var body1 = `{"template":{"shortid":"r1r3XY4Ae","recipe":"html-to-xlsx","preview":true},"data":{"countrylist":${mycontent}}}`;
    var url2 = `http://localhost:3005/reporting/api/report`;
    let returnval$ = this.http.post(url2 , body1 ,{responseType:ResponseContentType.Blob, headers: headers1})
    .map((res:Response) => res.blob()).catch(this.handleError);
    return returnval$;       
}

getMyFileFromBackend(typeName: string): Observable<any>{
     let headers1 = new Headers();

    headers1.append('Content-Type', 'application/x-www-form-urlencoded');
    var body1 =  `{"template":{"shortid":"r1bnuSAog","recipe":"phantom-pdf","preview":true},"data":{"mytitle":"HI FROM MITH","baseurl":"http://localhost:3005/"}}`;
    var url2 = `${this.baseUrl}myreport`;
    let returnval$ = this.http.post(url2 , body1 ,{ headers: headers1})
    .map((res:Response) => res.text()).catch(this.handleError);
    return returnval$;       
} 

insert(inparam0: string): Observable<vw_state_countryTS[]>{
    let headers1 = new Headers();

    headers1.append('Content-Type', 'application/x-www-form-urlencoded');
    var body1 = `input0=${ inparam0}`;
    var url2 = `${this.baseUrl}WS_statemaster_create`;
    let returnval$ = this.http.post(url2 , body1 ,{headers: headers1})
    .map((res:Response) => res.json()).catch(this.handleError);
    return returnval$;
}

 

update(inparam0: string): Observable<vw_state_countryTS[]>{
    let headers1 = new Headers();

    headers1.append('Content-Type', 'application/x-www-form-urlencoded');
    var body1 = `input0=${ inparam0}`;
    var url2 = `${this.baseUrl}WS_statemaster_update`;
    let returnval$ = this.http.post(url2 , body1 ,{headers: headers1})
    .map((res:Response) => res.json()).catch(this.handleError);
    return returnval$;
}

 

getall(inparam0: string): Observable<vw_state_countryTS[]>{
  let headers1 = new Headers();

  headers1.append('Content-Type', 'application/x-www-form-urlencoded');
  var body1 = `input0=${ inparam0}`;
  var url2 = `${this.baseUrl}WS_vw_state_country_selectjson`;
  let returnval$ = this.http.post(url2 , body1 ,{headers: headers1})
  .map((res:Response) => res.json()).catch(this.handleError);
  return returnval$;
}

 

edit(inparam0: string): Observable<statemasterTS>{
    let headers1 = new Headers();

    headers1.append('Content-Type', 'application/x-www-form-urlencoded');
    var body1 = `input0=${ inparam0}`;
    var url2 = `${this.baseUrl}WS_statemaster_selectedit`;
    let returnval$ = this.http.post(url2 , body1 ,{headers: headers1})
    .map((res:Response) => res.json()).catch(this.handleError);
    return returnval$;
}

 getCountryMasterdrp(inparam0: string): Observable<SelectItem[]>{
    let headers1 = new Headers();

    headers1.append('Content-Type', 'application/x-www-form-urlencoded');
    var body1 = `input0=${inparam0}`;
    var url2 = `${this.baseUrl}WS_CountryMaster_drpjson`;
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

