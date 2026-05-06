import { Component, inject } from '@angular/core';
import { GetCourseService } from '../../services/get-courses';

@Component({
  selector: 'app-course',
  imports: [],
  templateUrl: './course.html',
  styleUrl: './course.scss',
})
export class CourseComponent {

  courseService = inject(GetCourseService);

  // Hämtar in data från webbtjänsten genom servicen
  courses = this.courseService.fetchCourses();

}
