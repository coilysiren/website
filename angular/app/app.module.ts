import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { TransferHttpCacheModule } from "@nguniversal/common";

import { AppComponent } from "./app.component";
import { BackgroundComponent } from "./general/background.component";
import { FaviconComponent } from "./general/favicon-component";
import { HeaderComponent } from "./general/header.component";
import { PageComponent } from "./general/page.component";
import { IndexPage } from "./pages/index.page";
import { NotFoundPage } from "./pages/not-found.page";
import { PostPage } from "./pages/post.page";
import { appRoutes } from "./pages/routes";
import { WritingPage } from "./pages/writing.page";
import { DataDisplayComponent } from "./recent-work/data-display.component";
import { LanguageGraphComponent } from "./recent-work/language-graph.component";
import { RecentWorkComponent } from "./recent-work/recent-work.component";
import { AboutComponent } from "./writing-and-posts/about-component";
import { PostComponent } from "./writing-and-posts/post.component";
import { WritingComponent } from "./writing-and-posts/writing-component";

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
  imports: [
    BrowserModule.withServerTransition({ appId: "lynncyrin-dot-me" }),
    RouterModule.forRoot(appRoutes),
    TransferHttpCacheModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
