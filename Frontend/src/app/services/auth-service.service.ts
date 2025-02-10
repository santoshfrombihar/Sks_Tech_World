import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRegistration } from '../Models/AuthModel/authModel';
import { UserLogin } from '../Models/AuthModel/authModel';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private apiUrl = 'https://localhost:7068/api/Auth'; 

  constructor(private http: HttpClient) { }

  // Register user
  register(user: UserRegistration): Observable<UserRegistration> {
    return this.http.post<UserRegistration>(`${this.apiUrl}/register`, user);
  }

  // Login user
  login(user: UserLogin): Observable<any> {
    return this.http.post<UserLogin>(`${this.apiUrl}/login`, user);
  }
}
