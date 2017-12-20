import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AccordionModule } from 'ngx-bootstrap/accordion';

import { AppComponent } from './app.component';
import { StorageService } from './services/storage.service';
import { LocalStorageService } from './services/local-storage.service';
import { DexieStorage } from './storage/dexie-storage';
import { TemplateService } from './services/template.service';
import { OfficeService } from './services/office.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    AccordionModule.forRoot()
  ],
  providers: [
    DexieStorage,
    { provide: StorageService, useClass: LocalStorageService },
    TemplateService,
    OfficeService
  ],
  bootstrap: [AppComponent]
})
// tslint:disable-next-line:no-unnecessary-class
export class AppModule { }
