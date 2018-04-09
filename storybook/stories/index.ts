import { HttpClientModule } from "@angular/common/http";
import { storiesOf } from "@storybook/angular";
import { LanguageGraphComponent } from "../../src/app/language-graph.component";
import { DataDisplayComponent } from "./../../src/app/data-display.component";
import { HeaderComponent } from "./../../src/app/header.component";

/* tslint:disable */

storiesOf("Personal Site", module)

  .add("header", () => ({
    component: HeaderComponent
  }))

  .add("data display", () => ({
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
