import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header.component";
import { IndexComponent } from "./index.component";
import { PageNotFoundComponent } from "./page-not-found.component";
import { DataDisplayComponent } from "./recent-work/data-display.component";
import { LanguageGraphComponent } from "./recent-work/language-graph.component";
import { RecentWorkComponent } from "./recent-work/recent-work.component";
import { PostContentComponent } from "./writing-and-posts/post-content.component";
import { PostComponent } from "./writing-and-posts/post.component";
import { PrecompiledPostComponent } from "./writing-and-posts/precompiled-post.component";
import { WritingComponent } from "./writing-and-posts/writing-component";

const appRoutes: Routes = [
  { path: "precompiled-post/:path", component: PrecompiledPostComponent },
  { path: "post/:path", component: PostComponent },
  // (legacy route) lynncyrin.me/post/1234/heroku-django-pipeline-sass/
  { path: "post/:id/:path", component: PostComponent },
  // (legacy route) lynncyrin.me/2017/05/30/heroku-django-pipeline-sass/
  { path: ":year/:month/:day/:path", component: PostComponent },
  { path: "writing", component: WritingComponent },
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
    PrecompiledPostComponent,
    PageNotFoundComponent,
    PostContentComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
