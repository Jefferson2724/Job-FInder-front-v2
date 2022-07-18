import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  idUser: string;
  isOpenMenu: boolean = false;
  userName: string;
  @Input() noIsHomePage: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit() {
      if(!this.noIsHomePage) {
          this.idUser = this.activatedRoute.snapshot.params['id'];
          this.infoUser();
      }
  }

  infoUser(){
    this.authenticationService.getUserById(this.idUser).subscribe(
      response => {
        if(!response) {
            return;
        }

        this.userName = response.name;
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
      this.router.navigate(['/openJob']);
  }
}
