import { Component } from "angular2/core";
import {
  Control
} from 'angular2/common';
class Query{
  name:string;
  query:string;
}

@Component({
  selector: 'query-builder',
  template: `
  <div class="row">
    <textarea rows="2" cols="100%" style="width:100%" [(ngModel)]="query" [ngFormControl]="queryText"></textarea>
  </div>
  <div class="row">
      <select (change)="changeTemplate($event)"  ng-control="selectedTemplate">
          <option *ngFor="#t of queryTemplates" value="{{t.name}}">{{t.name}}</option>
      </select>
      <button type="button" class="btn btn-default btn-sm">保存</button>
      <button type="button" class="btn btn-default btn-sm">Share</button>
  </div>
  `
})
export class QueryComponent{
  queryTemplates:Query[]=[{name:'t-order',query:'{uid=200}'},{name:'酒店订单',query:'orderid=123 AND uid=222'}];
  query:string="{*}";
  selectedTemplate:string;
  queryText:Control;

  constructor() {
    this.queryText = new Control();
    this.queryText.valueChanges.subscribe(
      (data) => {
        console.log(data);
      });
  }

  changeTemplate($event){
    const value:string = (<HTMLSelectElement>event.srcElement).value;
    for(let i=0;i<this.queryTemplates.length;i++){
      if(this.queryTemplates[i].name==value){
        this.query=this.queryTemplates[i].query;
      }
    }
  }
}