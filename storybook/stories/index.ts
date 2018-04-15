import { HttpClientModule } from "@angular/common/http";
import { storiesOf } from "@storybook/angular";
import { AppComponent } from "../../angular/app/app.component";
import { DataDisplayComponent } from "../../angular/app/recent-work/data-display.component";
import { LanguageGraphComponent } from "../../angular/app/recent-work/language-graph.component";
import { RecentWorkComponent } from "../../angular/app/recent-work/recent-work.component";
import { WritingComponent } from "../../angular/app/writing-and-posts/writing-component";
import { HeaderComponent } from "./../../angular/app/header.component";

/* tslint:disable */

storiesOf("Personal Site", module)

  .add("header", () => ({
    component: HeaderComponent
  }))

  .add("recent work", () => ({
    component: RecentWorkComponent,
    moduleMetadata: {
      imports: [HttpClientModule],
      declarations: [
        DataDisplayComponent,
      ],
    },
  }))

  .add("commits", () => ({
    component: DataDisplayComponent,
    moduleMetadata: {
      imports: [HttpClientModule]
    }
  }))

  .add("language graph", () => ({
    component: LanguageGraphComponent,
    moduleMetadata: {
      imports: [HttpClientModule]
    }
  }))

  .add("writing", () => ({
    component: WritingComponent
  }))

  ;
