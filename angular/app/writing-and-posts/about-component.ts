import { Component } from "@angular/core";

// tslint:disable-next-line:no-var-requires
const articleContent: string = require("html-loader!markdown-loader!./posts/how-I-like-to-work.md");

@Component({
  selector: "about-component",
  template: `
  <article class="container post">
    <h2>About</h2>
    <div>${articleContent}</div>
  </article>
  `,
  styleUrls: [
    "./../general/base.scss",
    "./../general/article.scss",
    "./post.scss"
  ]
})
export class AboutComponent {}
