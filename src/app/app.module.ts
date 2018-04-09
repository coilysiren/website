import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { DataDisplayComponent } from "./data-display.component";

@NgModule({
  declarations: [AppComponent, DataDisplayComponent],
  imports: [BrowserModule, FormsModule, HttpModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
