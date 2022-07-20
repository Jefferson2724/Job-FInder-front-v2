import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ViewInfoJobComponent } from '../../actions-user/modais/view-info-job/view-info-job.component';

@Component({
  selector: 'app-list-jobs',
  templateUrl: './list-jobs.component.html',
  styleUrls: ['./list-jobs.component.css']
})
export class ListJobsComponent implements OnInit {

  @Input() page: string;
  @Input() isStudent: boolean;

  pageIsMyVacancy: boolean;
  count = ['1', '2', '3', '4']; //'5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15']
  infoJob: any;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
      if(this.page == 'myVacancy') {
          this.pageIsMyVacancy = true;
      }
  }

  openModalVacancy(){
      this.dialog.open(ViewInfoJobComponent, {
          height: '100%',
          data: this.infoJob
      });
  }
}
