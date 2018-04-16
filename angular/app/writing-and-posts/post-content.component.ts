import { HttpClient } from "@angular/common/http";
import {
  ChangeDetectionStrategy,
  Component,
  ComponentDecorator,
  Directive,
  TypeDecorator,
  ViewEncapsulation,
  ɵmakeDecorator as makeDecorator,
} from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import * as marked from "marked";
import { IPostData, pathKeyedPosts } from "./post.data";

interface IMarkdownComponent extends Component {
  templateMarkdown?: string;
}

interface IMarkdownComponentDecorator extends ComponentDecorator {
  (obj: IMarkdownComponent): TypeDecorator;
  new (obj: IMarkdownComponent): IMarkdownComponent;
}

// tslint:disable-next-line:variable-name
const MarkdownComponent: IMarkdownComponentDecorator = makeDecorator(
  "Component",
  (c: IMarkdownComponent = {}) => ({
    template: marked(c.templateMarkdown),
    changeDetection: ChangeDetectionStrategy.Default,
    ...c,
  }),
  Directive,
);

@MarkdownComponent({
  selector: "post-content",
  templateMarkdown: `### post sub-title`,
  styleUrls: [
    "./../base.scss",
    "./../article.scss",
    "./post.scss",
  ],
})
export class PostContentComponent {
  // constructor(
  //   private route: ActivatedRoute,
  // ) {
  //   this.route.paramMap.subscribe((params: ParamMap) => {
  //     const post: IPostData = pathKeyedPosts.get(params.get("path"));
  //   });
  // }

}
