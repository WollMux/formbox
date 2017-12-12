import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Pal } from './pal';

@Injectable()
export class DexieStorage extends Dexie {
  pal: Dexie.Table<Pal, number>;

  constructor() {
    super('FormBoxDB');
    this.version(1).stores({
      pal: '++id, name, vorname'
    });
  }

  async getPAL(): Promise<Pal[]> {
    return this.pal.toArray();
  }

  async init(): Promise<void> {
    await this.transaction('rw', this.pal, async () => {
      this.pal.put({ name: 'Mouse', vorname: 'Mickey' });
      this.pal.put({ name: 'Duck', vorname: 'Donald' });
    });
  }
}
