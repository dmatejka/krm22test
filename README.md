# Krm22
This is test PWA with App-shell.

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
login states - loading/success/error
## Users
User list is responsive   
For scrooll position change I have used CDK-virtual-scroller from angular material CDK.  

To compensate the UX for the long fetching delay I have implemented the use of dumb loading components.  

//TODO better looking "dumb components" + animation  
//TODO diferent routes for mobile/desktop => in Desktop open User Detail in an auxiliary route on the same page  
### User tile 
Image has directive to fallback for broken links (default avatar).  
Image is lazy loaded.  
Email icon is an href mailto:  - link to open new email.  
Name is a link to detail page  

### Fetch more
Right now it is fetching 5 users per page (per one fetch).  
There is a continuous fetching for next page items even-though the previous data are not loaded yet.  

//TODO in case of really long list - implement persisting of scroll position + loading previous pages (requires caching of users data).  
//TODO implement "rubber-band" scroll end.  

## Errors
implemented handling of Server side error - 404  
//TODO implement app-wide error handling for both server and client side errors 
## Optimization
use of boundle-optimization to optimze importing modules

### More TODO
//TODO REFACTOR CSS - CSS needs to be refactored into production version!!!!  
//TODO put component "state classes" hostbindings into directive  
//TODO create more component states Update/New/Saving  
