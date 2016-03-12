import { Component ,Input, OnInit} from "angular2/core";
import {TagHTTPRequests} from "./components/tag-http";

export class Column{
    constructor(public name: string, public descr: string){
    }
}

export class Sorter{
    direction:number;
    key:string;

    constructor(){
        this.direction = 1;
    }

    sort(key:string,data:any[]){

        if(this.key === key){
            this.direction = -this.direction;
        }
        else{
            this.direction = 1;
        }

        this.key = key;

        data.sort((a,b) => {
            if(a[key] === b[key]){
                return 0;
            }
            else if(a[key] > b[key]){
                return this.direction;
            }
            else{
                return -this.direction;
            }
        });
    }
}

@Component({
    selector: 'cat-grid',
    inputs: ['rows: rows','columns: columns'],
    directives:[TagHTTPRequests],
  	template: `
    <!--<tag-http></tag-http>-->
	<table class="table table-striped">
	    <tr>
	        <td *ngFor="#col of columns"><a (click)="sort(col.name)">{{col.descr}}</a></td>
	    </tr>
	    <tr *ngFor="#row of rows">
	        <td *ngFor="#col of columns">{{row[col.name]}}</td>
	    </tr>
	</table>
	`
})
export class CatGrid implements OnInit{

    columns:Array<Column>;
    rows:Array<any>;

    @Input() name:string;

    sorter = new Sorter();

    sort(key){
        this.sorter.sort(key, this.rows);
    }

    ngOnInit(){
        console.log(this.name);
    }
}


@Component({
  selector: 'tag-table',
  directives:[CatGrid],
  template: `
  <div>
  <cat-grid name="tag grid" [rows]="rowDatas" [columns]="columns"></cat-grid>
  </div>
  `
})
export class TagTableComponent{

    rowDatas: Array<any>;
    columns: Array<Column>;

    constructor() {

        this.rowDatas = this.getTableData();
        this.columns = this.getColumns();
    }

    getTableData(): Array<any> {
    return [
        { ip: "10.2.10.132", messageId: "100002480-0a020a84-404738-662", cat_client_appid :"100002480"},
        { ip: "10.2.10.133", messageId: "100002480-0a020a84-404738-663", cat_client_appid :"100002481"},
        { ip: "10.2.10.134", messageId: "100002480-0a020a84-404738-664", cat_client_appid :"100002482"}
    ]; 
    }

    getColumns(): Array<Column> {
        return [
            new Column('ip','ip'),
            new Column('messageId','messageId'),
            new Column('cat_client_appid','cat_client_appid')
        ];
    }
}