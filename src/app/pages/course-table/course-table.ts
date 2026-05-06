import { AfterViewInit, Component, effect, inject, ViewChild } from '@angular/core';
import { GetCourseService } from '../../services/get-courses';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { Course } from '../../interfaces/course';
import { MatLabel } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-course-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatLabel, MatInputModule],
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
  @ViewChild(MatSort) sort!: MatSort; // 

  // Hämtar in service
  courseService = inject(GetCourseService);

  // Hämtar in data från webbtjänsten genom servicen och lagrar som signal
  constructor() {
    const courses = this.courseService.fetchCourses();

    // Uppdateras varje gång som signalen ändras -> tabellen uppdateras automatiskt när man exempelvis söker i sökfält/paginerar/sorterar   
    effect(() => {
      this.dataSource.data = courses();
    });
  }

// När vy har laddats klart för sidan blir tabellen kopplad till sorteringen och pagineringen
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // För att hantera filtrering av tabellen när man söker i sökfältet
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value; // Värdet som skrivs inuti sökfältet
    this.dataSource.filter = filterValue.trim().toLowerCase(); // Tar bort mellanslag och gör värdet i sökfältet till små bokstäver

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
