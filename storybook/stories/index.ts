import { HttpClientModule } from "@angular/common/http";
import { storiesOf } from "@storybook/angular";

import { FaviconComponent } from "../../angular/app/general/favicon-component";
import { DataDisplayComponent } from "../../angular/app/recent-work/data-display.component";
import { LanguageGraphComponent } from "../../angular/app/recent-work/language-graph.component";
import { HeaderComponent } from "./../../angular/app/general/header.component";

/* tslint:disable */

storiesOf("Personal Site", module)
  .add("flashy header icon", () => ({
    component: FaviconComponent
  }))

  .add("header", () => ({
    component: HeaderComponent,
    moduleMetadata: {
      declarations: [FaviconComponent]
    }
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
  }));
