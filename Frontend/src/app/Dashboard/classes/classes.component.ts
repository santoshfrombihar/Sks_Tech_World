import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course/course.service';
import { CourseModel } from '../../Models/CourseModel/CourseModel';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-classes',
  imports: [CommonModule, RouterModule],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.css'
})
export class ClassesComponent {
  courses: CourseModel[] = [];
  constructor(private coursesService: CourseService) { }

  ngOnInit() {
    this.coursesService.getCourses().subscribe(response =>{
      this.courses = response;
      console.log(this.courses);
    });
  }
}
