import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-job-recomendation',
  templateUrl: './job-recomendation.component.html',
  styleUrls: ['./job-recomendation.component.css']
})
export class JobRecomendationComponent implements OnInit {

  count = ['1', '2', '3'];
  infoUserDTO: any;
  idUser: string;

  name: string;

  listUsers = [];

  recomendationUsers = [];

  showUsers =  [];
  alreadyShowUsers = [];

  constructor(
      private activatedRoute: ActivatedRoute,
      private authenticationService: AuthenticationService,
      private router: Router,
      private dialog: MatDialog,
      private usersSerice: UsersService,
  ) { }

  ngOnInit() {
    this.idUser = this.activatedRoute.snapshot.params['id'];
    this.infoUser();
    this.getUsers();
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

          this.name = response.companyName;
          this.infoUserDTO = response;
      }
    );
  }

  getJobs() {

  }

  getUsers() {
      this.usersSerice.getAllUsers().subscribe(
          response => {
              if(!response) {
                return;
              }

              this.listUsers = response;
              this.showUsersRecomendation(response);
          }
      );
  }

  showUsersRecomendation(list){
      let lengthUsers = list.length;
      let count = 0;
      let alreadyNums = [];
      
      while(count < 3) {
          count++;
          let cotinueCod = true;
          let numRandom;
          
          while(cotinueCod) {
            numRandom = (Math.random() * (lengthUsers - 0) + 0).toFixed();
            cotinueCod = false;

              for(let nums of alreadyNums) {
                  if(nums == numRandom){
                      cotinueCod = true;
                      continue;
                  }
              }
          }

          alreadyNums.push(numRandom);

          this.recomendationUsers.push(this.listUsers[numRandom]);
      }
  }
}
