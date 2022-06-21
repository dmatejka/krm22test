import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, Component, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay, tap, pairwise, filter, throttleTime, startWith, } from 'rxjs/operators';
import { Pagination } from 'src/app/core/models/ListPage';
import { initUser, User } from '../models/User';
import { ApiStatus, UsersService } from '../services/users.service';


@Component({
  selector: 'krm-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements AfterViewInit, OnDestroy {
  public users$!: Observable<User[]>;
  public page$!: Observable<Pagination>;
  public listStatus!: ApiStatus;
  userSub: Subscription;
  // public listStatus$!: Observable<ApiStatus>;

  @ViewChild('scroller') scroller!: CdkVirtualScrollViewport;
  public updateList: any[] = [];
  public page!: Pagination;


  constructor(
    private ngZone: NgZone,
    protected usersService: UsersService
  ) {
    this.userSub = this.usersService.listStatus$.pipe(tap(status => console.log({status}))).subscribe(status => this.listStatus = status);
  }

  ngOnInit(){
    const per_page = 4;

    const usersList$ = this.usersService.getPage(1, per_page).pipe(shareReplay(1));
    const nextPage = new Pagination(1,per_page, per_page, 1); // only to init firstpage of dumb components

    usersList$.pipe(
      startWith({list:this.generateUsers(nextPage)}),
      map(ul => ul.list ),
      tap(list => {
          const old = this.updateList;
          this.mergeArraysById(old, list);
        })
    ).subscribe(newList => console.log({newList}, this.updateList)); //TODO unsub

    this.page$ = usersList$.pipe(
      map(ul => ul.page ),
      tap(page => this.page = page)
    );
    this.page$.subscribe(newPage => console.log({newPage}, this.updateList)); //TODO unsub;



  }

  fetchMore(){
    const page: Pagination = this.page;
    const nextPage = this.getNext(page);
    console.log('fetch',{nextPage})
    if(nextPage) {
      this.page = nextPage;
      this.usersService.getPage(nextPage.page, nextPage.per_page).pipe(
        startWith({list:this.generateUsers(nextPage)}),
        map(ul => ul.list ),
        tap(list => {
          const old = this.updateList;
          console.log( {nextPage} )
          console.log('new-list', list, {old}, )
          this.mergeArraysById(old, list);
          console.log('upadtelist', this.updateList)
          })
      ).subscribe(newdata => console.log({newdata}, this.updateList))
    }

  };

  private mergeArraysById(old: any[], newArr: User[]) {
    this.updateList = [...old.map(oldI => newArr.find(i => oldI.id === i.id) || oldI), ...newArr.filter(newI => !old.find(i => i.id === newI.id))];
  }

  private generateUsers(page: Pagination): User[] {
    const {per_page, total, total_pages} = page;
    const currentPage = page.page;
    const from = ((currentPage - 1) * per_page) + 1;
    const to = currentPage * per_page < total ? currentPage * per_page : total;

    const dumbUsers: User[] = [];
    for(let i = from; i <= to; i++){
      dumbUsers.push(new User(i, 'dumb', 'dumb', 'dumb', 'assets/avatar/dumb.svg'));
    }
    return dumbUsers;
  }

  private getPrevious(page: Pagination): Pagination | undefined {
    if (page.page - 1 < 1) return undefined;
    return new Pagination(page.page - 1, page.per_page, page.total, page.total_pages);
  }

  private getNext(page: Pagination): Pagination | undefined {
    if (page.page + 1 > page.total_pages) return undefined;
    return new Pagination(page.page + 1, page.per_page, page.total, page.total_pages);
  }

  trackElement(index: number, element: any) {
    return element ? element.id : null
  }

  ngAfterViewInit() {

    // TODO combine with page.total_pages & page.page
    this.scroller.elementScrolled().pipe(
      map(() => this.scroller.measureScrollOffset('bottom')),
      pairwise(),
      filter(([y1, y2]) => (y2 < y1 && y2 < 140)),
      throttleTime(200)
    ).subscribe(() => {
      this.ngZone.run(() => {
        this.fetchMore();
      });
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }


}
