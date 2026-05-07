import { AfterViewInit, Component, effect, inject, signal, ViewChild } from '@angular/core';
import { GetCourseService } from '../../services/get-courses';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { Course } from '../../interfaces/course';
import { MatLabel, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-course-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatLabel, MatInputModule, MatIconModule, MatSelectModule, FormsModule, NgFor],
  templateUrl: './course-table.html',
  styleUrl: './course-table.scss',
})
export class CourseTable implements AfterViewInit {

  // Alla kolumner som ska finnas i tabellen
  displayedColumns: string[] = ["courseCode", "courseName", "points", "subject", "syllabus"];
  // Sparar som en variabel för att visa, filtrera och sortera data i tabellen
  dataSource: MatTableDataSource<Course> = new MatTableDataSource<Course>();

  // För att hantera sorteringen och pagineringen i tabellen
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Hämtar in service
  courseService = inject(GetCourseService);

  // Lagrar de inhämtade kurserna i courses
  courses = this.courseService.fetchCourses();

  subjects: string[] = [];
  selected: string = "";

  // Hämtar in data från webbtjänsten genom servicen och lagrar som signal
  constructor() {
    const coursesSignal = this.courseService.fetchCourses();

    // Uppdateras varje gång som signalen ändras -> tabellen uppdateras automatiskt när man exempelvis söker i sökfält eller paginerar/sorterar   
    effect(() => {
      const fetchedData = coursesSignal(); // Lagrar de inhämtade kurserna i fetchedData
      this.dataSource.data = this.courses();

      this.subjects = [...new Set(fetchedData.map(c => c.subject))] // Alla ämnen lagras i subjects för att användas i dropdown-menyn till att filtrera i tabellen
    });
  }

  // När vy har laddats klart för sidan blir tabellen kopplad till sorteringen och pagineringen
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // För att hantera filtrering av tabellen när man söker i sökfältet
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value; // Värdet som skrivs inuti sökfältet
    this.dataSource.filter = filterValue.trim().toLowerCase(); // Tar bort mellanslag och gör värdet i sökfältet till små bokstäver

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filterSubject(): void {
    const fetchedCourses = this.courses();
    const filteredSubject = fetchedCourses.filter(course => this.selected === "" || course.subject.includes(this.selected));
    this.dataSource.data = filteredSubject;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
