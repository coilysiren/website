import { Component } from "@angular/core";

@Component({
  selector: "recent-work",
  template: `
  <article class="container">
    <h2>Recent Personal Work</h2>
    <hr class="my-4">
    <data-display></data-display>
    <language-graph></language-graph>
  </article>
  `,
  styleUrls: [
    "./base.scss",
    "./article.scss",
  ],
})
export class RecentWorkComponent {
}
