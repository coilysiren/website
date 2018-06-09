import { Component } from "@angular/core";

@Component({
  template: `
    <page-component></page-component>
    <post-component></post-component>
    <writing-component [title]="'Other Posts'"></writing-component>
  `
})
export class PostPage {}
