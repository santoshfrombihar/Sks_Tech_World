import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { CourseModel } from '../../Models/CourseModel/CourseModel';
import { CourseHeaderModel } from '../../Models/CourseModel/CourseModel';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private jsonUrl = '/assets/';

  private selectedSectionSubject = new BehaviorSubject<number>(1); // Default to first section
  public selectedSection$ = this.selectedSectionSubject.asObservable();

  private completedSectionsSubject = new BehaviorSubject<Set<number>>(new Set());
  public completedSections$ = this.completedSectionsSubject.asObservable();

  private sectionProgressSubject = new BehaviorSubject<Map<number, number>>(new Map());
  public sectionProgress$ = this.sectionProgressSubject.asObservable();

  constructor(private http: HttpClient) {}

  getCourses(): Observable<CourseModel[]> { 
    return this.http.get<any[]>(this.jsonUrl + 'courses.json');
  }
  
  getCoursesHeader(): Observable<CourseHeaderModel[]>{
     return this.http.get<any[]>(this.jsonUrl + 'courseContent.json');
  }

  setSelectedSection(sectionId: number) {
    this.selectedSectionSubject.next(sectionId);
    // Mark previous sections as completed
    const completed = new Set(this.completedSectionsSubject.value);
    for (let i = 1; i < sectionId; i++) {
      completed.add(i);
    }
    this.completedSectionsSubject.next(completed);
  }

  markSectionCompleted(sectionId: number) {
    const completed = new Set(this.completedSectionsSubject.value);
    completed.add(sectionId);
    this.completedSectionsSubject.next(completed);
  }

  updateSectionProgress(sectionId: number, progress: number) {
    const progressMap = new Map(this.sectionProgressSubject.value);
    progressMap.set(sectionId, progress);
    this.sectionProgressSubject.next(progressMap);

    // Auto-complete when 100%
    if (progress >= 100) {
      this.markSectionCompleted(sectionId);
    }
  }

  getSectionProgress(sectionId: number): number {
    return this.sectionProgressSubject.value.get(sectionId) || 0;
  }
}
