# Krm22
This is test project for KRM22 interview process
It is a PWA with App-shell.

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
// TODO implement application light/dark mode themes

### Token
//TODO implement token lifecycle (validTo, refresh)

## Store
//TODO implement state management and caching - ngrx/stateX/apollo...
//TODO overfetching optimalization

## Login 
diferent login screen for landscape and portrait view
## Users
There could be potentially a lot of users in the list comming from the API. Therfore I have decided to use CDK-virtual-scroller

To compensate the UX for the long fetching delay I have implemented the use of dumb loading components.

//TODO better looking "dumb components" + animation
//TODO diferent routs for mobile/desktop => in Desktop open User Detail in an auxiliary route on the same page
//TODO implement some kind of paging indicator (where I am in the list?)
### User tile 
Img has directive to fallback for broken links (default avatar)
Tmg is lazy loaded
email icon is an href mailto: link to open new email
name is a link to detail page

### Fetch more
Right now it is fetching 4 users per page (per one fetch) to show the continuous fetching even-though the previous data are not loaded. In real life ther would be more items fetched on one go 

//TODO implement persisting of scroll position + loading previous pages (requires caching of users data)
//TODO implement "rubber-band" scroll end

## Errors
implemented handling of Server side error - 404
//TODO implement app-wide error handling for both server and client side errors 
## Optimization
use of boundle-optimization to optimze importing modules

### More TODO
//TODO implement custom theming colors - corporate colors
//TODO REFACTOR CSS - CSS needs to be refactored into production version!!!!
//TODO put component "state classes" hostbindings into directive
//TODO create more component states Update/New/Saving
