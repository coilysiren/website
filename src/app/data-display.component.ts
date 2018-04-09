import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";

@Component({
  selector: "data-display",
  templateUrl: "data-display.html",
  styleUrls: [
    "./base.scss",
    "./article.scss",
    "./code.scss",
  ],
})
export class DataDisplayComponent {
  public name: string;
  public url: string;
  public commits: any[];
  public commitCount: number = 10;
  public queryBody: string = `user(login: "lynncyrin") {
    repositories(isFork: false, last: 1, orderBy: {field: UPDATED_AT, direction: ASC}) {
      nodes {
        nameWithOwner
        url
        refs(refPrefix: "refs/heads/", last: 1) {
          nodes {
            target {
              ... on Commit {
                history(first: ${this.commitCount}) {
                  nodes {
                    message
                    url
                  }
                }
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
        const repo: any = responseData.data.user.repositories.nodes[0];
        this.name = repo.nameWithOwner;
        this.url = repo.url;
        this.commits = repo.refs.nodes[0].target.history.nodes;
      });
  }
}
