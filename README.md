# Krm22
## (re)generate APP SHELL
ng run krm22:app-shell:production

## Run server
npm i http-server (or any other web server)
/build/browser/http-server -o -c-1

## Development server
ng serve

### Light/Dark mode
Swtching light/dark mode switches favicon
// TODO implement application light/dark mode

### Token
//TODO implement token lifecycle (validTo, refresh)

## Store
//TODO overfetching optimalization
//TODO implement state management and caching - ngrx/stateX/apollo...

## Users
There could be potentially a lot of users comming from the API. Therfore I have decided to use CDK-virtual-scroller
