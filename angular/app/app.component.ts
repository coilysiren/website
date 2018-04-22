import { Component } from "@angular/core";
import "./../assets/curled/fontawesome.js";

@Component({
  selector: "app-root",
  template: `
    <header-component></header-component>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
}
