.DEFAULT_GOAL := help

# general / helpers

help:
	@perl -nle'print $& if m{^[a-zA-Z_-]+:.*?## .*$$}' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-25s\033[0m %s\n", $$1, $$2}'

download-resources:
	curl \
		"https://use.fontawesome.com/releases/v5.0.9/js/all.js" \
		-o "angular/assets/curled/fontawesome.js"
	curl \
		"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" \
		-o "angular/assets/curled/bootstrap.css"

# development commands

dev: ## build + start entrypoint for dev
	npx concurrently \
		-k -n angular,express,storybook \
		-c red,green,yellow \
			"make start-angular" \
			"make start-express"

start-angular:
	npx ng serve --port 8080 --open

start-express:
	npx nodemon --exec ts-node server.dev.ts

start-storybook:
	npx start-storybook -s ./angular -c storybook --port 9001

# production commands

heroku-run: ## build + start entrypoint for production
	npm run build
	make heroku-start

heroku-start:
	node dist/server
