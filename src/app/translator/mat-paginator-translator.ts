/*https://stackoverflow.com/questions/46869616/how-to-use-matpaginatorintl 
https://material.angular.dev/components/paginator/api Hur man kan göra för att översätta texter i pagineringen 
*/

import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class MatPaginatorTranslator extends MatPaginatorIntl {

  override itemsPerPageLabel = 'Antal kurser per sida:';
  override nextPageLabel = 'Nästa sida';
  override previousPageLabel = 'Föregående sida';
  override firstPageLabel = 'Första sidan';
  override lastPageLabel = 'Sista sidan';

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    // Om det inte finns några kurser i tabellen visas texten 0 av 0 kurser
    if (length === 0 || pageSize === 0) {
      return `0 av ${length} kurser`;
    }

    const start = page * pageSize;
    const end = Math.min(start + pageSize, length); 
 // Om fler kurser än 0? Visas denna text i pagineringen
    return `${start + 1}–${end} av ${length} kurser`;
  }
}
