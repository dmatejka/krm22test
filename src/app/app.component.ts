import { Component } from '@angular/core';
import { Location } from "@angular/common";

import { Observable } from 'rxjs';
import { LoginComponent } from './core/components/login/login.component';
import { AuthService } from './core/services/auth.service';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';

@Component({
  selector: 'krm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'krm22';
  public isLoggedIn$: Observable<boolean>;
  public showHeader: boolean = false;
  public showBack: boolean = false;

  constructor(
    private authService:AuthService,
    private location: Location,

    ) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  setHeader(event: any){
    console.log({event})
    this.showHeader = !(event instanceof LoginComponent);
    this.showBack = (event instanceof UserDetailComponent || event instanceof PageNotFoundComponent);
  }

  logout() {
    this.authService.logout();
  }

  goBack(): void {
    this.location.back();
  }
}
