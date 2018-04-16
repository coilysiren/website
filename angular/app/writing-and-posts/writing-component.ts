import { Component, Input } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
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
  @Input() public title: string = "Writing";
  public postData: IPostData[] = postData;

  constructor(
    private route: ActivatedRoute,
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.postData.forEach(
        (item: IPostData, index: number, object: IPostData[]) => {
          if (item.path === params.get("path")) {
            object.splice(index, 1);
          }
        }
      );
    });
  }

}
