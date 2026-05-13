import { AfterViewInit, Component, effect, inject, ViewChild } from '@angular/core';
import { DisplayCoursesService } from '../../services/display-courses';
import { Course } from '../../interfaces/course';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MatAnchor } from "@angular/material/button";

@Component({
  selector: 'app-add-course',
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatIconModule, FormsModule, RouterLink, RouterLinkActive, MatAnchor],
  templateUrl: './add-course.html',
  styleUrl: './add-course.scss',
})
export class AddCourse implements AfterViewInit {

  // Alla kolumner som ska visas i tabellen
  displayedColumns: string[] = ["courseCode", "courseName", "points", "subject", "syllabus", "removed"];
  // Sparar som en variabel för att visa och sortera data i tabellen
  dataSource = new MatTableDataSource<Course>();

  // För att hantera sorteringen och pagineringen i tabellen
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Använder servicen 
  addCourseService = inject(DisplayCoursesService);

  // Hämtar in kurser från localstorage genom servicen
  constructor() {
    const coursesSignal = this.addCourseService.getCourses();

    // Uppdaterar signalen vid ändringar -> tabellen uppdateras automatiskt
    effect(() => {
      this.dataSource.data = coursesSignal();
    });
  }

  // För att kunna ha sortering inom tabellen
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  // Tar bort kurs från ramschemat genom kurskoden
  deleteCourseFromPlan(courseCode: string): void {
    this.addCourseService.removeCourse(courseCode);
  }

  // Visar antal poäng för kurser som är tillagda i ramschemat
  countCoursePoints(): number {
    // I början är totala poängen 0
    let totalHp = 0;
    // Itererar över varje kurs med dess poäng som finns tillagd i localstorage
    this.dataSource.data.forEach(course => {
      totalHp += course.points;
    });
    // Returnerar det antal poängen för att visa inom ramschemat
    return totalHp;
  }
}

