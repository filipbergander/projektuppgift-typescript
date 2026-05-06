import { Component } from '@angular/core';
import { CourseTable } from '../course-table/course-table';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CourseTable],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
