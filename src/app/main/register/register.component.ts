import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  identification: string;

  @Output() openAuth = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  backAuth(){
    this.openAuth.emit("true");
  }

}
