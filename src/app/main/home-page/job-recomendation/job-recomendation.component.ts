import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-recomendation',
  templateUrl: './job-recomendation.component.html',
  styleUrls: ['./job-recomendation.component.css']
})
export class JobRecomendationComponent implements OnInit {

  count = ['1', '2', '3'];

  constructor() { }

  ngOnInit() {
  }

}
