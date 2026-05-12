import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-schema-links',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './schema-links.html',
  styleUrl: './schema-links.scss',
})
export class SchemaLinks {}
