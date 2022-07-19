import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-vacancy',
  templateUrl: './my-vacancy.component.html',
  styleUrls: ['./my-vacancy.component.css']
})
export class MyVacancyComponent implements OnInit {

  @Input() infoUser: any;

  constructor() { }

  ngOnInit() {
  }

  isStudent() {
    let userIsStudent: boolean = true;

    if(this.infoUser == 'empresa') {
      userIsStudent = false;
    }

    return userIsStudent;
  }
}
