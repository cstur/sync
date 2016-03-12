import { Component } from 'angular2/core';
import { bootstrap } from 'angular2/platform/browser';

export class Rule{
	constructor(public condition:string,public field:string,public data:string,public group:Group){}
}

export class Group{
	constructor(public operator:string,public ruleList:Rule[],public ruleGroup:boolean){}
}

@Component({
	selector:'query-group',
	inputs: ['group'],
	template:`
    <div class="form-inline">
        <select class="form-control input-sm"></select>
        <button style="margin-left: 5px" (click)="addCondition()" class="btn btn-sm btn-success">
        	<span class="glyphicon glyphicon-plus-sign"></span> Add Condition
        </button>
        <button style="margin-left: 5px" (click)="addGroup()" class="btn btn-sm btn-success">
        	<span class="glyphicon glyphicon-plus-sign"></span> Add Group
        </button>
        <button style="margin-left: 5px" (click)="removeGroup()" class="btn btn-sm btn-danger">
        	<span class="glyphicon glyphicon-minus-sign"></span> Remove Group
        </button>
    </div>
    <div class="group-conditions">
        <div *ngFor="#rule of group.ruleList" class="condition">
		    <div class="container" [ngSwitch]="rule.group.ruleGroup">
			    <div *ngSwitchWhen="true">
			    	<query-group [group]="rule.group"></query-group>
			    </div>
			    <div *ngSwitchDefault>
	                <select class="form-control input-sm"></select>
	                <select style="margin-left: 5px" class="form-control input-sm"></select>
	                <input style="margin-left: 5px" type="text" class="form-control input-sm" value="{{rule.data}}"/>
	                <button style="margin-left: 5px" (click)="removeCondition()" class="btn btn-sm btn-danger">
	                <span class="glyphicon glyphicon-minus-sign"></span>
                </button>
    			</div>
			</div>
        </div>
    </div>
	`
})
class GroupComponent{

}

@Component({
	selector:'query-builder',
	directives:[GroupComponent],
	template:`
	<div class="alert alert-warning alert-group">
      <query-group
        *ngFor="#group of groupList"
        [group]="group">
      </query-group>
    </div>
	`
})
export class QueryBuilderComponent{
	groupList: Group[];
	constructor(){
		let g=new Group('',[],false);
		let r=new Rule('=','appid','123',g);
		this.groupList=[new Group('AND',[r],true)];
	}
}