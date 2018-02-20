import { Injectable } from '@angular/core';
import { Logger } from '@nsalaun/ng-logger';
import { StorageService } from '../../../../src/app/services/storage.service';
import { Absender } from '../../../../src/app/storage/absender';

/**
 * Service zum Speichern von lokalen Benutzerdaten im LocalStorage des
 * Browsers.
 */
@Injectable()
export class MockStorageService extends StorageService {

  async open(): Promise<void> {
    return Promise.resolve();
  }

  async reset(): Promise<void> {
    return Promise.resolve();
  }

  async getPAL(): Promise<Absender[]> {
    return Promise.resolve([{uid: 'max.mustermann', vorname: 'max', nachname: 'mustermann', id: 1}]);
  }

  async getSelected(): Promise<number> {
    return Promise.resolve(1);
  }

  async setPAL(absender: Absender[]): Promise<boolean> {
    return Promise.resolve(true);
  }

  async setSelected(selected: number): Promise<boolean> {
    return Promise.resolve(true);
  }
}
