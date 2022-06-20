import { AfterViewInit, Component, OnInit } from '@angular/core';
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
export class UsersComponent implements AfterViewInit {
  public users$!: Observable<User[]>;
  public page$!: Observable<Pagination>;
  public listStatus!: ApiStatus;
  // public listStatus$!: Observable<ApiStatus>;

  constructor(protected usersService: UsersService) {
    this.usersService.listStatus$.pipe(tap(status => console.log({status}))).subscribe(status => this.listStatus = status);
  }

  ngOnInit(){
    const usersList$ = this.usersService.getPage(1, 7);
    this.users$ = usersList$.pipe(map(ul => ul.list ));
    this.page$ = usersList$.pipe(tap(page => console.log({page})),map(ul => ul.page ));
  }
  ngAfterViewInit(): void {

  }
}
