import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
  getToken(): string | null {
    return sessionStorage.getItem('authToken'); // Retrieve token from session storage
  }

  getDecodedToken(): any {
    const token = this.getToken();
    if (token) {
      try {
        return jwtDecode(token); // Decode JWT token
      } catch (error) {
        console.error('Invalid token:', error);
        return null;
      }
    }
    return null;
  }

  getUserEmail(): string | null {
    const decodedToken = this.getDecodedToken();
    return decodedToken ? decodedToken.Email : null; // Assuming "Email" is in the token
  }

  getUserName(): string | null {
    const decodedToken = this.getDecodedToken();
    return decodedToken ? decodedToken.UserName : null; // Assuming "UserName" is in the token
  }
}
