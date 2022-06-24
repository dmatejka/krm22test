# Krm22
This is test project for KRM22 interview process
It is a PWA with App-shell.

## (re)generate APP SHELL
ng run krm22:app-shell:production

## Generate app
ng build krm22

## Run server
npm i http-server (or any other web server)
/build/krm22/browser/http-server -o -c-1

## Development server
ng serve

### Theme + Light/Dark mode
Using Material theme
Swtching light/dark mode switches favicon
// TODO custom theme with corporate colors
// TODO implement application light/dark mode themes

### Token
Token is stored in localstorage and put into each outgoing request header
//TODO implement token lifecycle (validTo, refresh) - needs diferent api

## Store
//TODO implement state management and caching - ngrx/stateX/apollo...
//TODO overfetching optimalization

## Login 
diferent login screen for landscape and portrait view
login states 
## Users
User list is responsive 
There could be potentially a lot of users in the list comming from the API. Therfore I have decided to use CDK-virtual-scroller from angular material CDK

To compensate the UX for the long fetching delay I have implemented the use of dumb loading components.

//TODO better looking "dumb components" + animation
//TODO diferent routes for mobile/desktop => in Desktop open User Detail in an auxiliary route on the same page
### User tile 
Img has directive to fallback for broken links (default avatar)
Tmg is lazy loaded
email icon is an href mailto: link to open new email
name is a link to detail page

### Fetch more
Right now it is fetching 5 users per page (per one fetch) 
There is a continuous fetching for next page items even-though the previous data are not loaded yet.

//TODO in case of really long list - implement persisting of scroll position + loading previous pages (requires caching of users data)
//TODO implement "rubber-band" scroll end

## Errors
implemented handling of Server side error - 404
//TODO implement app-wide error handling for both server and client side errors 
## Optimization
use of boundle-optimization to optimze importing modules

### More TODO
//TODO REFACTOR CSS - CSS needs to be refactored into production version!!!!
//TODO put component "state classes" hostbindings into directive
//TODO create more component states Update/New/Saving
