import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StorageService } from './services/storage.service';
import { LocalStorageService } from './services/local-storage.service';
import { DexieStorage } from './storage/dexie-storage';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    DexieStorage,
    { provide: StorageService, useClass: LocalStorageService }
  ],
  bootstrap: [ AppComponent ]
})
// tslint:disable-next-line:no-unnecessary-class
export class AppModule { }
