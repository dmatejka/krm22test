import { Component, OnInit } from '@angular/core';
import { Me } from '../core/models/Me';
import { TokenService } from '../core/services/token.service';
import { initUser } from '../users/models/User';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
  }

  setMe(tokenStr:string = '') {
    const me: Me = new Me(initUser(),tokenStr);
    this.tokenService.setToken(me);
  }
  unsetMe() {
    // const me: Me = new Me(initUser(),tokenStr);
    this.tokenService.deleteToken();
  }

}
