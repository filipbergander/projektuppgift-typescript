import { Component, inject } from '@angular/core';
import { GetCourseService } from '../../services/get-courses';

@Component({
  selector: 'app-course-table',
  imports: [],
  templateUrl: './course-table.html',
  styleUrl: './course-table.scss',
})
export class CourseTable {

  // Hämtar in service
  courseService = inject(GetCourseService);

  // Hämtar in data från webbtjänsten genom servicen
  courses = this.courseService.fetchCourses();

}
