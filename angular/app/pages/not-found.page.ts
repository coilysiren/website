import { Component, OnInit } from "@angular/core";

/* tslint:disable */

@Component({
  template: `
  <page-component></page-component>
  <article class="container">
    <h2>( 404 ) Page Not Found</h2>
    <p>The page you were looking for? We couldn't find it</p>
    <p>Hopefully this incident will be reported to the proper authorities immediately</p>
    <p>Alternatively! Feel free to tweet <a href="https://twitter.com/lynncyrin">@ me</a> about how I need to fix my dead links</p>
  </article>
  `,
  styleUrls: ["./../general/base.scss", "./../general/article.scss"]
})
export class NotFoundPage {}
