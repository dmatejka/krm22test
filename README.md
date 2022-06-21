# Krm22
## (re)generate APP SHELL
ng run krm22:app-shell:production

## Generate app
ng build krm22

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
//TODO implement state management and caching - ngrx/stateX/apollo...
//TODO overfetching optimalization

## Users
There could be potentially a lot of users comming from the API. Therfore I have decided to use CDK-virtual-scroller

To compensate the UX for the long fetching delay I have implemented the use of dumb loading components

//TODO implement persisting of scroll position and loading previous pages
