import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import * as marked from "marked";
import { IPostData, pathKeyedPosts } from "./post.data";

@Component({
  template: `
    <article class="container post">
      <h2>{{ title }}</h2>
      <post-content></post-content>
    </article>
  `,
  styleUrls: [
    "./../base.scss",
    "./../article.scss",
    "./post.scss",
  ],
})
export class PrecompiledPostComponent {
  public title: string;

  constructor(
    private route: ActivatedRoute,
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const post: IPostData = pathKeyedPosts.get(params.get("path"));
      this.title = post.title;
    });
  }

}
