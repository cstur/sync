import {Injectable, bind} from 'angular2/core';
import {Location} from 'angular2/router';
import {Http, Response, Request, RequestMethod} from 'angular2/http';
import {Observable} from 'rxjs';

@Injectable()
export class TagService {  
  tag_rest_api:string;

  constructor(private _http: Http) {
    this.tag_rest_api="/cat/r/tag"; 
  }

  loadTopics() {
    var array=['shopping','booking'];
    return array;
  }

  loadFieldMappings() {
    
    return this._http.request(new Request({
        method: RequestMethod.Get,
        url: this.tag_rest_api,
        search: 'op=getFieldMapping&forceDownload=json&index=shopping'
      }))

    .map(response => response.json());
    
  }

  loadTable(form:any){
    
    return this._http.request(new Request({
        method: RequestMethod.Get,
        url: this.tag_rest_api,
        search: 'endTime=1457060795000&mode=composite&query=*&startTime=1457060400000&index=shopping&op=query&forceDownload=json'
    }))

    .map(response =>  response.json());
    
  }
}

export var tagServiceInjectables: Array<any> = [
  bind(TagService).toClass(TagService)
];
