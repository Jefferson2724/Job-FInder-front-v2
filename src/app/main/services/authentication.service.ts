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
    
    registerStudent(data){
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

    registerCompany(data){
      let responseRegister: BehaviorSubject<any> = new BehaviorSubject(undefined);
      
      this.httpClient.post<any>(`${this.url}/createCompany`, data, {observe: 'response'}).subscribe(
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

    loginComapany(data){  
      let responseLogin: BehaviorSubject<any> = new BehaviorSubject(undefined);
      const header = { 
          headers: new HttpHeaders({
            'observe': 'response',
            'Authorization': `${this.getToken()}`
          })
      }

      this.httpClient.post<any>(`${this.url}/companyLogin`, data, header).subscribe(
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

    authenticateCompany(data) {
      let responseRegister: BehaviorSubject<any> = new BehaviorSubject(undefined);

      this.httpClient.post<any>(`${this.url}/authenticateCompany`, data, {observe: 'response'}).subscribe(
          response => {
              this.setTokenCookie(response.body.token);

              let dataLogin = new UserLogin();
              dataLogin._id = response.body.company._id;
              dataLogin.login = data.login;
              dataLogin.password = data.password;

              responseRegister.next(response.body.company);
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
              if(!response){
                  response = "veio nada man";
              }
              responseUser.next(response);
          },
          error => {
            this.messageService.showSnackbar('Erro ao tentar buscar dados!', 'snackbar-error');

            responseUser.next(undefined);
          }
      );

      return responseUser.asObservable();
    }

    getCompanyById(id) {
      let responseUser: BehaviorSubject<any> = new BehaviorSubject(undefined);
      const header = { 
        headers: new HttpHeaders({
          'observe': 'response',
          'Authorization': `${this.getToken()}`
        })
      }

      this.httpClient.get<any>(`${this.url}/readCompany/${id}`, header).subscribe(
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

    updateProfileUser(data) {
      let responseUpdateUser: BehaviorSubject<any> = new BehaviorSubject(undefined);
      const header = { 
        headers: new HttpHeaders({
          'observe': 'response',
          'Authorization': `${this.getToken()}`
        })
      }

      this.httpClient.put<any>(`${this.url}/updateUser`, data, header).subscribe(
          response => {
            responseUpdateUser.next(response);
            this.messageService.showSnackbar('Informações salvas com sucesso!', 'snackbar-success');
          },
          error => {
            this.messageService.showSnackbar('Houve um problema na hora de salvar, tente novamente mais tarde !', 'snackbar-error');

            responseUpdateUser.next(undefined);
          }
      );

      return responseUpdateUser.asObservable();
  }

    updateProfileCompany(data) {
        let responseUpdateCompany: BehaviorSubject<any> = new BehaviorSubject(undefined);
        const header = { 
          headers: new HttpHeaders({
            'observe': 'response',
            'Authorization': `${this.getToken()}`
          })
        }

        this.httpClient.put<any>(`${this.url}/updateCompany`, data, header).subscribe(
            response => {
              responseUpdateCompany.next(response);
              this.messageService.showSnackbar('Informações salvas com sucesso!', 'snackbar-success');
            },
            error => {
              this.messageService.showSnackbar('Houve um problema na hora de salvar, tente novamente mais tarde !', 'snackbar-error');

              responseUpdateCompany.next(undefined);
            }
        );

        return responseUpdateCompany.asObservable();
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
