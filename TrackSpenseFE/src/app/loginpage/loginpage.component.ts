import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Validator } from '@angular/forms';
import { LoginModel } from 'src/models/login';
import { TokenData } from 'src/models/tokenData';
import { TokenService } from 'src/services/token/token.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css'],
})
export class LoginpageComponent implements OnInit {
  passwordVisible: boolean | undefined;
  tokenData: TokenData | any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService
  ) {
    this.tokenData = this.tokenService.getTokenData();
  }

  ngOnInit(): void {
    if (this.tokenData) this.router.navigate(['']);
  }

  loginCredentials: LoginModel = {
    userName: '',
    password: '',
  };

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  login() {
    // Validate username and password before making the request
    const usernamePattern = /^[a-zA-Z0-9_]{3,20}$/;
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!this.loginCredentials.userName.match(usernamePattern)) {
      console.error('Invalid username format');
      return;
    }

    if (!this.loginCredentials.password.match(passwordPattern)) {
      console.error('Invalid password format');
      return;
    }

    console.log('login clicked');
    console.log(this.loginCredentials);
    this.http
      .post('https://localhost:7279/User/Login', this.loginCredentials, {
        responseType: 'text',
      })
      .subscribe(
        (response) => {
          if (response != null) localStorage.setItem('JwtToken', response);
          else {
            console.log('Invalid credentials');
          }
          this.router.navigate(['']);
          window.location.reload();
        },
        (error) => {
          console.error('Error occurred:', error);
        }
      );
  }
}
