import { HttpClientModule } from "@angular/common/http";
import { storiesOf } from "@storybook/angular";
import { LanguageGraphComponent } from "../../src/app/language-graph.component";
import { RecentWorkComponent } from "../../src/app/recent-work.component";
import { WritingComponent } from "../../src/app/writing-and-posts/writing-component";
import { AppComponent } from "../../storybook-dist/app/app.component";
import { DataDisplayComponent } from "./../../src/app/data-display.component";
import { HeaderComponent } from "./../../src/app/header.component";

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
