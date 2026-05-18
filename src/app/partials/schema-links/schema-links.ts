import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-schema-links',
  imports: [RouterLink, RouterLinkActive, MatIcon],
  templateUrl: './schema-links.html',
  styleUrl: './schema-links.scss',
})
export class SchemaLinks {}
