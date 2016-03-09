import { Component } from 'angular2/core';
import { FORM_DIRECTIVES,  FormBuilder, ControlGroup,Control,Validators,AbstractControl} from 'angular2/common';
import {TagService} from './tag-service';

import {QueryComponent} from "./components/query-builder";
import {TagSearchComponent} from "./components/tag-search";

function topicValidator(control: Control): { [s: string]: boolean } {
  if (control.value.length<=0) {
    return {invalidTopic: true};
  }
}

@Component({
  selector: 'tag-form',
  directives: [FORM_DIRECTIVES,QueryComponent,TagSearchComponent],
  template: `
  <div>
  <form class="form-inline form" #f="ngForm" [ngFormModel]="tagForm" (ngSubmit)="onSubmit(f.value)">
    <div class="form-group">
      <label for="inputTopics">topics</label>
      <div *ngIf="topicControl.hasError('invalidTopic')"  class="alert alert-danger" role="alert">must select topic</div>
      <select class="form-control" id="inputTopics" [ngFormControl]="topicControl">
          <option *ngFor="#name of topics" value="{{name}}">{{name}}</option>
      </select>
    </div>
    <div class="form-group">
    </div>
    <div class="form-group">
    <!--<input-tag-search></input-tag-search>-->
    <input type="text" class="input form-control" id="queryfilter" placeholder="search for ip,appid..." [ngFormControl]="filterControl">
    <div *ngIf="!filterControl.valid"  class="alert alert-danger" role="alert">input filter is invalid</div>
    </div>
    <button type="submit" class="btn btn-default btn-sm">查询</button>
    <query-builder></query-builder>
  </form>
  </div>
  `
})
export class TagFormComponent {
  topics: string[];
  tagForm: ControlGroup;
  topicControl: AbstractControl;
  filterControl:AbstractControl;

  constructor(public tagService:TagService,fb: FormBuilder){
    //this.tagService.loadTopics().subscribe(res => this.topics=res);
    this.topics=this.tagService.loadTopics();
    this.tagForm = fb.group({
      "topic":  ["", Validators.required,topicValidator],
      "filter": ["",Validators.required]
    });
    this.topicControl = this.tagForm.controls['topic'];
    this.filterControl = this.tagForm.controls['filter'];
  }

  onSubmit(form: any): void {
    console.log('you submitted value:', form);
  }
}
