import { AfterViewInit, Component, effect, inject, OnInit, signal, ViewChild } from '@angular/core';
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
import { NgClass, DecimalPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MatAnchor } from "@angular/material/button";
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";

@Component({
  selector: 'app-course-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatLabel, MatInputModule, MatIconModule, MatSelectModule, FormsModule, MatProgressBarModule, NgClass, DecimalPipe, RouterLink, RouterLinkActive, MatAnchor, MatAutocompleteModule],
  templateUrl: './course-table.html',
  styleUrl: './course-table.scss',
})
export class CourseTable implements AfterViewInit, OnInit {

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

  // Properties
  subjects: string[] = []; // Ämnen i dropdownmenyn
  selected = ""; // Valt ämne i dropdownmenyn
  totalPoints = 0; // Antal poäng som användaren lagt till i ramschemat

  targetPoints = signal(0); // Antal poäng som användaren skrivit i input för, används till att visa felmeddelande
  goalPoints = signal(0); // Antal poäng som användaren vill läsa som används i progressbaren
  filteredCourses = signal<Course[]>([]); // Signal som lagrar kurser som användaren vill filtrera efter i sökfältet

  // Hämtar in data från webbtjänsten genom servicen och lagrar som signal
  constructor() {
    const coursesSignal = this.courseService.fetchCourses();

    // Uppdateras varje gång som signalen ändras -> tabellen uppdateras automatiskt när man exempelvis söker i sökfält eller paginerar/sorterar   
    effect(() => {
      const fetchedData = coursesSignal(); // Lagrar de inhämtade kurserna i fetchedData för att använda till dropdown-menyn
      let data = this.courses(); // Lagrar kurserna för att använda till tabellen
      if (this.selected !== "") { // Filtreringen av ämne behålls även efter man lägger till en kurs i ramschemat
        data = data.filter(c => c.subject.includes(this.selected));
      }
      this.dataSource.data = data; // Uppdaterar tabellen beroende på filtrering av ämne
      this.subjects = [...new Set(fetchedData.map(c => c.subject))] // Uppdaterar listan med ämnena i dropdownmenyn 
      this.progressPercentage(); // Uppdaterar progressbaren
    });
  }

  // Om användaren går från kurslistan till ramschemat ska poängen som senast skrivits i inputfältet visas igen när den navigerar tillbaka till kurslistan
  ngOnInit(): void {
    const savedPoints = sessionStorage.getItem("target-points"); // Hämtar in poäng från sessionsstorage
    if (savedPoints) { // Om det finns poäng lagrade
      this.goalPoints.set(parseFloat(savedPoints)); // Sätter poängen i signalen till det lagrade värdet
    }

    // Filtrerar tabellen efter -> kursnamn eller kurskod
    this.dataSource.filterPredicate = (course, filter) => {
      const searchValue = filter.trim().toLowerCase(); // Det som skrivits i sökfältet för filtrering

      // Returnerar sant om man sökt på kursnamn eller kurskod och -> visar kursen
      return (
        course.courseName.toLowerCase().includes(searchValue) || course.courseCode.toLowerCase().includes(searchValue)
      );
    }
  }

  // När vy har laddats klart för sidan blir tabellen kopplad till sorteringen och pagineringen
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  // För att hantera filtrering av tabellen när man söker i sökfältet
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase(); // Värdet som skrivs inuti sökfältet, tar bort mellanslag och gör värdet i sökfältet till små bokstäver
    this.dataSource.filter = filterValue; // Filtrerar tabellen

    // Filtrerar kurser efter förslag på autocomplete
    this.filteredCourses.set(
      // Filtrerar efter kursnamn/kurskod
      this.courses().filter(course => course.courseName.toLowerCase().includes(filterValue)
        || course.courseCode.toLowerCase().includes(filterValue)).slice(0, 3)); // Visar 3 kurser som förslag i dropdown-listan

    // Visar första sidan i pagineringen
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
    // Visar första sidan i pagineringen
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // Vid klick på en kurs i dropdown-listan så läggs kursen till i sökfältet och tabellen filtreras efter kursen
  chooseCourse(event: MatAutocompleteSelectedEvent): void {
    const courseValue = event.option.value.trim().toLowerCase(); // Kursen som valdes i listan
    this.dataSource.filter = courseValue; // Filtrerar tabellen utefter kursen

    // Visar första sidan i pagineringen
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Lägger till en kurs till localstorage genom servicen och disablar knappen
  addCourseToPlan(course: Course): void {
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

    if (this.goalPoints() <= 0) return 0; // Om angivet poäng är 0 eller mindre returneras 0 i input och samtidigt körs inte resten av koden

    // Annars beräknas procenten mellan antal poäng som blivit tillagt och poängen som besökaren vill läsa
    return (this.totalPoints / this.goalPoints()) * 100;
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

  // Lagrar poäng i sessionStorage som skrivs in i input för antal poäng
  storePointsStorage(points: number): void {
    points = ((points) || 0); // Poängen blir 0 om det inte är ett giltigt nummer som angetts i input
    this.targetPoints.set(points); // Används till validering i input för att visa felmeddelande i DOM till användaren
    if (points > 300) { points = 300 }; // Över 300 blir 300 automatiskt
    if (points < 0) { points = 0 }; // Om användaren skrivit in poäng under 0 så blir det noll
    this.goalPoints.set(points); // Uppdaterar signalen till värdet
    sessionStorage.setItem("target-points", points.toString()); // Lagrar poängen i sessionsStorage
  }

  // DÖljer progressbaren genom att sätta "målpoängen" till 0 & radera från sessionStorage
  minimizeBar(): void {
    this.goalPoints.set(0); // Sätter målpoängen till 0 så att progressbaren inte visas
    this.targetPoints.set(0); // Sätter targetPoints till 0 så att eventuella felmeddelanden tas bort
    sessionStorage.removeItem("target-points"); // Tar bort poängen i sessionsStorage
  }

}