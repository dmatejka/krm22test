import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, throwError } from 'rxjs';
import { tap, switchMap, catchError, map } from 'rxjs/operators';
import { User } from 'src/app/users/models/User';
import { ApiStatus, UsersService } from '../services/users.service';

@Component({
  selector: 'krm-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailComponent implements OnInit, OnDestroy {
  user$: Observable<User | undefined>;
  id: number = -1;
  // public userStatus$: Observable<ApiStatus | undefined>;
  status: ApiStatus = ApiStatus.loading;
  userSub: Subscription;


  constructor(
    private location: Location,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
  ) {

    this.user$ = this.route.paramMap.pipe(
      map(params => this.id = Number(params.get('id'))),
      switchMap( id => this.usersService.getUser(id)),
      catchError((err) => {
            console.error({err});
            this.router.navigate(['/pageNotFound']);
            return throwError(() => new Error(err))
          } )
      );
      this.userSub = this.usersService.userStatus$.pipe(tap(data => console.log('user status: ', data))).subscribe(status => this.status = status);
  // this.userStatus$ = this.usersService.userStatus$.pipe(tap(data => console.log('user status: ', data)));

    }


  ngOnInit(): void {
  }

  ngOnDestroy(){
    if(this.userSub) this.userSub.unsubscribe();
  }


  goBack(): void {
    this.location.back();
  }

}
