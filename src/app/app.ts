import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavHeader } from './partials/nav-header/nav-header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavHeader],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('projektuppgift-typescript');
}
