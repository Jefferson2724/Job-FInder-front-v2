import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './main/home-page/home/home.component';
import { JobOpportunityComponent } from './main/actions-user/job-opportunity/job-opportunity.component';
import { LoginComponent } from './main/authentication/login/login.component';
import { MyProfileComponent } from './main/profile/my-profile/my-profile.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home/:id', component: HomeComponent },
  { path: 'openJob/:id', component: JobOpportunityComponent },
  { path: 'profile/:id', component: MyProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
