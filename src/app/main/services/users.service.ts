import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly url = environment.ACC_API;

  constructor(
    private cookies: CookieService,
    private httpClient: HttpClient,
    private messageService: MessageService,
    private authenticationService: AuthenticationService
    ) { }

    getAllUsers(){
      let responseAllUsers: BehaviorSubject<any> = new BehaviorSubject(undefined);
      const header = { 
          headers: new HttpHeaders({
            'observe': 'response',
            'Authorization': `${this.authenticationService.getToken()}`
          })
      }

      this.httpClient.get<any>(`${this.url}/getAll`, header).subscribe(
          response => {
              responseAllUsers.next(response);
          },
          error => {
            this.messageService.showSnackbar('Erro no login!', 'snackbar-error');
          }
      );

      return responseAllUsers.asObservable();
  }

  getAllJobs(){
    let responseAllUsers: BehaviorSubject<any> = new BehaviorSubject(undefined);
    const header = { 
        headers: new HttpHeaders({
          'observe': 'response',
          'Authorization': `${this.authenticationService.getToken()}`
        })
    }

    this.httpClient.get<any>(`${this.url}/jobs`, header).subscribe(
        response => {
            responseAllUsers.next(response);
        },
        error => {
          this.messageService.showSnackbar('Erro no login!', 'snackbar-error');
        }
    );

    return responseAllUsers.asObservable();
  }

  getJobById(_id){
      let responseJob: BehaviorSubject<any> = new BehaviorSubject(undefined);
      const header = { 
          headers: new HttpHeaders({
            'observe': 'response',
            'Authorization': `${this.authenticationService.getToken()}`
          })
      }

      this.httpClient.get<any>(`${this.url}/readJob/${_id}`, header).subscribe(
          response => {
            responseJob.next(response);
          },
          error => {
            this.messageService.showSnackbar('Erro no login!', 'snackbar-error');
          }
      );

      return responseJob.asObservable();
  }

  getApplicatedVacancy(id) {
      let responseJobApplicated: BehaviorSubject<any> = new BehaviorSubject(undefined);
      const header = { 
          headers: new HttpHeaders({
            'observe': 'response',
            'Authorization': `${this.authenticationService.getToken()}`
          })
      }

      this.httpClient.get<any>(`${this.url}/readJobApplied/${id}`, header).subscribe(
          response => {
              responseJobApplicated.next(response);
          },
          error => {
              this.messageService.showSnackbar('Erro ao recuperar vagas aplicadas!', 'snackbar-error');
          }
      );

      return responseJobApplicated.asObservable();
  }
}
