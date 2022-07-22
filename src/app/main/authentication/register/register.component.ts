import { Component, EventEmitter, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from '../../models/Company.model';
import { Student } from '../../models/student.model';
import { AuthenticationService } from '../../services/authentication.service';
import { MessageService } from '../../services/message.service';

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

  isStudentIndent:boolean = true
  fieldInvalid:string[] = [];

  @Output() openAuth = new EventEmitter();

  constructor(
      private formBuilder: FormBuilder,
      private authenticationService: AuthenticationService,
      private messageService: MessageService,
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
        title: [
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
        if(this.registerForm.invalid && this.identification == "student") {
            return;
        }

        if(form.value.password != form.value.confirmPassword) {
            this.messageService.showSnackbar("Sua confirmação de senha está incorreta!", 'snackbar-warning');
            return;
        }

        if(!this.identification) {
            this.messageService.showSnackbar('Selecione uma opção de identificação', 'snackbar-error');
            return;
        }

        let data
        if(this.identification == "student"){
            data = this.isStudent(form);
            this.authenticationService.registerStudent(data);
        } 
        else {
            data = this.isCompany(form);
            this.verifyFieldsCompany(form);

            if(this.fieldInvalid.length != 0) {
                return;
            }

            this.authenticationService.registerCompany(data);

        }

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
                case 'period':
                    break;
                case 'function':
                    break;
                case 'confirmPassword':
                    break;
                default:
                    this.dataStudent[field] = form.value[field];
                break;
            }
        }

        this.dataStudent['userType'] = "Estudante";

        return this.dataStudent;
    }

    isCompany(form) { 
        for(let field in form.value) {
            switch(field){
                case 'function':
                    this.dataCompany['office'] = form.value[field];
                    break;
                case 'name':
                    this.dataCompany['companyName'] = form.value[field];
                    break;
                case 'period':
                    break;
                case 'age':
                    break;
                case 'function':
                    break;
                case 'avaibilityForm':
                    break;
                case 'nationality':
                    break;
                case 'organization':
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

    verifyFieldsCompany(form) {
        this.fieldInvalid = [];

        for(let field in form.value) {
            if(field == "age" || field == "function" || field == "organization"
            || field == "nationality" || field == "avaibilityForm" || field == "title") {
                continue;
            }

            if(!form.value[field]) {
                this.fieldInvalid.push(field);
            }
        }

        if(this.fieldInvalid.length != 0) {
            this.messageService.showSnackbar('Os seguintes campos estão invalidos: ' + this.fieldInvalid.toString(), 'snackbar-warning');
        }
    }
} 
