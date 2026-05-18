import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { NotFound } from './pages/not-found/not-found';
import { CourseScheme } from './pages/course-scheme/course-scheme';
import { CourseList } from './pages/course-list/course-list';

// Alla routes inom webbplatsen
export const routes: Routes = [
    {path: 'hem', component: Home}, // Startsidan
    {path: '', redirectTo: 'hem', pathMatch:'full'}, // Om man inte angett någon url -> redirect startsidan
      {path: 'kurser', component: CourseList}, // Kurssidan med alla kurser
    {path: 'ramschema', component: CourseScheme}, // Ramschemat
    {path: '404', component: NotFound}, // 404-sida 
    {path: '**', redirectTo: '404', pathMatch:'full'} // Om ingen route matchar -> redirect till 404-sidan
];
