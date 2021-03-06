import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewInfoJobComponent } from '../../actions-user/modais/view-info-job/view-info-job.component';
import { ViewProfileComponent } from '../../actions-user/modais/view-profile/view-profile.component';
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
  isStudent: boolean;

  name: string;

  listUsers = [];

  recomendationUsers = [];

  showUsers =  [];
  alreadyShowUsers = [];

  constructor(
      private activatedRoute: ActivatedRoute,
      private authenticationService: AuthenticationService,
      private dialog: MatDialog,
      private usersSerice: UsersService,
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
          }else if(response == "veio nada man") {
              this.infoCompany();
              return;
          }
          
          this.isStudent = true;
          this.getJobs();
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
          this.getUsers();
          this.name = response.companyName;
          this.infoUserDTO = response;
      }
    );
  }

  getJobs() {
      this.usersSerice.getAllJobs().subscribe(
        response => {
            if(!response) {
              return;
            }

            this.listUsers = response;
            this.showUsersRecomendation(response);
        }
    );
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
      let lengthUsers = list.length - 1;
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

  openModalVacancy(vacancy){
      vacancy['id'] = this.idUser;
      this.dialog.open(ViewInfoJobComponent, {
          height: '100%',
          data: vacancy
      });
  }

  openModalViewProfile(student) {
      this.dialog.open(ViewProfileComponent, {
          height: '100%',
          data: student
      });
  }
}
