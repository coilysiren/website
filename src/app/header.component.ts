import { Component } from "@angular/core";

@Component({
  selector: "header-component",
  templateUrl: "header.html",
  styleUrls: [
    "./base.scss",
    "./header.scss",
  ]
})
export class HeaderComponent {
  public socialLinks: string[][] = [
    ["https://twitter.com/lynncyrin", "fab fa-twitter"],
    ["https://github.com/lynncyrin", "fab fa-github"],
    ["https://gitlab.com/cyrin", "fab fa-gitlab"],
    ["https://paypal.me/cyrin", "fab fa-paypal"],
    ["https://steamcommunity.com/id/naxili", "fab fa-steam-square"],
    ["https://github.com/lynncyrin/lynncyrin.github.io", "fas fa-code"],
    ["https://cash.me/$cyrin", "fas fa-dollar-sign"],
    ["mailto:lynncyrin@gmail.com", "fas fa-envelope"]
  ];
}
