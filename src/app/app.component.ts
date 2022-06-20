import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './core/services/auth.service';
import { TokenService } from './core/services/token.service';

@Component({
  selector: 'krm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'krm22';
  public isLoggedIn$: Observable<boolean>;

  constructor(
    private authService:AuthService,
    private tokenService:TokenService
    ) {
    this.isLoggedIn$ = this.tokenService.isLoggedIn$;
  }

  logout() {
    this.authService.logout();
  }
}
