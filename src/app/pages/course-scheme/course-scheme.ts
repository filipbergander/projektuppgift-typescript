import { Component } from '@angular/core';
import { AddCourse } from '../../partials/add-course/add-course';
import { NavHeader } from '../../partials/nav-header/nav-header';

@Component({
  selector: 'app-course-scheme',
  imports: [AddCourse, NavHeader],
  templateUrl: './course-scheme.html',
  styleUrl: './course-scheme.scss',
})
export class CourseScheme {}
