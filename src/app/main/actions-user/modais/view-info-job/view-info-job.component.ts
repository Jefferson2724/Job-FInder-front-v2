import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { JobService } from 'src/app/main/services/job.service';
import { UsersService } from 'src/app/main/services/users.service';

@Component({
  selector: 'app-view-info-job',
  templateUrl: './view-info-job.component.html',
  styleUrls: ['./view-info-job.component.css']
})
export class ViewInfoJobComponent implements OnInit {

  data: any;
  info: any;
  page: string;

  constructor(
      private dialogRef: MatDialogRef<ViewInfoJobComponent>,
      private usersService: UsersService,
      private jobService: JobService,
      @Optional() @Inject(MAT_DIALOG_DATA) data,
  ) { 
      this.data = data;
  }

  ngOnInit() {
      if(!this.data) {
          this.dialogRef.close();
      }

      if(this.data.page) {
          this.page = this.data.page;
      }
  }

  applicatationVacancy() {
      
      this.data['appliedBy'] = this.data.id;
      this.data['job_id'] = this.data._id;
      this.jobService.applicateJob(this.data);
  }
}
