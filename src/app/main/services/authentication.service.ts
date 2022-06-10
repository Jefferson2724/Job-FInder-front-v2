import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
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
      let header = new HttpHeaders();
      debugger;
      header = header.set("Access-Control-Allow-Origin", "*");
      /*header = header.set("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
      header = header.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
*/
      this.httpClient.post<any>(`${this.url}/createUser`, data, {observe: 'response', headers: header}).subscribe(
          response => {
            debugger;
              responseRegister.next(response.body);

                this.messageService.showSnackbar('Conta registrada com sucesso!', 'snackbar-success');
          },
          error => {
            debugger;
            this.messageService.showSnackbar('Error, conta não criada !', 'snackbar-error');

            responseRegister.next(undefined);
          }
      );

      return responseRegister.asObservable();
    }

    login(data){
      let responseRegister: BehaviorSubject<any> = new BehaviorSubject(undefined);
      let header = new HttpHeaders();
      
      header = header.append("Access-Control-Allow-Origin", "*");

      this.httpClient.post<any>(`${this.url}/userLogin`, data, {observe: 'response', headers: header}).subscribe(
          response => {
              this.setTokenCookie(response.body.token);
              responseRegister.next(response.body);

              },
          error => {
            this.messageService.showSnackbar('Erro no login!', 'snackbar-error');

            responseRegister.next(undefined);
          }
      );

      return responseRegister.asObservable();
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
