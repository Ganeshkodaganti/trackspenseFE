import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenData } from 'src/models/tokenData';
import { TokenService } from 'src/services/token/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  tokenData: TokenData | any;

  constructor(private tokenService: TokenService, private router: Router) {}

  ngOnInit(): void {
    this.tokenData = this.tokenService.getTokenData();
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['login']);
    window.location.reload();
  }
}
