import { async, TestBed } from '@angular/core/testing';
import { AppComponent } from '../../src/app/app.component';
import { DexieStorage } from '../../src/app/storage/dexie-storage';
import { StorageService } from '../../src/app/services/storage.service';
import { LocalStorageService } from '../../src/app/services/local-storage.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        DexieStorage,
        { provide: StorageService, useClass: LocalStorageService }
      ]
    }).compileComponents();
  }));
  xit('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
