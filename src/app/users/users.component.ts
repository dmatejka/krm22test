import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, } from 'rxjs/operators';
import { User } from './models/User';
import { UsersService } from './services/users.service';

@Component({
  selector: 'krm-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public users$: Observable<User[]>;

  constructor(protected usersService: UsersService) {
    this.users$ = this.usersService.getPage(2).pipe(map(ul => ul.list ));
  }

  ngOnInit(): void {

  }
}
