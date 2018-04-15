import { Component } from "@angular/core";
import { IPostData, postData } from "./post.data";

@Component({
  selector: "writing-component",
  templateUrl: "writing.html",
  styleUrls: [
    "./../base.scss",
    "./../article.scss",
    "./writing.scss"
  ]
})
export class WritingComponent {
  public postData: IPostData[] = postData;
}
