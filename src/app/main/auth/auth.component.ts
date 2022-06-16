import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  error: string;
  submitted: boolean;

  @Output() openRegister = new EventEmitter();
  @Output() openForgotPassw = new EventEmitter()

  constructor(
      private formBuilder: FormBuilder,
      private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
      this.buildLoginForm();
  }

  buildLoginForm() {
      this.loginForm = this.formBuilder.group({
        login: ['', [
          CustomValidators.loginValidator,
          Validators.required,
        ]],
        password: ['', Validators.required]
      });
	}

  resetErrors() {
      this.error = '';
      this.submitted = false;
	}

  enter(form) {
      //TODO: Fazer validações redirecionar a tela principal
      /*if(this.loginForm.invalid){
          return;
      }*/

      this.authenticationService.authenticate(form.value);
  }

  openRegisterClick() {
      this.openRegister.emit("true");
  }

  openForgotPassword() {
      this.openForgotPassw.emit("true");
  }

}