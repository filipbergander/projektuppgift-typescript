/*https://stackoverflow.com/questions/46869616/how-to-use-matpaginatorintl 
https://material.angular.dev/components/paginator/api Hur man kan göra för att översätta texter i pagineringen 
*/

import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class MatPaginatorTranslator extends MatPaginatorIntl {

  override itemsPerPageLabel = 'Antal per sida:';
  override nextPageLabel = 'Nästa sida';
  override previousPageLabel = 'Föregående sida';
  override firstPageLabel = 'Första sidan';
  override lastPageLabel = 'Sista sidan';

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 av ${length}`;
    }

    const start = page * pageSize;
    const end = Math.min(start + pageSize, length);

    return `${start + 1}–${end} av ${length}`;
  }
}
