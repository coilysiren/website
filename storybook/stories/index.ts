import { HttpClientModule } from "@angular/common/http";
import { storiesOf } from "@storybook/angular";

import { DataDisplayComponent } from "../../angular/app/recent-work/data-display.component";
import { LanguageGraphComponent } from "../../angular/app/recent-work/language-graph.component";
import { HeaderComponent } from "./../../angular/app/header.component";

/* tslint:disable */

storiesOf("Personal Site", module)

  .add("header", () => ({
    component: HeaderComponent
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

  ;
