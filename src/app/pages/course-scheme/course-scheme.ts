import { Component } from '@angular/core';
import { AddCourse } from '../../partials/add-course/add-course';
import { SelectTheme } from '../../partials/select-theme/select-theme';

@Component({
  selector: 'app-course-scheme',
  imports: [AddCourse, SelectTheme],
  templateUrl: './course-scheme.html',
  styleUrl: './course-scheme.scss',
})
export class CourseScheme {}
