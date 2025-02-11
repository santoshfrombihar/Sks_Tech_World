import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseModel } from '../../Models/CourseModel/CourseModel';
@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private jsonUrl = '/assets/courses.json';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<CourseModel[]> { 
    return this.http.get<any[]>(this.jsonUrl);
  }
}
