import { Component } from '@angular/core';
import { Hero } from '../../partials/hero/hero';
import { Statistic } from '../../partials/statistic/statistic';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Hero, Statistic],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
