import { Component } from "@angular/core";

@Component({
  selector: "recent-work",
  template: `
  <article class="container">
    <h2>Recent Personal Work</h2>
    <data-display></data-display>
  </article>
  `,
  styleUrls: ["./../general/base.scss", "./../general/article.scss"]
})
export class RecentWorkComponent {}
