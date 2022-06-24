import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, Component, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { map, tap, pairwise, throttleTime, startWith, } from 'rxjs/operators';

import { BreakpointObserver } from '@angular/cdk/layout';

import { Pagination } from 'src/app/core/models/ListPage';
import { getDumb, User } from '../models/User';
import { ApiStatus } from 'src/app/core/models/ApiStatus';
import { UsersService } from '../services/users.service';
import { CompOrientation, CompState } from 'src/app/core/models/CompState';

const ITEMS_PER_PAGE = 5; //TODO move to config file

@Component({
  selector: 'krm-users',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements AfterViewInit, OnDestroy {
  // enums for Templates
  public CompStateT = CompState;
  public ApiStatusT = ApiStatus;
  public CompOrientationT = CompOrientation;

  // public users$!: Observable<User[]>;
  // public page$!: Observable<Pagination>;
  public listStatus!: ApiStatus;
  userSub: Subscription;
  // public listStatus$!: Observable<ApiStatus>;

  @ViewChild('scroller') scroller!: CdkVirtualScrollViewport;
  public users: any[] = [];
  public page!: Pagination;
  narrow: boolean = true;


  constructor(
    private ngZone: NgZone,
    private observer: BreakpointObserver,
    protected usersService: UsersService
  ) {
    this.observer.observe('(min-width: 500px)').subscribe((result) => {
      this.narrow = !result.matches;
    });
    this.userSub = this.usersService.listStatus$.subscribe(status => this.listStatus = status);
  }

  ngOnInit(){
    this.page = new Pagination(1, ITEMS_PER_PAGE, ITEMS_PER_PAGE, 1); // only to init firstpage of dumb components
    this.usersService.getPage(1, ITEMS_PER_PAGE).pipe(
      startWith({page: this.page, list:this.generateUsers(this.page)}),
      tap(listPage => {
          this.users = this.mergeArraysById(this.users, listPage.list);
          this.page = listPage.page;
        }),
      tap(usersPage => console.log({'usersPage': usersPage})),
    ).subscribe();

  }

  fetchMore(){
    const page: Pagination = this.page;
    const nextPage = this.getNext(page);
    if(nextPage) {
      console.log('fetch',{nextPage})
      this.page = nextPage;
      this.usersService.getPage(nextPage.page, nextPage.per_page).pipe(
        startWith({page: nextPage, list:this.generateUsers(nextPage)}),
        tap(pagelist => {
          this.page = pagelist.page;
          this.users = this.mergeArraysById(this.users, pagelist.list)
        }),
        tap(usersPage => console.log({'usersPage fetchmore': usersPage})),
        // take(1)
      ).subscribe()
    }

  };

  private mergeArraysById(old: any[], newArr: User[]): User[] {
    return [...old.map(oldI => newArr.find(i => oldI.id === i.id) || oldI), ...newArr.filter(newI => !old.find(i => i.id === newI.id))];
  }

  private generateUsers(page: Pagination): User[] {
    const {per_page, total, total_pages} = page;
    const currentPage = page.page;
    const from = ((currentPage - 1) * per_page) + 1;
    const to = currentPage * per_page < total ? currentPage * per_page : total;

    const dumbUsers: User[] = [];
    for(let i = from; i <= to; i++){
      dumbUsers.push(getDumb(i));
    }
    return dumbUsers;
  }

  private getPrevious(page: Pagination): Pagination | undefined {
    if (page.page - 1 < 1) return undefined;
    return new Pagination(page.page - 1, page.per_page, page.total, page.total_pages);
  }

  private getNext(page: Pagination): Pagination | undefined {
    if (!page || page.page + 1 > page.total_pages) return undefined;
    return new Pagination(page.page + 1, page.per_page, page.total, page.total_pages);
  }

  trackElement(index: number, element: any) {
    return element ? element.id : null
  }

  ngAfterViewInit() {
    this.scroller.elementScrolled().pipe(
      map(() => this.scroller.measureScrollOffset('bottom')),
      pairwise(),
      // filter(([y1, y2]) => (y2 < y1 && y2 < 140)),
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
