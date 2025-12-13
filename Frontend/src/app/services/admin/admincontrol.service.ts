import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../enviroment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdmincontrolService {

  constructor(private httpClient: HttpClient) { }

  verifyAdmin(adminKey: any): Observable<any> {
    return this.httpClient
      .post(
        `${environment.apiUrl}/api/User/verifyadminkey`,
        JSON.stringify(adminKey),
        { headers: { 'Content-Type': 'application/json' } }
      )
  }

  addCourse(){
    
  }
}
