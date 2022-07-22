import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { EditProfileComponent } from '../../actions-user/modais/edit-profile/edit-profile.component';
import { ViewProfileComponent } from '../../actions-user/modais/view-profile/view-profile.component';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  idUser: string;
  isOpenMenu: boolean = false;
  infoUserDTO: any;
  @Input() isHomePage: boolean;
  @Input() noIsMyProfilePage: boolean;
  isStudent: boolean;

  name: string = "...";

  constructor(
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private router: Router,
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
          this.name = response.name;
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
          this.name = response.companyName;
          this.infoUserDTO = response;
      }
    );
  }

  showMenu() {
      this.isOpenMenu = !this.isOpenMenu;
  }

  logout() {
      this.authenticationService.deleteToken();
      this.router.navigate(['/']);
  }

  openJobVacancy() {
      this.router.navigate(['/openJob', this.idUser]);
  }

  openMyProfile() {
      this.router.navigate([`/profile`, this.idUser]);
  }

  openHome() {
      this.router.navigate(['/home', this.idUser]);
  }

  openModalViewProfile() {
      this.dialog.open(ViewProfileComponent, {
          height: '100%',
          data: {
            "info": this.infoUserDTO,
            "isHome": true
        }
      });
  }

  openModalEditProfile() {
      this.dialog.open(EditProfileComponent, {
          height: '100%',
          data: this.infoUserDTO
      });
  }
}
