import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from 'src/app/users/models/User';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'krm-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailComponent implements OnInit {
  user$: Observable<User | undefined>;
  id: number = -1;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
  ) {
    this.route.paramMap
      .pipe(map(params => params.get('id')))
      .subscribe(id => (this.id = id ? +id : -1));

    this.user$ = this.usersService.getUser(this.id);
   }

  ngOnInit(): void {

  }


}
