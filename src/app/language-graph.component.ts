import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";

interface ILanguageData {
  name: string;
  color: string;
  size: number;
}

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
  public languageList: ILanguageData[];
  public repoCount: number = 100;
  public queryBody: string = `user(login: "lynncyrin") {
    repositories(isFork: false, last: ${this.repoCount}, orderBy: {field: UPDATED_AT, direction: ASC}) {
      nodes {
        languages(first: 100, orderBy: {field: SIZE, direction: DESC}) {
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
  }`;

  constructor(http: HttpClient) {
    http.post("/api/github", {queryBody: this.queryBody})
      .subscribe((data: any) => {
        this.languageList = this.processResponseData(data);
      });
  }

  private processResponseData(responseData: any): ILanguageData[] {

    const languageData: Map<string, ILanguageData> = new Map();
    const repos: any = responseData.data.user.repositories.nodes;
    for (const repoKey in repos) {
      const languages: any = repos[repoKey].languages.edges;
      for (const languageKey in languages) {
        updateDataMap(languageData, languages[languageKey]);
      }
    }
    return languageDataToSortedArray(languageData);

    function updateDataMap(dataMap: Map<string, ILanguageData>, data: any): void {
      const name: string = data.node.name;
      const color: string = data.node.color;
      const size: number = data.size;
      const datum: ILanguageData = dataMap.get(name);
      if (datum) {
        dataMap.set(name, {name, color, size: datum.size + size});
      } else {
        dataMap.set(name, {name, color, size});
      }
    }

    function languageDataToSortedArray(map: Map<string, ILanguageData>): ILanguageData[] {
      return Array.from(map.values()).sort(
        (datumA: ILanguageData, datumB: ILanguageData): number => {
          if (datumA.size < datumB.size) {
            return 1;
          } else if (datumA.size > datumB.size) {
            return -1;
          } else {
            return 0;
          }
        }
      );
    }

  }

}
