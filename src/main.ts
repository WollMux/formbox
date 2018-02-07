// tslint:disable-next-line:no-reference
/// <reference path="../node_modules/@types/office-js/index.d.ts" />

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

function bootstrap(): void {
  platformBrowserDynamic().bootstrapModule(AppModule);
}

if (environment.production) {
  enableProdMode();
}

if (!environment.test && window.hasOwnProperty('Office') && window.hasOwnProperty('Word')) {
  Office.initialize = reason => {
    // Schaltet die Telemetry von Office.js aus.
    OSF.Logger = undefined;
    bootstrap();
  };
} else {
  bootstrap();
}
