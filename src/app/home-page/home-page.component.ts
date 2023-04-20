import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  username = '';

  constructor(private router: Router) {}

  searchUser() {
    this.router.navigate(['/profile', this.username]);
  }
}
