import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";

@Component({
  selector: "language-graph",
  templateUrl: "language-graph.html",
  styleUrls: [
    "./base.scss",
    "./article.scss",
    "./code.scss",
  ],
})
export class LanguageGraphComponent {
  public languageValues: any;
  public languageColors: any;
  public repoCount: number = 5;
  public queryBody: string = `query{
    user(login: "lynncyrin") {
      repositories(last: ${this.repoCount}, orderBy: {field: UPDATED_AT, direction: ASC}) {
        nodes {
          languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
            edges {
              size
              node {
                name
                color
              }
            }
          }
        }
      }
    }
  }`;

  constructor(http: HttpClient) {
    http.post("/api/github", {queryBody: this.queryBody})
      .subscribe((responseData: any) => {
        const repos: any = responseData.data.user.repositories.nodes;
        for (const key in repos) {
          const repo: any = repos[key];
        }
      });
  }
}
