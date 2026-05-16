import { Component } from '@angular/core';
import { CourseTable } from "../../partials/course-table/course-table";
import { SelectTheme } from '../../partials/select-theme/select-theme';

@Component({
  selector: 'app-course-list',
  imports: [CourseTable,SelectTheme],
  templateUrl: './course-list.html',
  styleUrl: './course-list.scss',
})
export class CourseList {}
