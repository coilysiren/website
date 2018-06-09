import { Component, ViewEncapsulation } from "@angular/core";

@Component({
  template: "",
  selector: "background-component",
  styles: [
    `
      body::after {
        content: "";
        background-image: url("./../assets/background.png");
        opacity: 0.5;
        position: fixed;
        top: 0;
        z-index: -1;
        height: 100%;
        width: 100%;
      }
    `
  ],
  encapsulation: ViewEncapsulation.None // because of the injected post html
})
export class BackgroundComponent {}
