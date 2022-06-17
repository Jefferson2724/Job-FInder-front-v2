import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { CustomValidators } from './custom-validators';
import { Router } from "@angular/router"


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
      private authenticationService: AuthenticationService,
      private router: Router,
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
      this.authenticationService.authenticate(form.value).subscribe(
          response => {
              if(!response) {
                 return;
              }
              debugger;
              this.router.navigate(['/home', response._id])
          }
      )

  }

  openRegisterClick() {
      this.openRegister.emit("true");
  }

  openForgotPassword() {
      this.openForgotPassw.emit("true");
  }

}