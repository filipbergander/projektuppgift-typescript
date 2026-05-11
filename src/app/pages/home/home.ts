import { Component } from '@angular/core';
import { NavHeader } from '../../partials/nav-header/nav-header';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavHeader],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
