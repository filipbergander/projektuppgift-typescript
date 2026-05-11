import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CdkTableModule } from "@angular/cdk/table";
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-card-picture',
  imports: [MatCardModule, MatButtonModule, CdkTableModule, MatIcon],
  templateUrl: './card-picture.html',
  styleUrl: './card-picture.scss',
})
export class CardPicture {}
