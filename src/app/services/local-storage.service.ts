import { Injectable } from '@angular/core';
import { DexieStorage } from '../storage/dexie-storage';
import { Pal } from '../storage/pal';

@Injectable()
export class LocalStorageService {

  constructor(private db: DexieStorage) {
  }

  async reset(): Promise<void> {
    return this.db.delete().then(async () => {
      await this.db.open().then(async () => {
        await this.db.init();
      });
    });
  }

  async getPAL(): Promise<Pal[]> {
    return this.db.getPAL();
  }
}
