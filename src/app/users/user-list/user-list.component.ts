import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  NgZone,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import {
  map,
  tap,
  pairwise,
  throttleTime,
  startWith,
  filter,
  scan,
} from 'rxjs/operators';

import { BreakpointObserver } from '@angular/cdk/layout';

import { ListPage, Pagination } from 'src/app/core/models/ListPage';
import { getDumb, User } from '../models/User';
import { ApiStatus } from 'src/app/core/models/ApiStatus';
import { UsersService } from '../services/users.service';
import { CompOrientation, CompState } from 'src/app/core/models/CompState';
import { filterNullish } from 'src/app/core/operators/filterNullish.operator';
import { mergeArraysById } from 'src/app/core/utils/array-utils';

const ITEMS_PER_PAGE = 5; //TODO move to config file

@Component({
  selector: 'krm-users',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements AfterViewInit, OnDestroy {
  // enums for Templates
  public CompStateT = CompState;
  public ApiStatusT = ApiStatus;
  public CompOrientationT = CompOrientation;

  public listStatus!: ApiStatus;
  public users$: Observable<User[]>;
  public page$: Observable<Pagination>;
  public narrow: boolean = true;

  private fetch$: Subject<any> = new Subject();
  private lastPage: Pagination = new Pagination(
    1,
    ITEMS_PER_PAGE,
    ITEMS_PER_PAGE,
    1
  );

  private fetchSub: Subscription;
  private userStatusSub: Subscription;
  private scrollSub!: Subscription;

  private readonly firstPage = {
    page: this.lastPage,
    list: this.generateUsers(this.lastPage),
  };

  private listPage$: BehaviorSubject<ListPage<User>> = new BehaviorSubject(
    this.firstPage
  );

  @ViewChild('scroller') scroller!: CdkVirtualScrollViewport;
  end: boolean = false;

  constructor(
    private ngZone: NgZone,
    private cd: ChangeDetectorRef,
    private observer: BreakpointObserver,
    protected usersService: UsersService
  ) {
    this.users$ = this.listPage$.pipe(
      map((lp) => lp.list),
      scan(
        (oldUsers, newUsers) => mergeArraysById(oldUsers, newUsers),
        new Array()
      )
    );

    this.page$ = this.listPage$.pipe(
      tap((newListPAge) => {
        if (newListPAge.page.page === newListPAge.page.total_pages) {
          this.end = true;
        } else {
          this.end = false;
        }
      }),
      map((lp) => lp.page),
      filter((page) => page.page >= this.lastPage.page),
      tap((page) => (this.lastPage = page))
    );

    this.fetchSub = this.fetch$
      .pipe(
        map(() => (this.end ? null : this.getNext(this.lastPage))),
        filterNullish(),
        tap((nextPage) =>
          this.usersService
            .getPage(nextPage.page, nextPage.per_page)
            .pipe(
              startWith({ page: nextPage, list: this.generateUsers(nextPage) }),
              tap((lp) => this.listPage$.next(lp))
            )
            .subscribe()
        )
      )
      .subscribe();

    this.userStatusSub = this.usersService.listStatus$.subscribe(
      (status) => (this.listStatus = status)
    );
  }

  ngOnInit() {
    this.observer.observe('(min-width: 500px)').subscribe((result) => {
      this.narrow = !result.matches;
      this.cd.detectChanges();
    });

    // get first page
    this.usersService
      .getPage(1, ITEMS_PER_PAGE)
      .subscribe((data) => this.listPage$.next(data));
  }

  fetchMore() {
    if (!this.end) this.fetch$.next(true);
  }

  private generateUsers(page: Pagination): User[] {
    const { per_page, total } = page;
    const currentPage = page.page;
    const from = (currentPage - 1) * per_page + 1;
    const to = currentPage * per_page < total ? currentPage * per_page : total;

    const dumbUsers: User[] = [];
    for (let i = from; i <= to; i++) {
      dumbUsers.push(getDumb(i));
    }
    return dumbUsers;
  }

  // private getPrevious(page: Pagination): Pagination | undefined {
  //   if (page.page - 1 < 1) return undefined;
  //   return new Pagination(
  //     page.page - 1,
  //     page.per_page,
  //     page.total,
  //     page.total_pages
  //   );
  // }

  private getNext(page: Pagination): Pagination | undefined {
    if (!page || page.page + 1 > page.total_pages) return undefined;
    return new Pagination(
      page.page + 1,
      page.per_page,
      page.total,
      page.total_pages
    );
  }

  trackElement(index: number, element: any) {
    return element ? element.id : null;
  }

  ngAfterViewInit() {
    this.scrollSub = this.scroller
      .elementScrolled()
      .pipe(
        map(() => this.scroller.measureScrollOffset('bottom')),
        throttleTime(200),
        pairwise(),
        filter(([y1, y2]) => (y2 < y1 && y2 < 350)),
      )
      .subscribe((scroll) => {
        this.ngZone.run(() => {
          this.fetchMore();
        });
      });
  }

  ngOnDestroy(): void {
    if (this.userStatusSub) this.userStatusSub.unsubscribe();
    if (this.scrollSub) this.scrollSub.unsubscribe();
    if (this.fetchSub) this.fetchSub.unsubscribe();
  }
}
