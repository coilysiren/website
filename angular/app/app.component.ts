import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <header-component></header-component>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
}
