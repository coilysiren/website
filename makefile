.DEFAULT_GOAL := help

help:
	@perl -nle'print $& if m{^[a-zA-Z_-]+:.*?## .*$$}' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-25s\033[0m %s\n", $$1, $$2}'

download-resources:
	curl \
		"https://use.fontawesome.com/releases/v5.0.9/js/all.js" \
		-o "angular/assets/curled/fontawesome.js"
	curl \
		"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" \
		-o "angular/assets/curled/bootstrap.css"

dev:
	npx concurrently \
		-k -n angular,express,storybook \
		-c red,green,yellow \
			"make start-angular" \
			"make start-express"

start-angular:
	npx ng serve --port 8080 --open

start-express:
	npx nodemon --exec ts-node server.ts

start-storybook:
	npx start-storybook -s ./angular -c storybook --port 9001

build-angular:
	npx ng run app:server

build-express:
	npx tsc -p tsconfig.server.json

build-storybook:
	npx build-storybook -s ./angular -c storybook -o storybook-dist

heroku-start:
	node server.js

heroku-postbuild:
	make build-angular
	make build-express
