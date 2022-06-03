import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  private readonly url = environment.ACC_API;

    constructor(
      private httpClient: HttpClient,
      private messageService: MessageService,
      ) { }
    
    register(data){
      debugger;
      let responseRegister: BehaviorSubject<any> = new BehaviorSubject(undefined);

      this.httpClient.post<any>(`${this.url}/register`, data, {observe: 'response'}).subscribe(
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
}
