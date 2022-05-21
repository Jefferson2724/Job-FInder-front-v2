import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private formBuilder: FormBuilder,
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

}