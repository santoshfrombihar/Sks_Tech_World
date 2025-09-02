import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserRegistration } from '../../Models/AuthModel/authModel';
import { UserLogin } from '../../Models/AuthModel/authModel';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'

})
export class AuthServiceService {
  public authStatusSubject: BehaviorSubject<boolean>;
  authStatus: Observable<boolean>;
  private apiUrl = 'https://localhost:7068/api/Auth';

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object, private router: Router) {
    const isLoggedIn = isPlatformBrowser(this.platformId) ? !!sessionStorage.getItem('authToken') : false;
    this.authStatusSubject = new BehaviorSubject<boolean>(isLoggedIn);
    this.authStatus = this.authStatusSubject.asObservable();
  }

  // Register user
  register(user: UserRegistration): Observable<UserRegistration> {
    return this.http.post<UserRegistration>(`${this.apiUrl}/register`, user);
  }

  // Login user
  login(user: UserLogin): Observable<any> {
    return this.http.post<UserLogin>(`${this.apiUrl}/login`, user);
  }

  sendOtp(email: any): Observable<any> {
    return this.http.post<any>(
      'https://localhost:7068/api/Mail/send-otp',
      {},
      {
        params: { email: email }
      }
    );
  }

  verifyOtp(email: any, otp: any): Observable<any> {
    return this.http.post<any>(
      'https://localhost:7068/api/Mail/verify-otp',
      {},
      {
        params: {
          email: email,
          otp: otp
        }
      }
    );
  }

  loginData(userLogin: UserLogin) {
    // Perform login logic and on success:
    if (isPlatformBrowser(this.platformId)) {

    }
    this.authStatusSubject.next(true);
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem('authToken');
    }
    this.authStatusSubject.next(false);
    this.router.navigate(['']);
  }
}