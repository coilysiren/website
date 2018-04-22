import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { scaleBand, scaleLinear } from "d3-scale";
import { select } from "d3-selection";

const graphElementClass: string = "language-graph";

interface ILanguageData {
  name: string;
  color: string;
  size: number;
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
  public languageList: ILanguageData[];
  public graphElementClass: string = graphElementClass;
  public repoCount: number = 100; // <= 100 is the max per query
  public languageCount: number = 100;
  public queryBody: string = `user(login: "lynncyrin") {
    repositories(isFork: false, last: ${this.repoCount}, orderBy: {field: UPDATED_AT, direction: ASC}) {
      nodes {
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

  private processResponseData(responseData: any): ILanguageData[] {

    let languageDataMap: Map<string, ILanguageData> = new Map();
    const repos: any = responseData.data.user.repositories.nodes;
    for (const repoKey in repos) {
      const languages: any = repos[repoKey].languages.edges;
      for (const languageKey in languages) {
        createOrUpdateLanguageDatum(languageDataMap, languages[languageKey]);
      }
    }
    languageDataMap = languageDataWithoutOutliers(languageDataMap);
    const languageDataArray: ILanguageData[] = languageDataToSortedArray(languageDataMap);
    generateGraph(languageDataArray);
    return languageDataArray;

    function createOrUpdateLanguageDatum(dataMap: Map<string, ILanguageData>, data: any): void {
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

    function languageDataWithoutOutliers(map: Map<string, ILanguageData>): Map<string, ILanguageData> {
      return map;
    }

    function generateGraph(data: ILanguageData[]): void {
      const width: number = 600;
      const height: number = 400;

      const xScale: any = scaleBand()
        .range([0, width])
        .domain(data.map((datum: ILanguageData) => datum.name));
      const yScale: any = scaleLinear()
        .range([height, 0])
        .domain([0, data[0].size]);

      const svg: any = select(`.${graphElementClass}`)
        .append("svg")
          .attr("width", width)
          .attr("height", height)
        .append("g");

      // TODO:
      // https://github.com/search?utf8=%E2%9C%93&q=user%3Alynncyrin+language%3Ajavascript+author%3Alynncyrin&type=Repositories

      svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
          .attr("fill", (datum: ILanguageData) => datum.color)
          .attr("class", "bar")
          .attr("x", (datum: ILanguageData) => xScale(datum.name))
          .attr("width", xScale.bandwidth())
          .attr("y", (datum: ILanguageData) => yScale(datum.size))
          .attr("height", (datum: ILanguageData) => height - yScale(datum.size));

    }

  }

}
