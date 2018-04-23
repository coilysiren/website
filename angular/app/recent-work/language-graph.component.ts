import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { scaleLinear } from "d3-scale";

const graphHeight: number = 400;

interface ILanguageData {
  name: string;
  color: string;
  size: number;
}

interface ILanguageGraphData extends ILanguageData {
  xPos: string;
  yPos: number;
  width: string;
  height: number;
}

@Component({
  selector: "language-graph",
  templateUrl: "language-graph.html",
  styleUrls: [
    "./../base.scss",
    "./../article.scss",
    "./../code.scss",
    "./recent-work.scss",
    "./language-graph.scss",
  ],
})
export class LanguageGraphComponent {
  public languageList: ILanguageGraphData[];
  public graphHeight: number = graphHeight;
  public repoCount: number = 100; // <= 100 is the max per query
  public languageCount: number = 100;
  public queryBody: string = `user(login: "lynncyrin") {
    repositories(isFork: false, last: ${this.repoCount}, orderBy: {field: UPDATED_AT, direction: ASC}) {
      nodes {
        primaryLanguage {
          name
        }
        languages(first: ${this.languageCount}, orderBy: {field: SIZE, direction: DESC}) {
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

  private processResponseData(responseData: any): ILanguageGraphData[] {
    return addGraphDataToLanguageArray(
      languageMapToSortedArray(
        languageMapFromResponseData(responseData.data)
      )
    );

    function languageMapFromResponseData(data: any): Map<string, ILanguageData> {
      const repos: any = data.user.repositories.nodes;
      const primaryLanguages: Set<string> = new Set(
        repos.map((repoNode: any) => {
          if (repoNode.primaryLanguage) {
            return repoNode.primaryLanguage.name;
          }
        })
      );

      const map: Map<string, ILanguageData> = new Map();
      for (const repoKey in repos) {
        const languages: any = repos[repoKey].languages.edges;
        for (const languageKey in languages) {
          createOrUpdatePrimaryLanguageDatum(map, languages[languageKey], primaryLanguages);
        }
      }

      return map;
    }

    function createOrUpdatePrimaryLanguageDatum(
        dataMap: Map<string, ILanguageData>,
        datam: any,
        primaryLanguages: Set<string>,
    ): void {
      const name: string = datam.node.name;
      const color: string = datam.node.color;
      const size: number = datam.size;
      const existingDatum: ILanguageData = dataMap.get(name);
      if (! primaryLanguages.has(name)) {
        return;
      } else if (existingDatum) {
        dataMap.set(name, {name, color, size: existingDatum.size + size});
      } else {
        dataMap.set(name, {name, color, size});
      }
    }

    function languageMapToSortedArray(map: Map<string, ILanguageData>): ILanguageData[] {
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

    function addGraphDataToLanguageArray(data: ILanguageData[]): ILanguageGraphData[] {
      const yScale: any = scaleLinear()
        .range([graphHeight, 0])
        .domain([0, data[0].size]);

      return data.map(
        (datum: ILanguageData, index: number): ILanguageGraphData => { return {
          ...datum,
          xPos: `${100 / data.length * index}%`,
          yPos: yScale(datum.size),
          width: `${100 / data.length}%`,
          height: graphHeight - yScale(datum.size),
        }; }
      );

    }

  }

}
