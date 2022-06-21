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


  constructor(
    private ngZone: NgZone,
    protected usersService: UsersService
  ) {
    this.userSub = this.usersService.listStatus$.pipe(tap(status => console.log({status}))).subscribe(status => this.listStatus = status);
  }

  ngOnInit(){
    const usersList$ = this.usersService.getPage(1, 7).pipe(shareReplay(1));
    usersList$.pipe(
      map(ul => ul.list ),
      tap(list => {
          const old = this.updateList;
          this.updateList = [...old, ...list];
          console.log('upadtelist', this.updateList)
        })
    ).subscribe(newdata => console.log({newdata}, this.updateList));
    this.page$ = usersList$.pipe(map(ul => ul.page ));



  }

  fetchMore(){
    this.usersService.getPage(2, 7).pipe(
      map(ul => ul.list ),
      startWith([initUser(), initUser()]),
      tap(list => {
          const old = this.updateList;
          this.updateList = [...old, ...list.filter(newI => !old.find(i => i.id === newI.id) ) ];
          console.log('upadtelist', this.updateList)
        })
    ).subscribe(newdata => console.log({newdata}, this.updateList))

  };

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
