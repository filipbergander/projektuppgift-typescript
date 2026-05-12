import { Component } from '@angular/core';
import { CourseTable } from "../../partials/course-table/course-table";

@Component({
  selector: 'app-course-list',
  imports: [CourseTable],
  templateUrl: './course-list.html',
  styleUrl: './course-list.scss',
})
export class CourseList {}
