import { Routes } from "@angular/router";

import { IndexPage } from "./index.page";
import { NotFoundPage } from "./not-found.page";
import { PostPage } from "./post.page";
import { WritingPage } from "./writing.page";

export const appRoutes: Routes = [
  { path: "post/:path", component: PostPage },
  { path: "posts/:path", component: PostPage },
  // TODO: ignore the url parts we dont need (:id, :year, etc)
  // (legacy route) lynncyrin.me/post/1234/heroku-django-pipeline-sass/
  { path: "post/:id/:path", component: PostPage },
  { path: "posts/:id/:path", component: PostPage },
  // (legacy route) lynncyrin.me/2017/05/30/heroku-django-pipeline-sass/
  { path: ":year/:month/:day/:path", component: PostPage },
  { path: "writing", component: WritingPage },
  { path: "", component: IndexPage },
  { path: "**", component: NotFoundPage }
];
