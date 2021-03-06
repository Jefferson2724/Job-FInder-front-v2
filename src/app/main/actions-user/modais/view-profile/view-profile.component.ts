import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService } from 'src/app/main/services/authentication.service';
import { UsersService } from 'src/app/main/services/users.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  idUser: string;
  data: any;
  infoUserDTO: any;
  isCompanyHome: boolean;

  constructor(
      private dialogRef: MatDialogRef<ViewProfileComponent>,
      private usersSerice: UsersService,
      @Optional() @Inject(MAT_DIALOG_DATA) data,
  ) { 

      if(data.isHome){
          this.isCompanyHome = data.isHome
          this.data = data.info;

          if(this.data.userType == "Estudante") {
              this.isCompanyHome = false;
          }
      } else {
          this.data = data;
      }
  }

  ngOnInit() {
      if(!this.data) {
          this.dialogRef.close();
      }
  }

}
