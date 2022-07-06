import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  idUser: string;
  isOpenMenu: boolean = false;
  
  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
      this.idUser = this.activatedRoute.snapshot.params['id'];
  }

  showMenu() {
      debugger;
      this.isOpenMenu = !this.isOpenMenu;
  }
}
