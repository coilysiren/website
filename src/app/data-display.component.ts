import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component } from "@angular/core";
import "rxjs/add/operator/map";
import { GITHUB_API_TOKEN } from "./.env";

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
  public queryBody: string = `query {
  user(login: "lynncyrin") {
    repositories(last: 1, orderBy: {field: UPDATED_AT, direction: ASC}) {
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
  }
}`;

  constructor(http: HttpClient) {
    http.get("/api")
      .subscribe((responseData: any) => {
        console.log(responseData);
        // const repo: any = responseData.data.user.repositories.nodes[0];
        // this.name = repo.nameWithOwner;
        // this.url = repo.url;
        // this.commits = repo.refs.nodes[0].target.history.nodes;
      });
    // const headers: HttpHeaders = new HttpHeaders({Authorization: `bearer ${GITHUB_API_TOKEN}`});
    // http
    //   .post(
    //     "https://api.github.com/graphql",
    //     { query: this.queryBody },
    //     { headers }
    //   )
  }
}
