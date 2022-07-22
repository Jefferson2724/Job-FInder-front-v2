import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ViewInfoJobComponent } from '../../actions-user/modais/view-info-job/view-info-job.component';
import { ViewProfileComponent } from '../../actions-user/modais/view-profile/view-profile.component';
import { AuthenticationService } from '../../services/authentication.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-list-jobs',
  templateUrl: './list-jobs.component.html',
  styleUrls: ['./list-jobs.component.css']
})
export class ListJobsComponent implements OnInit {

  @Input() page: string;

  pageIsMyVacancy: boolean;
  infoJob: any;
  
  count = ['1', '2', '3'];
  infoUserDTO: any;
  idUser: string;
  isStudent: boolean;

  name: string;

  listUsers = [];

  recomendationUsers = [];

  showUsers =  [];
  alreadyShowUsers = [];

  title: string;

  constructor(
      private activatedRoute: ActivatedRoute,
      private authenticationService: AuthenticationService,
      private dialog: MatDialog,
      private usersSerice: UsersService,
  ) { }

  ngOnInit() {
    this.idUser = this.activatedRoute.snapshot.params['id'];
    
    if(this.page == 'myVacancy') {
        this.pageIsMyVacancy = true;
    }

    this.infoUser();
  }

  setTitle() {
      if(this.isStudent && this.page == 'myVacancy') {
        this.title = "Visualizar minhas vagas aplicadas";
      } 
      else if (this.isStudent) {
        this.title = "Vagas disponíveis no momento";
      } 
      else if (!this.isStudent && this.page == 'myVacancy') {
        this.title = "Visualizar minhas vagas criadas";  
      } 
      else {
        this.title = "Usuários disponíveis para contato";
      }
  }

  infoUser(){
    this.authenticationService.getUserById(this.idUser).subscribe(
      response => {
          if(!response) {
              return;
          } else if( response == "veio nada man") {
              this.infoCompany();
              return;
          }
          
          this.isStudent = true;

          if(this.page != 'myVacancy') {
              this.getJobs();
          } 
          else {
              this.getMyVacancyApplication();
          }
          
          this.infoUserDTO = response;
          this.setTitle();
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

          if(this.page != 'myVacancy') {
              this.getUsers();
          }

          this.infoUserDTO = response;
          this.setTitle();
      }
    );
  }

  getJobs() {
      this.usersSerice.getAllJobs().subscribe(
        response => {
            if(!response) {
              return;
            }

            this.recomendationUsers = response;
            //this.showUsersRecomendation(response);
        }
    );
  }

  getUsers() {
      this.usersSerice.getAllUsers().subscribe(
          response => {
              if(!response) {
                return;
              }

              this.recomendationUsers = response;
              //this.showUsersRecomendation(response);
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
    if(this.page == 'myVacancy') {
        vacancy['page'] = 'myVacancy';
    }

      vacancy['id'] = this.idUser;
      this.dialog.open(ViewInfoJobComponent, {
          height: '100%',
          data: vacancy
      });
  }

  openModalViewProfile(student) {
      if(this.page == 'myVacancy') {
          student['page'] = 'myVacancy';
      }

      this.dialog.open(ViewProfileComponent, {
          height: '100%',
          data: student
      });
  }

  getMyVacancyApplication() {
      this.usersSerice.getApplicatedVacancy(this.idUser).subscribe(
          response => {
              if(!response) {
                  return;
              }

              this.recomendationUsers = response;
          });
  }

  openUserInVacancy(user) {
    this.authenticationService.getUserById(user.appliedBy).subscribe(
      response => {
          if(!response) {
              return;
          }

          this.openModalViewProfile(response);
      }
    );
  }
}
