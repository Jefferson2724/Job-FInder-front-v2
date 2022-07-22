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
export class JobService {

  private readonly url = environment.ACC_API;

  constructor(
    private cookies: CookieService,
    private httpClient: HttpClient,
    private messageService: MessageService,
    private authenticationService: AuthenticationService
    ) { }

    createJob(data){
      let responseCreateJob: BehaviorSubject<any> = new BehaviorSubject(undefined);

      const header = { 
          headers: new HttpHeaders({
            'observe': 'response',
            'Authorization': `${this.authenticationService.getToken()}`
          })
      }

      this.httpClient.post<any>(`${this.url}/createJob`, data, header).subscribe(
          response => {
              responseCreateJob.next(response);
              this.messageService.showSnackbar('Você criou a vaga com sucesso!', 'snackbar-success');
          },
          error => {
              this.messageService.showSnackbar('Houve um problema na criação, entre em contato com o administrador!', 'snackbar-error');
          }
      );

      return responseCreateJob.asObservable();
  }

  applicateJob(data){
    let responseCreateJob: BehaviorSubject<any> = new BehaviorSubject(undefined);

    const header = { 
        headers: new HttpHeaders({
          'observe': 'response',
          'Authorization': `${this.authenticationService.getToken()}`
        })
    }
    
    console.log(data);
    this.httpClient.post<any>(`${this.url}/applied`, data, header).subscribe(
        response => {
            responseCreateJob.next(response);
            this.messageService.showSnackbar('Vaga aplicada com sucesso !', 'snackbar-success');
        },
        error => {
            this.messageService.showSnackbar('Não foi possível aplicar a vaga, tente novamente mais tarde !', 'snackbar-error');
        }
    );

    return responseCreateJob.asObservable();
}
}
