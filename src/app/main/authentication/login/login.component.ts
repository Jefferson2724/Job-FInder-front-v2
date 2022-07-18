import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: boolean = true;
  register: boolean;
  recoverPassword: boolean
  constructor() { }

  ngOnInit() {
  }

  openRegisterUser(){
      this.login = false;
      this.recoverPassword = false;
      this.register = true;
  }

  openRecoverPassw(){
      this.login = false;
      this.recoverPassword = true;
      this.register = false;
  }

  openLogin() {
    this.login = true;
    this.recoverPassword = false;
    this.register = false;
  }
}
