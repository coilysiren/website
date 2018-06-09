import { Component, ViewEncapsulation } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Component({
  selector: "about-component",
  templateUrl: "./about.html",
  styleUrls: [
    "./../general/base.scss",
    "./../general/article.scss",
    "./post.scss"
  ],
  encapsulation: ViewEncapsulation.None // because of the injected post html
})
export class AboutComponent {
  public content: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {
    const content: string = require("html-loader!markdown-loader!./posts/how-I-like-to-work.md");
    this.content = sanitizer.bypassSecurityTrustHtml(content);
  }
}
