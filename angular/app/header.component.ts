import { Component } from "@angular/core";

@Component({
  selector: "header-component",
  templateUrl: "header.html",
  styleUrls: ["./base.scss", "./header.scss"]
})
export class HeaderComponent {
  public socialLinks: string[][] = [
    ["https://linkedin.com/in/lynn-cyrin/", "fab fa-linkedin", "linkedin"],
    ["https://github.com/lynncyrin", "fab fa-github", "github"],
    [
      "https://github.com/lynncyrin/lynncyrin-dot-me",
      "fas fa-code",
      "source code"
    ],
    ["https://twitter.com/lynncyrin", "fab fa-twitter", "twitter"],
    ["https://facebook.com/lynncyrin", "fab fa-facebook", "facebook"],
    ["https://instagram.com/lynncyrin", "fab fa-instagram", "instagram"],
    ["https://steamcommunity.com/id/naxili", "fab fa-steam-square", "steam"],
    ["https://cash.me/$cyrin", "fas fa-dollar-sign", "cash.me"],
    ["mailto:lynncyrin@gmail.com", "fas fa-envelope", "email address"]
  ];
}
