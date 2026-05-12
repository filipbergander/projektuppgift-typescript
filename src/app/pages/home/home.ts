import { Component } from '@angular/core';
import { Hero } from '../../partials/hero/hero';
import { Statistic } from '../../partials/statistic/statistic';
import { CardPicture } from '../../partials/card-picture/card-picture';
import { SchemaLinks } from "../../partials/schema-links/schema-links";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Hero, Statistic, CardPicture, SchemaLinks],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
