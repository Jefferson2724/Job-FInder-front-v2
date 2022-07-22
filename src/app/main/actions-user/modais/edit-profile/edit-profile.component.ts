import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService } from 'src/app/main/services/authentication.service';
import { MessageService } from 'src/app/main/services/message.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

    idUser: string;
    editUser: FormGroup;
    data: any;
    infoUserDTO: any;
    isStudent: boolean;

    constructor(
        private dialogRef: MatDialogRef<EditProfileComponent>,
        private authenticationService: AuthenticationService,
        private messageService: MessageService,
        private formBuilder: FormBuilder,
        @Optional() @Inject(MAT_DIALOG_DATA) data,
    ) { 
        this.data = data;
    }

    async ngOnInit() {
        if(!this.data) {
            this.dialogRef.close();
        }

        if(this.data.userType == "Estudante") {
            this.isStudent = true;
            this.buildLoginFormUser(this.data);
        } else {
            this.isStudent = false;
            this.buildLoginFormCompany(this.data);
        }
    }
    
    buildLoginFormUser(infoUser) {
        this.editUser = this.formBuilder.group({
            name: [
                infoUser.name, [Validators.required]
            ],
            email: [
                infoUser.email, [Validators.required]
            ],
            phone: [
                infoUser.phone, [Validators.required]
            ],
            identity: [
                infoUser.identity, [Validators.required]
            ],
            age: [
                infoUser.age, [Validators.required]
            ],
            title: [
                infoUser.title, [Validators.required]
            ],
            organization: [
                infoUser.college, [Validators.required]
            ],
            function: [
                infoUser.period, [Validators.required]
            ],
            availability: [
                infoUser.availability, [Validators.required]
            ],
            nationality: [
                infoUser.nationality, [Validators.required]
            ],
            state: [
                infoUser.state, [Validators.required]
            ],
            password: [
                infoUser.password, [Validators.required]
            ]
        });
    }

    buildLoginFormCompany(infoUser) {
        this.editUser = this.formBuilder.group({
            companyName: [
                infoUser.companyName, [Validators.required]
            ],
            email: [
                infoUser.email, [Validators.required]
            ],
            phone: [
                infoUser.phone, [Validators.required]
            ],
            identity: [
                infoUser.identity, [Validators.required]
            ],
            nationality: [
                'Brasil' , [Validators.required]
            ],
            state: [
                infoUser.state, [Validators.required]
            ],
            password: [
                infoUser.password, [Validators.required]
            ]
        });
    }

    requestEditUser(form) {
        
        if (this.editUser.invalid) {
            this.messageService.showSnackbar('Preencha todos os campos corretamente !', 'snackbar-warning');
            return;
        }

        if(this.isStudent) {
            this.authenticationService.updateProfileUser(form.value);
        } else {
            this.authenticationService.updateProfileCompany(form.value);
        }
    }
}
