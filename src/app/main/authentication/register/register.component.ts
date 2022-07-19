import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from '../../models/Company.model';
import { Student } from '../../models/student.model';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  identification: string;
  registerForm: FormGroup;

  dataStudent: Student = new Student();
  dataCompany: Company = new Company();

  @Output() openAuth = new EventEmitter();

  constructor(
      private formBuilder: FormBuilder,
      private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
      this.startForm();
  }

  backAuth(){
      this.openAuth.emit("true");
  }

  startForm(){
    this.registerForm = this.formBuilder.group({
        name: ['',
            [Validators.required]
        ],
        login: ['',
            [Validators.required]
        ],
        email: [
            '', [Validators.required]
        ],
        phone: [
            '', [Validators.required]
        ],
        identity: [
            '', [Validators.required]
        ],
        age: [
            '', [Validators.required]
        ],
        organization: [
            '', [Validators.required]
        ],
        function: [
            '', [Validators.required]
        ],
        avaibilityForm: [
            '', [Validators.required]
        ],
        nationality: [
            '', [Validators.required]
        ],
        state: [
            '', [Validators.required]
        ],
        password: [
            '', [Validators.required]
        ],
        confirmPassword: [
            '', [Validators.required]
        ]
		});
  }

  submitRegister(form){
      if(this.registerForm.invalid) {
          return;
      }

      if(form.value.password != form.value.confirmPassword) {
          return;
      }

      if(!this.identification) {
          return;
      }

      let data = this.identification == "student" ? this.isStudent(form) : this.isCompany(form);
      this.authenticationService.register(data);

      this.backAuth();
  }

  isStudent(form) {
      for(let field in form.value) {
          switch(field){
            case 'avaibilityForm':
              this.dataStudent['availability'] = form.value[field];
              break;
            case 'organization':
              this.dataStudent['college'] = form.value[field];
              break;
            case 'function':
              this.dataStudent['period'] = form.value[field];
              break;
            case 'confirmPassword':
              break;
            default:
              this.dataStudent[field] = form.value[field];
              break;
          }
      }

      return this.dataStudent;
  }

  isCompany(form) { 
      for(let field in form.value) {
        switch(field){
            case 'identity':
                this.dataCompany['cnpj'] = form.value[field];
                break;
            case 'avaibilityForm':
                this.dataCompany['availability'] = form.value[field];
                break;
            case 'organization':
                this.dataCompany['office'] = form.value[field];
                break;
            case 'period':
                break;
            case 'age':
                break;
            case 'function':
                break;
            case 'confirmPassword':
                break;
            default:
                this.dataCompany[field] = form.value[field];
                break;
          }
      }

      return this.dataCompany;
  }
} 