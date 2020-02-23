import { Component, OnInit, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.sass']
})
export class NavBarComponent implements OnInit {

  isUserLoggedIn: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isUserLoggedIn = this.authService.isLoggedIn();
    this.authService.loginEvent.subscribe((userLoggedIn: boolean) => this.isUserLoggedIn = userLoggedIn);
  }
}
