For any given complex web application, you are likely going to have parts that look something like what I describe here. We are going to model a ruby / rails app built for recording reports. We're going to follow a report, as it flows from the frontend to the backend of the app. Ommitted here are components not necessarily integral to handling the state and transfer of the report (like CSS)

### HTML

- When a user enters a report into a `form`, the first place it is stored is the HTML DOM.
- The DOM is stateful, it holds on to the information that a user inputs.
- [HTML reference documentation](https://developer.mozilla.org/en-US/docs/Web/HTML)

### CLIENT SIDE JS

- _We denormalize the state into JS so we can manipulate our data in a more intricate manner, but a less complex app may omit this step._
- We then copy the `form`'s state (the report) to JS's memory (_[example library](https://api.jquery.com/serializeArray/)_).
- Since the data is input into HTML, not JS, we need hooks to tell JS to "react" to new data being input into HTML (_[example library](http://reactivex.io/rxjs)_)
- We keep the data in JS memory for displaying it to the user locally, and also send it into a AJAX HTTP POST (_[example library](https://angular.io/guide/http)_) for storage
- [JS reference documentation](https://developer.mozilla.org/en-US/docs/Web/Javascript)


### HTTP

- HTTP is a protocol that describes sending user data from browsers to remote servers
- HTTP has a (totally not optional, definitely implement it always) layer called TLS
- TLS utilizes a network of keys, the derivates of which are stored in browsers, and are used to encrypt the report
- This encrypted report then travels from the users browser, to our server
- _( analogy ): HTTP is akin to a street_
- [HTTP reference documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)

### SERVER

- When we say "server" we mean a physical computer, [in our specific case owned by AWS](https://aws.amazon.com/ec2/)
- When we say "server" we also sometimes mean the software, [nginx in this case](https://www.nginx.com/). nginx is optional here, AWS is not
- The server receives the HTTP request decrypts the TLS layer with a GPG private key, and sends the report to the web app
- _( analogy ): The server is akin to an office building_

### SERVER SIDE ROUTE {{ LANGUAGE="Ruby" }}

- The HTTP POST comes with a route, which tells the application where in the code the report should go
- Routes are pointers, that point to controllers
- The route is JS
- _( analogy ): The route akin to an elevator_
- [Routes in Rails](http://guides.rubyonrails.org/routing.html)

### SERVER SIDE CONTROLLER {{ LANGUAGE="Ruby" }}

- Controllers handle if this particular report is allowed to proceed, based on some auxiliary data (passwords, session keys, etc)
- When the controller conditions are met, it saves to a model
- The controller itself is scoped not storing state, but rather to making decisions about whether or not to do so
- The controller is JS
- _( analogy ): The controller is akin to a security guard_
- [Controllers in rails](http://guides.rubyonrails.org/action_controller_overview.html)

### MODEL SQL

- The model is where the report is stored long term, to be accessed later
- The model is saved with SQL, which is a language optimized around the saving of data into databases
- _( analogy ): The model is akin to your desk, where you finally sit and stay for a bit_
- [The Rails ORM docs](http://guides.rubyonrails.org/active_model_basics.html), [the postgres docs](https://www.postgresql.org/docs/current/static/sql-commands.html)

------

I hope that makes sense!
