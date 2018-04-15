import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { DataDisplayComponent } from "./data-display.component";
import { HeaderComponent } from "./header.component";
import { IndexComponent } from "./index.component";
import { LanguageGraphComponent } from "./language-graph.component";
import { PageNotFoundComponent } from "./page-not-found.component";
import { RecentWorkComponent } from "./recent-work.component";
import { PostComponent } from "./writing-and-posts/post.component";
import { WritingComponent } from "./writing-and-posts/writing-component";

const appRoutes: Routes = [
  { path: "post/:path", component: PostComponent },
  // (legacy route) lynncyrin.me/post/1234/heroku-django-pipeline-sass/
  { path: "post/:id/:path", component: PostComponent },
  // (legacy route) lynncyrin.me/2017/05/30/heroku-django-pipeline-sass/
  { path: ":year/:month/:day/:path", component: PostComponent },
  { path: "", component: IndexComponent },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DataDisplayComponent,
    RecentWorkComponent,
    HeaderComponent,
    LanguageGraphComponent,
    WritingComponent,
    IndexComponent,
    PostComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
