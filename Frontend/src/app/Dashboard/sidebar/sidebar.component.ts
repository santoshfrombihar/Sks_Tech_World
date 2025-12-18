import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CourseHeaderModel } from '../../Models/CourseModel/CourseModel';
import { CourseService } from '../../services/course/course.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  coursesHeader: CourseHeaderModel[] = [];
  selectedSection: number = 1;
  completedSections: Set<number> = new Set();
  sectionProgress: Map<number, number> = new Map();

  constructor(public router: Router, private course: CourseService) { }

  ngOnInit() {
    this.course.getCoursesHeader().subscribe(response => {
      this.coursesHeader = response;
    });
    this.course.selectedSection$.subscribe(id => {
      this.selectedSection = id;
    });
    this.course.completedSections$.subscribe(completed => {
      this.completedSections = completed;
    });
    this.course.sectionProgress$.subscribe(progress => {
      this.sectionProgress = progress;
    });
  }

  isCollapsed = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  selectSection(sectionId: number) {
    this.course.setSelectedSection(sectionId);
  }

  isCompleted(sectionId: number): boolean {
    return this.completedSections.has(sectionId);
  }

  getProgress(sectionId: number): number {
    return this.sectionProgress.get(sectionId) || 0;
  }
}
