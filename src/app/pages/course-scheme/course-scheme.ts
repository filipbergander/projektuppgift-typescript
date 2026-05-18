import { Component } from '@angular/core';
import { SchemaCourse } from '../../partials/schema-course/schema-course';

@Component({
  selector: 'app-course-scheme',
  imports: [SchemaCourse],
  templateUrl: './course-scheme.html',
  styleUrl: './course-scheme.scss',
})
export class CourseScheme {}
