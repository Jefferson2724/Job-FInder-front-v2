import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserLogin } from '../models/userLogin';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  private readonly url = environment.ACC_API;

    constructor(
      private cookies: CookieService,
      private httpClient: HttpClient,
      private messageService: MessageService,
      ) { }
    
    register(data){
      let responseRegister: BehaviorSubject<any> = new BehaviorSubject(undefined);
      
      this.httpClient.post<any>(`${this.url}/createUser`, data, {observe: 'response'}).subscribe(
          response => {
              responseRegister.next(response.body);

              this.messageService.showSnackbar('Conta registrada com sucesso!', 'snackbar-success');
          },
          error => {
              this.messageService.showSnackbar('Error, conta não criada !', 'snackbar-error');

              responseRegister.next(undefined);
          }
      );

      return responseRegister.asObservable();
    }

    login(data){
        let responseLogin: BehaviorSubject<any> = new BehaviorSubject(undefined);
        const header = { 
            headers: new HttpHeaders({
              'observe': 'response',
              'Authorization': `${this.getToken()}`
            })
        }

        this.httpClient.post<any>(`${this.url}/userLogin`, data, header).subscribe(
            response => {
                responseLogin.next(response);

            },
            error => {
              this.messageService.showSnackbar('Erro no login!', 'snackbar-error');
            }
        );
    }

    authenticate(data) {
        let responseRegister: BehaviorSubject<any> = new BehaviorSubject(undefined);

        this.httpClient.post<any>(`${this.url}/authenticate`, data, {observe: 'response'}).subscribe(
            response => {
                this.setTokenCookie(response.body.token);

                let dataLogin = new UserLogin();
                dataLogin._id = response.body.usuario._id;
                dataLogin.login = data.login;
                dataLogin.password = data.password;
                this.login(dataLogin);

                responseRegister.next(response.body.usuario);
            },
            error => {
              this.messageService.showSnackbar('Erro no login!', 'snackbar-error');

              responseRegister.next(undefined);
            }
        );

        return responseRegister.asObservable();
    }

    requestUser(idUser) {
      let responseUser: BehaviorSubject<any> = new BehaviorSubject(undefined);
      const header = { 
          headers: new HttpHeaders({
            'observe': 'response',
            'Authorization': `${this.getToken()}`
          })
      }

      this.httpClient.get<any>(`${this.url}/userRead/${idUser}`, header).subscribe(
          response => {
              responseUser.next(response);

          },
          error => {
            this.messageService.showSnackbar('Erro no login!', 'snackbar-error');
          }
      );
    }

    getUserById(id) {
      let responseUser: BehaviorSubject<any> = new BehaviorSubject(undefined);
      const header = { 
        headers: new HttpHeaders({
          'observe': 'response',
          'Authorization': `${this.getToken()}`
        })
      }

      this.httpClient.get<any>(`${this.url}/readUser/${id}`, header).subscribe(
          response => {
              responseUser.next(response);
          },
          error => {
            this.messageService.showSnackbar('Erro ao tentar buscar dados!', 'snackbar-error');

            responseUser.next(undefined);
          }
      );

      return responseUser.asObservable();

    }

    setTokenCookie(token){
      this.cookies.set("Authorization", token);
    }
  
    deleteToken(){
      this.cookies.deleteAll();
      this.cookies.delete("Authorization");
    }
  
    getToken(){
      return this.cookies.get("Authorization");
    }
}
