import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService } from 'src/app/main/services/authentication.service';

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

    constructor(
        private dialogRef: MatDialogRef<EditProfileComponent>,
        private authenticationService: AuthenticationService,
        private formBuilder: FormBuilder,
        @Optional() @Inject(MAT_DIALOG_DATA) data,
    ) { 
        this.data = data;
    }

    async ngOnInit() {
        if(!this.data) {
            this.dialogRef.close();
        }

        this.buildLoginForm(this.data);
    }
    
    buildLoginForm(infoUser) {
        debugger;
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
            organization: [
                infoUser.organization, [Validators.required]
            ],
            function: [
                infoUser.function, [Validators.required]
            ],
            avaibility: [
                infoUser.avaibility, [Validators.required]
            ],
            nationality: [
                infoUser.nationality, [Validators.required]
            ],
            state: [
                infoUser.state, [Validators.required]
            ],
            password: [
                '', [Validators.required]
            ]
        });
        
    }
}
