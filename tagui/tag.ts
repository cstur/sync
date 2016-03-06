/// <reference path="node_modules/angular2/ts/typings/node/node.d.ts"/>
/// <reference path="node_modules/angular2/typings/browser.d.ts"/>
/// <reference path="vendor/kendo/anuglar2.d.ts"/>

import { bootstrap } from "angular2/platform/browser";
import { Component } from "angular2/core";
import { FORM_DIRECTIVES } from 'angular2/common';

import {KendoValueAccessor} from 'kendo/angular2';

@Component({
  selector: 'tag-table',
  host: {class: 'row'},
  template: `
  <div>

  </div>
  `
})
class TagTableComponent{

}

@Component({
  selector: 'input-tag-search',
  directives: [FORM_DIRECTIVES],
  template: `
  <div>

  </div>
  `
})
class TagSearchComponent{

}

@Component({
  selector: 'query-builder',
  host: {class: 'row'},
  template: `
  <div>

  </div>
  `
})
class QueryComponent{

}

@Component({
  selector: 'tag-form',
  host: {class: 'row'},
  directives: [TagSearchComponent,QueryComponent],
  template: `
  <div>
      <form #f="ngForm"
          (ngSubmit)="onSubmit(f.value)"
          class="ui form">

      <div class="field">
        <label for="skuInput">SKU</label>
        <input type="text"
               id="skuInput"
               placeholder="SKU"
               ngControl="sku">
      </div>
  		<input-tag-search></input-tag-search>
      <button type="submit" class="btn">Submit</button>
    </form>
  	<query-builder></query-builder>
  </div>
  `
})
class TagFormComponent{

}

@Component({
  selector: 'tag-main',
  directives: [TagFormComponent,TagTableComponent],
  template: `
  <div class="container">
  	<tag-form></tag-form>
	<tag-table></tag-table>
  </div>
  `
})
class TagMainComponent {

}

bootstrap(TagMainComponent);
