import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserProfile } from '../../Models/UserModel/UserProfileModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserprofileService {

  constructor(private http: HttpClient) { }

  private url = 'https://uimxm2qccf.execute-api.ap-south-1.amazonaws.com/api/User';

  CreateUserProfile(userData: UserProfile): Observable<UserProfile> {
    return this.http.post<UserProfile>(`${this.url}/userProfile`, userData);
  }

  GetUserProfile(userId : any) : Observable<any>{
    return this.http.get(`${this.url}/userProfile`);
  }
}
