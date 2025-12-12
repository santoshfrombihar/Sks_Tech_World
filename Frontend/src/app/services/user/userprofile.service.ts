import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserProfile } from '../../Models/UserModel/UserProfileModel';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroment';

@Injectable({
  providedIn: 'root'
})
export class UserprofileService {

  constructor(private http: HttpClient) { }


  private url = environment.apiUrl;

  CreateUserProfile(userData: UserProfile): Observable<UserProfile> {
    return this.http.post<UserProfile>(`${this.url}/api/User/userProfile`, userData);
  }

  GetUserProfile(userId : any) : Observable<any>{
    return this.http.get(`${this.url}/api/User/userProfile`);
  }
}
