import { Component } from "@angular/core";

@Component({
  selector: "favicon-component",
  styleUrls: [
    "./base.scss",
    "./favicon.scss",
  ],
  template: `
  <div class="favicon">
    <div class="favicon-fade"></div>
    <img src="./assets/icon.png" alt="my logo">
  </div>
  `,
})
export class FaviconComponent {
}
