import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router"
import { MatIconModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatSnackBarModule  } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './main/home-page/home/home.component';
import { LoginComponent } from './main/authentication/login/login.component';
import { AuthComponent } from './main/authentication/auth/auth.component';
import { RegisterComponent } from './main/authentication/register/register.component';
import { AuthenticationService } from './main/services/authentication.service';
import { MessageService } from './main/services/message.service';
import { MessageSnackbarComponent } from './main/message-snackbar/message-snackbar.component';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { JobRecomendationComponent } from './main/home-page/job-recomendation/job-recomendation.component';
import { JobSearchComponent } from './main/home-page/job-search/job-search.component';
import { ListJobsComponent } from './main/home-page/list-jobs/list-jobs.component';
import { JobOpportunityComponent } from './main/actions-user/job-opportunity/job-opportunity.component';

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
      ListJobsComponent,
      JobOpportunityComponent
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
