import { AfterViewInit, Component, effect, inject, ViewChild } from '@angular/core';
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
import { DisplayCoursesService } from '../../services/display-courses';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-course-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatLabel, MatInputModule, MatIconModule, MatSelectModule, FormsModule, MatProgressBarModule, NgClass],
  templateUrl: './course-table.html',
  styleUrl: './course-table.scss',
})
export class CourseTable implements AfterViewInit {

  // Alla kolumner som ska finnas i tabellen
  displayedColumns: string[] = ["courseCode", "courseName", "points", "subject", "syllabus", "add"];
  // Sparar som en variabel för att visa, filtrera och sortera data i tabellen
  dataSource = new MatTableDataSource<Course>();

  // För att hantera sorteringen och pagineringen i tabellen
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Hämtar in kurser genom service
  courseService = inject(GetCourseService);
  // Hämtar in servicen för att använda till att lägga till kurserna i ramschemat
  DisplayCoursesService = inject(DisplayCoursesService);

  // Lagrar de inhämtade kurserna i courses
  courses = this.courseService.fetchCourses();

  subjects: string[] = [];
  selected: string = "";

  targetPoints: number = 0;
  totalPoints: number = 0;

  // Hämtar in data från webbtjänsten genom servicen och lagrar som signal
  constructor() {
    const coursesSignal = this.courseService.fetchCourses();

    // Uppdateras varje gång som signalen ändras -> tabellen uppdateras automatiskt när man exempelvis söker i sökfält eller paginerar/sorterar   
    effect(() => {
      const fetchedData = coursesSignal(); // Lagrar de inhämtade kurserna i fetchedData
      this.dataSource.data = this.courses();
      this.subjects = [...new Set(fetchedData.map(c => c.subject))] // Alla ämnen lagras i subjects för att användas i dropdown-menyn till att filtrera i tabellen
      this.progressPercentage();
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
  // Filtrera på ämne inom inputfält
  filterSubject(): void {
    const fetchedCourses = this.courses(); // lagrar kurserna
    const filteredSubject = fetchedCourses.filter(course => this.selected === "" || course.subject.includes(this.selected)); // Filtrerar efter ämne på det som skrivits i input
    this.dataSource.data = filteredSubject; // Uppdaterar hela tabellen beroende på input
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // Lägger till en kurs till localstorage genom servicen och disablar knappen
  addCourseToPlan(course: Course): void {
    console.log("Knappen klickades: ", course)
    this.setButtonDisabled(course); // Sätter knappen som klickades på till disabled genom metoden
    this.DisplayCoursesService.addCourseToPlan(course); // Lägger till den klickade kursen i localstorage genom servicen  
  }

  // Ändrar knapp till disabled efter att den klickats på för att lägga till en kurs i ramschemat
  setButtonDisabled(course: Course): void {
    const clickedBtn = document.getElementById(course.courseCode) as HTMLButtonElement; // Den knapp som klickades på
    clickedBtn.classList.add("clicked"); // Lägger till klassen clicked för styling
    clickedBtn.disabled = true; // Sätter disabled
    course.added = true; // Sätter added till true

    // Sätter disabled på knappar som har kurser vilka är tillagda i localstorage
    this.courses().forEach(course => {
      if (localStorage.getItem(course.courseCode)) {
        course.added = true;
      }
    });
  }

  /* Beräknar procent för antal poäng som besökaren vill läsa, samt felhantering*/
  progressPercentage(): number {
    const addedCourses = this.DisplayCoursesService.getCourses(); // De kurser som användaren lagt till i ramschemat
    const coursePoints = addedCourses().map(course => course.points); // Lagrar antal poäng som finns tillagd inom totalen av kurserna i ramschemat 
    this.totalPoints = coursePoints.reduce((total, points) => total + points, 0); // Börjar från 0 och går igenom alla poäng som blivit tillagda och summerar dem i totalpoints

    if (this.targetPoints <= 0) return 0; // Om angivet poäng är 0 eller mindre blir det 0 i input och samtidigt körs inte resten av koden
    // Om man angett över 300 poäng -> 300 i input
    if (this.targetPoints > 300) {
      this.targetPoints = 300;

      // Sätter poängen till 0
    } if (this.targetPoints < 0) {
      this.targetPoints = 0;
    }
    // Annars beräknas procenten mellan antal poäng som blivit tillagt och poängen som besökaren vill läsa
    return (this.totalPoints / this.targetPoints) * 100;
  }

  // Beräknar vilken färg som ska visas för progressbaren
  barProgressColor(): string {

    const percent = this.progressPercentage(); // Eftersom metoden returnerar procent används det här

    if (percent < 33) return "bar-red"; // Om det är under 33% blir färgen röd
    if (percent >= 33 && percent < 66) return "bar-yellow"; // Gul
    if (percent >= 66 && percent < 100) return "bar-light-green"; // Ljusgrön
    if (percent === 100) return "bar-green"; // Grönfärg vid 100%
    else return "";
  }

}
