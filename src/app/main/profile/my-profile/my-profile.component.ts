import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { EditProfileComponent } from '../../actions-user/modais/edit-profile/edit-profile.component';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  isStudent: boolean;
  idUser: string;
  infoUserDTO: any;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
      this.idUser = this.activatedRoute.snapshot.params['id'];
      this.infoUser();
  }

  infoUser(){
    this.authenticationService.getUserById(this.idUser).subscribe(
      response => {
          if(!response) {
              return;
          }else if( response == "veio nada man") {
              this.infoCompany();
              return;
          }
          
          this.isStudent = true;
          this.infoUserDTO = response;
      }
    );
  }

  infoCompany() {
    this.authenticationService.getCompanyById(this.idUser).subscribe(
      response => {
          if(!response) {
              return;
          }

          this.isStudent = false;
          this.infoUserDTO = response;
      }
    );
  }

  openModalEditProfile() {
    this.dialog.open(EditProfileComponent, {
        height: '100%',
        data: this.infoUserDTO
    });
}

}
