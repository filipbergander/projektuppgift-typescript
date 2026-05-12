import { Injectable, signal } from '@angular/core';
import { Course } from '../interfaces/course';

@Injectable({
  providedIn: 'root',
})
export class DisplayCoursesService {

  private coursesSignal = signal<Course[]>([]); // Signal för kurserna som ska visas, tom i början
  
  constructor() { // När servicen anropas så hämtas kurserna från localstorage
    this.loadFromLocalStorage();
  }

  // Laddar in tillagda kurser som är lagrade i localstorage
  private loadFromLocalStorage() {
    const storedCourses: Course[] = []; // Array av lagrade kurser som är tom i början
    for (let i = 0; i < localStorage.length; i++) { // Om det finns något lagrat i localstorage
      const courseDataKey = localStorage.key(i)!; // Varje key som finns lagrad i localstorage
      const courseData = localStorage.getItem(courseDataKey); // Hämtar in varje keys kursobjekt
      if (courseData) { // Om det finns data lagrat med kurskoder inom localstorage
        storedCourses.push(JSON.parse(courseData)); // Lägger till objekten inom arrayen
      }
    }
    this.coursesSignal.set(storedCourses); // Uppdaterar signalen med kurserna som finns i localstorage
  }
 
  // Returnerar kurserna som finns sparade i arrayen (signal) för att kunna använda till att visa dem i tabellen 
  public getCourses() {
    return this.coursesSignal;
  }

  public addCourseToPlan(course: Course): void {
    localStorage.setItem(course.courseCode, JSON.stringify(course));
    this.loadFromLocalStorage();
  }

  // Tar bort kurser från localstorage och i tabellen
  public removeCourse(courseCode: string): void {
    localStorage.removeItem(courseCode); // Tar bort den specifika kursen i localstorage genom kurskod
    this.loadFromLocalStorage(); // hämtar in kurserna i localstorage på nytt och uppdaterar tabellen
  }
}
