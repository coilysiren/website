import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { IPostData, pathKeyedPosts } from "./post.data";

@Component({
  templateUrl: "post.html",
  styleUrls: [
    "./../base.scss",
    "./../article.scss",
  ]
})
export class PostComponent {
  public title: string;
  public content: SafeHtml;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const post: IPostData = pathKeyedPosts.get(params.get("path"));
      this.content = sanitizer.bypassSecurityTrustHtml(post.content);
      this.title = post.title;
    });
  }

}
