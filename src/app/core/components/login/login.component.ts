import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Me } from '../../models/Me';
import { TokenService } from '../../services/token.service';
import { AuthService } from '../../services/auth.service';
import { tap } from 'rxjs/operators'
import { ApiStatus } from 'src/app/users/services/users.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  emailCtr: AbstractControl;
  passwordCtr!: AbstractControl;
  loginStatus: ApiStatus | null = null;
  loginSub: Subscription;



  constructor(
    private router: Router,
    private tokenService: TokenService,
    private authService: AuthService,
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5)
      ])
    });
    this.emailCtr = this.loginForm.get<string>('email') as AbstractControl;
    this.passwordCtr = this.loginForm.get('password') as AbstractControl;

    this.loginSub = this.authService.logingInStatus$.pipe(tap(status => console.log({status}))).subscribe(status => this.loginStatus = status);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    if(this.loginSub) this.loginSub.unsubscribe();
  }

  setMe(tokenStr:string = '') {
    const me: Me = new Me(tokenStr);
    this.tokenService.setToken(me);
  }
  unsetMe() {
    // const me: Me = new Me(initUser(),tokenStr);
    this.tokenService.deleteToken();
  }

  forgotPassword() {
    console.info('GO TO FORGOT PASSWORD PAGE')
  }
  signup() {
    console.info('GO TO SIGN-UP PAGE')
  }

  submit() {
    if(this.loginForm.status === "INVALID" ) return;
    console.log(this.loginForm);
    this.authService.login(this.emailCtr.value, this.passwordCtr.value).pipe(
      tap( () => this.router.navigate(['/', 'users']) )
    ).subscribe(
      {
        next: data => console.log({data})
      }
    )

  }

}
