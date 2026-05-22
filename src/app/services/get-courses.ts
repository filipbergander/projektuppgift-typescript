import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Course } from '../interfaces/course';

@Injectable({
  providedIn: 'root',
})
export class GetCourseService {
  // Adress till webbtjänst för att hämta in kurser som objekt
  //private url = "https://matdah.github.io/DT208G---Programmering-i-TypeScript/Moment%205%20-%20Projekt/miun_courses.json";
  private url = 'miun_courses.json';

  // HttpClient för att kunna hämta extern data från webbtjänsten
  private http = inject(HttpClient);

  // Hämtar in datan från webbtjänsten genom interfacet
  fetchCourses(): Signal<Course[]> {
    const courses$ = this.http.get<Course[]>(this.url);
    return toSignal(courses$, { initialValue: [] });
  }
}
