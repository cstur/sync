/// <reference path="node_modules/angular2/ts/typings/node/node.d.ts"/>
/// <reference path="node_modules/angular2/typings/browser.d.ts"/>
import { bootstrap } from "angular2/platform/browser";
import { Component,FORM_DIRECTIVES } from "angular2/core";

import {KendoValueAccessor} from 'kendo/angular2';

@Component({
  selector: 'tag-main',
  template: `
  <div>

  </div>
  `
})
class TagMainComponent {

}

bootstrap(TagMainComponent);
