import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ApiStatus } from '../../models/ApiStatus';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  ApiStatusT = ApiStatus;

  loginForm: FormGroup;
  emailCtr: AbstractControl;
  passwordCtr!: AbstractControl;

  loginStatus: ApiStatus | undefined = undefined;
  loginSub: Subscription;

  constructor(private router: Router, private authService: AuthService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
    });

    this.emailCtr = this.loginForm.get('email') as AbstractControl;
    this.passwordCtr = this.loginForm.get('password') as AbstractControl;

    this.loginSub = this.authService.logingInStatus$.subscribe(
      (status) => (this.loginStatus = status)
    );
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    if (this.loginSub) this.loginSub.unsubscribe();
  }

  forgotPassword() {
    console.info('TODO GO TO FORGOT PASSWORD PAGE');
  }
  signup() {
    console.info('TODO GO TO SIGN-UP PAGE');
  }

  submit() {
    if (this.loginForm.status === 'INVALID') return;

    this.loginForm.disable();
    this.authService
      .login(this.emailCtr.value, this.passwordCtr.value)
      .pipe(finalize(() => this.loginForm.enable()))
      .subscribe({
        next: () => this.router.navigate(['/', 'users']),
        error: (error) => {
          this.loginForm.reset();
          console.error({ error });
        },
      });
  }
}
