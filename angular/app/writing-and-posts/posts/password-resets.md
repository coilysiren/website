### Background

I'm working on a nodejs application that needs password reset emails. Password resets being a subset of user authentication, I went on a search nodejs user authentation libraries / writing / advice. Doing the same, you'll probably run into [Your Node.js authentication tutorial is (probably) wrong](https://hackernoon.com/your-node-js-authentication-tutorial-is-wrong-f1a3bf831a46) -- which mentions password resets explicitly. The main takeaway from that article is

> In Node.js development is that authentication is largely left as an exercise to the individual developer [but]...

> ...**don’t trust your tutorials.** Copypasta from tutorials *will* likely get you, your company, and your clients in authentication trouble

A quick search of libraries and tutorials (as of May 2018) confirmed this for me - there's nothing currently out there held up as the _well known, best way_ to do password resets in nodejs.

### And so we leave nodejs land, in search of enlightenment

There are certainly other languages for which this is a solved problem, so I went off to research those. Me being so very startup-y, my go-to examples are in Ruby and Python. The well known best solutions in those languages are in [Devise](https://github.com/plataformatec/devise) and [Django](https://github.com/django/django).

Relevant here is that tutorials are still of no use to me. Searching

> Password reset implementation in [ Django | Devise ] 

Will get me posts about how to call upon [ Django's ] password reset functionality to send password reset emails, not how [ Django's ] password reset functionality operates, and the decisions that went into creating that functionality.

So we are left with my personal favorite option for figuring out how a thing works: looking at the source code.

### A note

The following sections ignore the _time_ component of each of these systems, eg making sure a password reset email expires after `X` period of time.

### Password reset tokens in Django

Django first, since I've been messing around with Django's internals for some years now - and know where to look. The relevant code is [django/contrib/auth/tokens :: PasswordResetTokenGenerator](https://github.com/django/django/blob/5cc81cd9eb69f5f7a711412c02039b435c393135/django/contrib/auth/tokens.py). We are focusing on the password reset token generation and validation here, auxillary mechanisms (such as sending emails) can be (more or less) safely left up to the individual engineer's implementation.

Token generation in Django works roughly like so:

- PasswordResetTokenGenerator takes in a **user model** and an **application secret key**
- The token is **generated from some user state**, currently `user.password` and `user.last_login`
- The token is encrypted with the secret key
- The class that calls PasswordResetTokenGenerator prepends the **user model's primary key**, encoded as base64, to the token when sending emails
- The url given to the user is the **(encoded) primary key + (encrypted) token**

And then token validation:

- The calling class gets the user from the **url's primary key**
- The token is regenerated from the current user state, and that is checked against the **url's token**
- The user is allowed a password reset

### Password reset tokens in Devise

Before doing analysis of how Django does things, we are going right into how Devise does it. My experience with Ruby / Devise / Rails isn't nearly as thorough as my experience with Python / Django, so if something is wrong in this section please do reach out to me to correct it! The relevant code here is split between [devise/models/recoverable :: Recoverable](https://github.com/plataformatec/devise/blob/715192a7709a4c02127afb067e66230061b82cf2/lib/devise/models/recoverable.rb) and [devise/token_generator :: TokenGenerator](https://github.com/plataformatec/devise/blob/962cea2039c72a92691af734ebbd8495dd5c0501/lib/devise/token_generator.rb).

Token generation works like so:

- Recoverable extends the **user model**, and **TokenGenerator** uses an **application secret key**
- The token is generated from a **secure random string generator** (`Devise.friendly_token`)
- The token is encrypted with the secret key, **and then stored**
- The url given to the user is the unencrypted **token**, which to restate: is a random string

And then token validation:

- The unencrypted **url token** is encrypted with the secret key
- The **stored encrypted token** is checked against the **url's ecrypted token**
- The user is allowed a password reset

### A short comparison

Django

- generates the token from user state
- looks up the user by the primary key in the url **(dangerous!)**

Devise

- generates the token randomly
- stores the token **(dangerous!)**
- looks up the user by the token in the url

The primary difference between these two methodologies stems from **what the token is**. In Django, its user state. In Devise, its a random string. Since Django's token is user state, the password reset email has to include an indentifier for which user's state we are checking. Since Devise's token is a random string, we have to store that random string to be checked against in the future.

### And the winner is...

**...nobody**, honestly. With Django, I'm uncomfortable with giving an attacker such an easy route to try and crack the token for an individual user (having the primary key in the url is what enables this). With Devise, I'm uncomfortable with the fact that the password reset tokens are stored.

If I had to pick, **I would pick Django**. I'm leaning towards the solution that **stores less sensitive information**. Whether or not the Django implementation is more objectively secure, is a question I'm going to leave to a security researcher.
