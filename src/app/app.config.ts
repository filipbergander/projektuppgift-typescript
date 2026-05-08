import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { MatPaginatorTranslator } from './translator/mat-paginator-translator';
import { MatPaginatorIntl } from '@angular/material/paginator';


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    {provide: MatPaginatorIntl, useClass: MatPaginatorTranslator}
  ]
};
