import { Component } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-content',
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './course-content.component.html',
  styleUrl: './course-content.component.css'
})
export class CourseContentComponent {
  users = Array.from({ length: 95 }, (_, i) => `User ${i + 1}`); 
  page = 1;
  itemsPerPage = 10;
}
