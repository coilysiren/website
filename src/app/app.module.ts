import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { DataDisplayComponent } from "./data-display.component";
import { HeaderComponent } from "./header.component";
import { LanguageGraphComponent } from "./language-graph.component";
import { RecentWorkComponent } from "./recent-work.component";
import { WritingComponent } from "./writing-component";

@NgModule({
  declarations: [
    AppComponent,
    DataDisplayComponent,
    RecentWorkComponent,
    HeaderComponent,
    LanguageGraphComponent,
    WritingComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
