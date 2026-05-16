import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SelectTheme } from '../select-theme/select-theme';

@Component({
  selector: 'app-nav-header',
  imports: [RouterLink, RouterLinkActive, MatIcon, SelectTheme],
  templateUrl: './nav-header.html',
  styleUrl: './nav-header.scss',
})
export class NavHeader {}
