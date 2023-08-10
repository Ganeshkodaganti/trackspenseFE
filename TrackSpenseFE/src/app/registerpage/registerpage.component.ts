import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterModel } from 'src/models/register';
import { TokenData } from 'src/models/tokenData';
import { TokenService } from 'src/services/token/token.service';

@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  styleUrls: ['./registerpage.component.css'],
})
export class RegisterpageComponent {
  tokenData: TokenData | any;
  passwordVisible: boolean | undefined;

  registerationCredentials: RegisterModel = {
    userId: '',
    userName: '',
    password: '',
    email: '',
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService
  ) {
    this.tokenData = this.tokenService.getTokenData();
  }
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
  ngOnInit(): void {
    if (this.tokenData) this.router.navigate(['']);
  }

  onRegister(): void {
    console.log('registeration clicked');
    console.log(this.registerationCredentials);
    this.http
      .post(
        'https://localhost:7279/User/Register',
        this.registerationCredentials,
        {
          responseType: 'text',
        }
      )
      .subscribe(
        (response) => {
          this.router.navigate(['login']);
        },
        (error) => {
          console.error('Error occurred:', error);
        }
      );
  }
}
