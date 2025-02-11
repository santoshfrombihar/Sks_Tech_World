import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem('authToken');
    }
    return null;
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
