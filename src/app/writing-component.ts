import { Component } from "@angular/core";
import { IPostMeta, postMetaData } from "./post.data";

@Component({
  selector: "writing-component",
  templateUrl: "writing.html",
  styleUrls: [
    "./base.scss",
    "./article.scss",
    "./writing.scss"
  ]
})
export class WritingComponent {
  public postMetadata: IPostMeta[] = postMetaData;
}
