import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { CustomValidators } from './custom-validators';
import { Router } from "@angular/router"
import { MessageService } from '../../services/message.service';


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

  identification: string;

  constructor(
      private formBuilder: FormBuilder,
      private authenticationService: AuthenticationService,
      private router: Router,
      private messageService: MessageService,
  ) { }

  ngOnInit() {
      this.buildLoginForm();
      this.authenticationService.deleteToken();
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
      if(this.identification == 'student'){
          this.authenticationService.authenticate(form.value).subscribe(
              response => {
                  if(!response) {
                    return;
                  }

                  this.router.navigate(['/home', response._id])
              }
          )
      } else if (this.identification == "company") {
        this.authenticationService.authenticateCompany(form.value).subscribe(
            response => {
                if(!response) {
                  return;
                }

                this.router.navigate(['/home', response._id])
            }
        )
      } else {
          this.messageService.showSnackbar('Selecione um identificação !', 'snackbar-warning');
          return;
      }

  }

  openRegisterClick() {
      this.openRegister.emit("true");
  }

  openForgotPassword() {
      this.openForgotPassw.emit("true");
  }

}