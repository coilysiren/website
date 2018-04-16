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

// tslint:disable:max-line-length

interface IMarkdownComponent extends Component {
  templateMarkdown?: string;
}

interface IMarkdownComponentDecorator extends ComponentDecorator {
  (obj: IMarkdownComponent): TypeDecorator;
  new (obj: IMarkdownComponent): IMarkdownComponent;
}

// [ NOTICE ] this code doesn't work with aot builds because of
// https://github.com/angular/angular-cli/blob/4dcbf389897c30a858a9138e60cbefd2036ba35f/tests/e2e/tests/build/build-errors.ts#L73
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
