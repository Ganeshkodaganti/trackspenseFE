import { Injectable } from '@angular/core';
import { TokenData } from 'src/models/tokenData';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  public getTokenData() {
    
    const token = localStorage.getItem('JwtToken');


    if (token != null) {
      const result = JSON.parse(atob(token.split('.')[1]));
      return new TokenData(result.Id, result.UserName, result.Email);
    } else {
      return null;
    }
  }
}
