---
path: "/posts/code-janitor"
template-key: "blog-post"
date: "2019-07-27"
title: "The Maintainer - Aspect of Code Janitor"
description: "The code janitor is a servant leader of the codebase."

---

The code janitor is a servant leadership of a codebase. They use their skills primarily to increase the software engineering velocity of the team as a whole / increase the stability of the code. Their roles are such:

**Encourage continually better code pratices** in your coworkers. If they mention writing code they haven't pushed to a remote branch, get them to push that branch! If they push code without tests, get them to write tests! Continually iterate on best practices for branching and test coverage. Good branching enables good review and helps avoid duplication of work. The benefits of good tests are a subject for another post ^^. "Better code practices" is a continously moving target, so the code janitor must also be tuned into a technical community to stay up to date on them.

**Proactively review => merge** the pull requests of coworkers / community members. Coworker's PRs should all be reviewed at least every 24 hours. Community member's PRs should be reviewed all be reviewed at least every 7 days. If you're approaching a time limit and aren't sure what feedback to give, really push yourself to surface why a pull request shouldn't be merged.  Continuous proactive reviews are a powerful tool for surfacing people's blockers.

As a special case for reviews and merges, the code janitor should **maintain a requirements bot**. The benefits of a requirements bot are described in [another post](https://coilysiren.me/post/requirements-maint). The timelines for requirements updates should be relative to the [semver](https://semver.org/) range of the update, and the type of update. For example, security patches should be merged within 24 hours.

Tangentially related to maintaining your current set of requirements, is **watching for competitor libraries**. When your team's use of a tool is non-standard / non-ideal, its often a good target for being replaced by a competitor. For the majority of your libraries this won't be an option, but there's some cases where its easily possible. Switching my team's [code formatter](https://github.com/ambv/black) and [test framework](https://github.com/mochajs/mocha) are two examples of this. A good code janitor developes a sense for where / when these switches can happen, and is keyed into the communities where these libraries are created.

Watch how your coworkers are interacting with the linter config. Ask your coworkers how they are interacting with the linter config! Be very receptive to **changing the linter config** over time, as personal styles shift. Definitely change linter config whenever you get a new coworker of at least median skill level, they know what works well for them. The gold standard is config that minizes the time programmers spend thinking about formatting, while also completely preventing the possibility of Formatting Wars.

**Driving refactor plans**, such as:

- renames
- merging projects / splitting projects apart
- open sourcing all of / parts of a project

**Identifying technical debt**, and surfacing the relative priority of reducing that debt to team managers. Issues of technical debt can often be hard to communicate, so part of this work should involve configuring tools that assist in objective code analysis. This very related to driving refactor plans.

There's more to say here, but this post is long and the day is short. I hope this helps you become a better project maintainer!
