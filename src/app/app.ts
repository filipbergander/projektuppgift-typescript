import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavHeader } from './partials/nav-header/nav-header';
import { Footer } from './partials/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavHeader, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('projektuppgift-typescript');
}
