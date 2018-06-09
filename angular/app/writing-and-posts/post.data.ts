/* tslint:disable */

export interface IPostData {
  title: string;
  description: string;
  path: string;
  content?: string;
}

export let postData: IPostData[] = [
  {
    title: "A Guide to Requirements Bots",
    description: "Keeping your code clean, shiny, and up to date. Its like brushing your teeth!",
    path: "requirements-maint"
  },
  {
    title: "Password Reset Tokens in Django, Devise, NodeJS",
    description: "But really in Django and Devise, to inform a NodeJS implementation",
    path: "password-resets"
  },
  {
    title: "Web Application Fundamentals",
    description: "A quick rundown of the essential parts of a web application",
    path: "web-application-fundamentals"
  },
  {
    title: "Heroku + Django Pipeline + Ruby Sass",
    description: "Getting django pipeline to use the ruby sass compiler on heroku",
    path: "heroku-django-pipeline-sass"
  },
  {
    title: "Web Developer Toolkit",
    description: "A list of all the tools I use for web development, with links and descriptions",
    path: "web-developer-toolkit"
  },
  {
    title: "Software Development for Adults: Updating Production",
    description: "Updating software is serious business",
    path: "software-dev-for-adults"
  },
  {
    title: "Social Combat Rules of Engagement",
    description: "On keeping your balance while you work towards creating a more just world",
    path: "social-combat-rules-of-engagement"
  },
  {
    title: "Origin Story",
    description: "My developer origin story, filled with peril! and strife!",
    path: "origin-story"
  }
];

postData = postData.map(
  (data: IPostData): IPostData => {
    data.content = require(`html-loader!markdown-loader!./posts/${data.path}.md`)
    return data
  }
)

export const pathKeyedPosts: Map<string, IPostData> = new Map(postData.map(
  (data: IPostData): [string, IPostData] => [data.path, data]
));
