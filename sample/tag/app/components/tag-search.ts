import { Component } from "angular2/core";

@Component({
  selector: 'input-tag-search',
  template: `
    <input type="text" class="input form-control" id="queryfilter" placeholder="search for ip,appid...">
  `
})
export class TagSearchComponent{

}