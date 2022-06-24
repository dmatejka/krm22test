import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subscription, throwError } from 'rxjs';
import { tap, switchMap, catchError, map, startWith } from 'rxjs/operators';
import { getDumb, User } from 'src/app/users/models/User';
import { ApiStatus } from 'src/app/core/models/ApiStatus';
import { UsersService } from '../services/users.service';
import { CompOrientation, CompState } from 'src/app/core/models/CompState';


@Component({
  selector: 'krm-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailComponent implements OnInit, OnDestroy {
  // enums for Templates
  public CompStateT = CompState;
  public ApiStatusT = ApiStatus;
  public CompOrientationT = CompOrientation;

  user$: Observable<User | undefined>;
  id: number = -1;
  // public userStatus$: Observable<ApiStatus | undefined>;
  status: ApiStatus = ApiStatus.Loading;
  userSub: Subscription;


  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
  ) {

    this.user$ = this.route.paramMap.pipe(
      map(params => this.id = Number(params.get('id'))),
      switchMap( id => this.usersService.getUser(id)),
      startWith( getDumb() ),
      catchError((err) => {
            console.error({err});
            this.router.navigate(['/404']);
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

}
