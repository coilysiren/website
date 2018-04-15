import { Component } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { IPostMeta, pathKeyedPosts } from "./post.data";

@Component({
  templateUrl: "post.html",
  styleUrls: [
    "./../base.scss",
    "./../article.scss",
  ]
})
export class PostComponent {
  public content: string;

  constructor(
    private route: ActivatedRoute,
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.content = params.get("path");
    });
  }

}
