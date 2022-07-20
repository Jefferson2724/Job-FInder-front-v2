import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService } from 'src/app/main/services/authentication.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  idUser: string;
  data: any;
  infoUserDTO: any;

  constructor(
      private dialogRef: MatDialogRef<ViewProfileComponent>,
      private authenticationService: AuthenticationService,
      @Optional() @Inject(MAT_DIALOG_DATA) data,
  ) { 
      this.data = data;
  }

  ngOnInit() {
      if(!this.data) {
          this.dialogRef.close();
      }

      this.idUser = this.data.id;

      this.authenticationService.getUserById(this.idUser).subscribe(
        response => {
            if(!response) {
                return;
            }
    
            this.infoUserDTO = response;
            console.log(this.infoUserDTO);
        }
      );
  }

}
