import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenData } from 'src/models/tokenData';
import { TokenService } from 'src/services/token/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'TrackSpenseFE';
  tokenData: TokenData | any;

  constructor(private tokenService: TokenService, private router: Router) {}

  ngOnInit(): void {
    this.tokenData = this.tokenService.getTokenData();

    if (!this.tokenData && window.location.pathname != "/register")
      this.router.navigate(['login']);
  }
}
