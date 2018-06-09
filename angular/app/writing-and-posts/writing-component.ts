import { Component, Input } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { IPostData, postData } from "./post.data";

@Component({
  selector: "writing-component",
  templateUrl: "writing.html",
  styleUrls: [
    "./../general/base.scss",
    "./../general/article.scss",
    "./writing.scss"
  ]
})
export class WritingComponent {
  @Input() public title: string = "Writing";
  public postData: IPostData[] = postData;

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const splicedPostData: IPostData[] = postData.slice(0);
      splicedPostData.forEach(
        (item: IPostData, index: number, object: IPostData[]) => {
          if (item.path === params.get("path")) {
            object.splice(index, 1);
          }
        }
      );
      this.postData = splicedPostData;
    });
  }
}
