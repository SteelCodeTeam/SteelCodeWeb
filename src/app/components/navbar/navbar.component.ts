import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  url: string = "";

  constructor(private router: Router) {

  }

  ngOnInit() {
  }

  public navigateTo(url_nav: string): void {
    this.router.navigate([url_nav])
    this.url = url_nav
  }

}
