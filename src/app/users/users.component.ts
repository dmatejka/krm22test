import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { Pagination } from '../core/models/ListPage';
import { User } from './models/User';
import { ApiStatus, UsersService } from './services/users.service';

@Component({
  selector: 'krm-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnDestroy {
  public users$!: Observable<User[]>;
  public page$!: Observable<Pagination>;
  public listStatus!: ApiStatus;
  userSub: Subscription;
  // public listStatus$!: Observable<ApiStatus>;

  constructor(protected usersService: UsersService) {
    this.userSub = this.usersService.listStatus$.pipe(tap(status => console.log({status}))).subscribe(status => this.listStatus = status);
  }

  ngOnInit(){
    const usersList$ = this.usersService.getPage(1, 7).pipe(shareReplay(1));
    this.users$ = usersList$.pipe(map(ul => ul.list ));
    this.page$ = usersList$.pipe(map(ul => ul.page ));
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
