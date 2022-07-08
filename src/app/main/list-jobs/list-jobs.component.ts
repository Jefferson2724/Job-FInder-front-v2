import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-jobs',
  templateUrl: './list-jobs.component.html',
  styleUrls: ['./list-jobs.component.css']
})
export class ListJobsComponent implements OnInit {

  count = ['1', '2', '3', '4']; //'5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15']

  constructor() { }

  ngOnInit() {
  }

}
