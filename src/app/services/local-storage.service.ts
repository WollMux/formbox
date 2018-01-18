import { Injectable } from '@angular/core';
import { DexieStorage } from '../storage/dexie-storage';
import { Absender } from '../storage/pal';
import { StorageService } from './storage.service';

/**
 * Service zum Speichern von lokalen Benutzerdaten im LocalStorage des
 * Browsers.
 */
@Injectable()
export class LocalStorageService extends StorageService {

  /**
   * Initialisiert die Dexie-Datenbank.
   * 
   * @constructor
   * @param db
   */
  constructor(private db: DexieStorage) {
    super();
  }

  async reset(): Promise<void> {
    return this.db.delete().then(async () => {
      await this.db.open().then(async () => {
        await this.db.init();
      });
    });
  }

  async getPAL(): Promise<Absender[]> {
    return this.db.getPAL();
  }
}
