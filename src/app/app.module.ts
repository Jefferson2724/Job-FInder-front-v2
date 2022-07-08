import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router"
import { MatIconModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatSnackBarModule  } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './main/home/home.component';
import { LoginComponent } from './main/login/login.component';
import { AuthComponent } from './main/auth/auth.component';
import { RegisterComponent } from './main/register/register.component';
import { AuthenticationService } from './main/services/authentication.service';
import { MessageService } from './main/services/message.service';
import { MessageSnackbarComponent } from './main/message-snackbar/message-snackbar.component';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { JobRecomendationComponent } from './main/job-recomendation/job-recomendation.component';
import { JobSearchComponent } from './main/job-search/job-search.component';

@NgModule({
  declarations: [			
    AppComponent,
      HomeComponent,
      LoginComponent,
      AuthComponent,
      RegisterComponent,
      MessageSnackbarComponent,
      JobRecomendationComponent,
      JobSearchComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    RouterModule
  ],
  providers: [AuthenticationService, MessageService, CookieService],
  entryComponents: [MessageSnackbarComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
