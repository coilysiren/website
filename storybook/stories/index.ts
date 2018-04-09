import { HttpClientModule } from "@angular/common/http";
import { storiesOf } from "@storybook/angular";
import { DataDisplayComponent } from "./../../src/app/data-display.component";

/* tslint:disable */

storiesOf("Personal Site", module)

  .add("data display", () => ({
    component: DataDisplayComponent,
    moduleMetadata: {
      imports: [
        HttpClientModule,
      ]
    },
  }))
  
  ;
