import { Component } from '@angular/core';
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
export class SidebarComponent {
  coursesHeader: CourseHeaderModel[] = [];

  constructor(public router: Router, private course: CourseService) { }

  ngOnInit() {
    this.course.getCoursesHeader().subscribe(response => {
      this.coursesHeader = response;
    });
  }
}
