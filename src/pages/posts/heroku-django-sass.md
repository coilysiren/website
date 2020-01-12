---
path: "/posts/heroku-django-sass"
template-key: "blog-post"
date: "2017-03-30"
title: "Heroku-django pipeline sass.md"
description: "A currently existing django project, hosted on heroku, with a bunch of css"

---

##### ( valid as of March 30th 2017 )

### What you have

- A currently existing django project, hosted on heroku, with a bunch of css

### What you want

- to have your css compiled from sass
- for that compilation to be done with ruby, during the heroku build

### How you get it

heroku setup

```bash
# bash

heroku buildpacks:add heroku/ruby --index 1 --app $APP_NAME
```

django pipeline setup


```python
# config/settings/base.py

# snipped to only the relevant bit, see django pipeline's docs for the rest
PIPELINE = {
    'COMPILERS': (
        'pipeline.compilers.sass.SASSCompiler',
    ),
}
```

sass setup

```ruby
# Gemfile

source "https://rubygems.org"
ruby '2.3.3'

gem "sass"
gem "susy"
```

#### Ok but that didn't work

or at least it didn't for me, I got this (formatted for readability) error

```bash
pipeline.exceptions.CompilerError: <filter object at 0x1337> exit code 1
b"/tmp/DIR/vendor/ruby-2.3.3/lib/ruby/2.3.0/rubygems/core_ext/kernel_require.rb:55:in `require':
    cannot load such file -- bundler/setup (LoadError)
    from /tmp/DIR/vendor/ruby-2.3.3/lib/ruby/2.3.0/rubygems/core_ext/kernel_require.rb:55:in `require'
    from /tmp/DIR/vendor/bundle/bin/sass:15:in `<main>"
```

From that message, it occurred to me that maybe python wasn't calling the right `sass`. Which inspired the following "fix"

#### How you get it, but for real this time

Install your gems to whatever `ruby` / `sass` the python buildpack is calling

```bash
# bin/pre_compile
gem install bundler
bundle install
```

(`pre_compile` is a hook for the python buildpack)

Does this mean `heroku buildpacks:add heroku/ruby --index 1` is unused? Someone investigate this and [let me know](https://twitter.com/lynncyrin).

### Get this fixed for good!

One of the devs of the projects below will know what's up

- <https://github.com/jazzband/django-pipeline>
- <https://github.com/heroku/heroku-buildpack-ruby>
- <https://github.com/heroku/heroku-buildpack-python>

But if you want a fix for your project, the `pre_compile` script will work fine
