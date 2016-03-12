/// <reference path="../node_modules/angular2/ts/typings/node/node.d.ts"/>
/// <reference path="../node_modules/angular2/typings/browser.d.ts"/>

import { bootstrap } from "angular2/platform/browser";
import { Component,provide } from "angular2/core";
import {HTTP_PROVIDERS} from "angular2/http";
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig,APP_BASE_HREF} from 'angular2/router';

import {TagTableComponent} from "./tag-table";
import {TagFormComponent} from "./tag-form";

import {tagServiceInjectables,TagService} from './tag-service';

@Component({
  selector: 'tag-main',
  host: {class: 'wrapper container'},
  directives: [TagFormComponent,TagTableComponent],
  template: `
    <tag-form></tag-form>
    <tag-table></tag-table>
  `
})
class TagMainComponent {

}

bootstrap(TagMainComponent,[tagServiceInjectables,HTTP_PROVIDERS,ROUTER_PROVIDERS,provide(APP_BASE_HREF, {useValue : 'path'})]);
