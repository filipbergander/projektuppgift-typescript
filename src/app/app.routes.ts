import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { NotFound } from './pages/not-found/not-found';
import { CourseScheme } from './pages/course-scheme/course-scheme';

export const routes: Routes = [
    {path: 'hem', component: Home},
    {path: '', redirectTo: 'hem', pathMatch:'full'},
    {path: 'ramschema', component: CourseScheme},
    {path: '404', component: NotFound},
    {path: '**', redirectTo: '404', pathMatch:'full'}
];
