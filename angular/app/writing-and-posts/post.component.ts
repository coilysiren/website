import { HttpClient } from "@angular/common/http";
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
    private http: HttpClient,
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const path: string = params.get("path");
      this.content = path;
    });
  }

}
