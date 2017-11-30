/// <reference path="../node_modules/@types/office-js/index.d.ts" />

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

function bootstrap() {
    platformBrowserDynamic().bootstrapModule(AppModule);
}

if (environment.production) {
  enableProdMode();
}

if (!('test' in environment) && window.hasOwnProperty('Office') && window.hasOwnProperty('Word')) {
    Office.initialize = function(reason) {
        // Schaltet die Telemetry von Office.js aus.
        OSF.Logger = null;
        bootstrap();
    };
} else {
    bootstrap();
}
