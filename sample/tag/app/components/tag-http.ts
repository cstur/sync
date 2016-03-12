/*
 * Angular
 */
import { Component } from 'angular2/core';
import { JsonPipe, CORE_DIRECTIVES } from 'angular2/common';
import {
  Http,
  Response,
  RequestOptions,
  Headers, Request, RequestMethod
} from 'angular2/http';

@Component({
  selector: 'tag-http',
  directives: [CORE_DIRECTIVES],
  pipes: [JsonPipe],
  template: `
  <button type="button" (click)="getFields()">Make Headers</button>
  <div *ngIf="loading">loading...</div>
  <pre>{{data | json}}</pre>
`
})
export class TagHTTPRequests {
  data: Object;
  loading: boolean;
  tag_rest_api:string;

  constructor(public http: Http) {
    this.tag_rest_api="/cat/r/tag"; 
  }

  getFields(): void {

    this.http.request(new Request({
        method: RequestMethod.Get,
        url: this.tag_rest_api,
        search: 'op=getFieldMapping&forceDownload=json&index=shopping'
      }))

      .subscribe((res: Response) => {
        this.data = res.json();
      });
  }
}
