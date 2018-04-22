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
    ["https://github.com/lynncyrin", "fab fa-github"],
    ["https://twitter.com/lynncyrin", "fab fa-twitter"],
    ["https://facebook.com/lynncyrin", "fab fa-facebook"],
    ["https://instagram.com/lynncyrin", "fab fa-instagram"],
    ["https://steamcommunity.com/id/naxili", "fab fa-steam-square"],
    ["https://paypal.me/cyrin", "fab fa-paypal"],
    ["https://cash.me/$cyrin", "fas fa-dollar-sign"],
    ["mailto:lynncyrin@gmail.com", "fas fa-envelope"],
  ];
}
