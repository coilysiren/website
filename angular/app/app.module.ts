import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";

import { AboutComponent } from "./about-component";
import { AppComponent } from "./app.component";
import { BackgroundComponent } from "./background.component";
import { FaviconComponent } from "./favicon-component";
import { HeaderComponent } from "./header.component";
import { IndexPage } from "./index.page";
import { NotFoundPage } from "./not-found.page";
import { PageComponent } from "./page.component";
import { DataDisplayComponent } from "./recent-work/data-display.component";
import { LanguageGraphComponent } from "./recent-work/language-graph.component";
import { RecentWorkComponent } from "./recent-work/recent-work.component";
import { PostComponent } from "./writing-and-posts/post.component";
import { PostPage } from "./writing-and-posts/post.page";
import { WritingComponent } from "./writing-and-posts/writing-component";
import { WritingPage } from "./writing-and-posts/writing.page";

const appRoutes: Routes = [
  { path: "post/:path", component: PostPage },
  // TODO: ignore the url parts we dont need (:id, :year, etc)
  // (legacy route) lynncyrin.me/post/1234/heroku-django-pipeline-sass/
  { path: "post/:id/:path", component: PostPage },
  // (legacy route) lynncyrin.me/2017/05/30/heroku-django-pipeline-sass/
  { path: ":year/:month/:day/:path", component: PostPage },
  { path: "about", component: AboutComponent },
  { path: "writing", component: WritingPage },
  { path: "", component: IndexPage },
  { path: "**", component: NotFoundPage }
];

@NgModule({
  declarations: [
    AppComponent,
    DataDisplayComponent,
    RecentWorkComponent,
    HeaderComponent,
    LanguageGraphComponent,
    WritingComponent,
    WritingPage,
    IndexPage,
    PostPage,
    PostComponent,
    NotFoundPage,
    FaviconComponent,
    AboutComponent,
    BackgroundComponent,
    PageComponent
  ],
  imports: [BrowserModule, HttpClientModule, RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
