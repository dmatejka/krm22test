import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Pagination } from '../core/models/ListPage';
import { User } from './models/User';
import { ApiStatus, UsersService } from './services/users.service';

@Component({
  selector: 'krm-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public users$: Observable<User[]>;
  public page$: Observable<Pagination>;
  public listStatus$: Observable<ApiStatus>;

  constructor(protected usersService: UsersService) {
    this.users$ = this.usersService.getPage(1, 7).pipe(map(ul => ul.list ));
    this.page$ = this.usersService.getPage(1, 7).pipe(tap(page => console.log({page})),map(ul => ul.page ));
    this.listStatus$ = this.usersService.listStatus$;
  }

  ngOnInit(): void {

  }
}
