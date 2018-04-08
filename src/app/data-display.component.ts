import { Component, OnInit } from "@angular/core";
import { GITHUB_API_TOKEN } from "./.env";

@Component({
  selector: "data-display",
  templateUrl: "data-display.html",
  styleUrls: ["./base.scss", "./article.scss"]
})
export class DataDisplayComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log(GITHUB_API_TOKEN);
  }
}
