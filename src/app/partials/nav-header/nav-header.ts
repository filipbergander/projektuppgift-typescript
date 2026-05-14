import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-header',
  imports: [RouterLink, RouterLinkActive, MatIcon],
  templateUrl: './nav-header.html',
  styleUrl: './nav-header.scss',
})
export class NavHeader {}
