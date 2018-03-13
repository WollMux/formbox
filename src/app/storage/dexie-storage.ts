import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Logger } from '@nsalaun/ng-logger';
import { Absender } from './absender';

/**
 * Implementation der IndexDB für das Speichern von benutzerbezogenen Daten.
 * Enthält Informationen über die Struktur der Tabellen und Funktionen zum
 * Zugriff auf die Daten.
 */
@Injectable()
export class DexieStorage extends Dexie {
  pal: Dexie.Table<Absender, number>;
  selected: Dexie.Table<number, number>;

  /**
   * Initialisiert die Tabellen der Datenbank, falls noch nicht vorhanden.
   * Änderungen in der Struktur müssen über die Versionsnummer dem Framework
   * mitgeteilt werden. Die Änderungen werden dann zur Laufzeit mit vorhandenen
   * Datenbanken gemergt.
   */
  constructor(private log: Logger) {
    super('FormBoxDB');
    this.version(2).stores({
      pal: '++id, uid, vorname, nachname, rolle',
      selected: '++, id'
    });
  }

  /**
   * Gibt eine Liste mit Personen in der Persönlichen Absenderliste (PAL)
   * zurück.
   *
   * @returns Promise mit dem Inhalt der PAL.
   */
  async getPAL(): Promise<Absender[]> {
    return this.pal.toArray();
  }

  async setPAL(absender: Absender[]): Promise<void> {
    return this.transaction('rw', this.pal, async () => {
      this.pal.clear();
      this.pal.bulkPut(absender);
    })
    .then(() => Promise.resolve())
    .catch(err => {
      this.log.debug(err);

      return Promise.reject(err);
    });
  }

  async getSelected(): Promise<number> {
    return this.transaction('rw', this.selected, async () => {
      return this.selected.toArray().then(ids => ids[0]);
    });
  }

  async setSelected(id: number): Promise<void> {
    return this.transaction('rw', this.selected, async () => {
      this.selected.clear();
      if (id) {
        this.selected.put(id);
      }
    })
    .then(() => Promise.resolve())
    .catch(err => {
      this.log.debug(err);

      return Promise.reject(err);
    });
  }

  /**
   * Initialisierung der Datenbank mit Beispieldatensätzen.
   */
  async init(): Promise<void> {
    await this.transaction('rw', [this.pal, this.selected], async () => {
      const id = await this.pal.put({
        uid: 'mickey.mouse',
        nachname: 'Mouse',
        vorname: 'Mickey',
        anrede: 'Herr',
        dienstgebaeude: 'Disneyworld',
        mail: 'mickey@disney.com',
        fax: '0123/3830101',
        postPLZ: '12345',
        postOrt: 'Orlando',
        postanschrift: 'Disneylane',
        telefon: '0123/393767192',
        titel: 'Dr.',
        zimmer: '45'
      });
      this.selected.put(id);
      this.pal.put({
        uid: 'donald.duck',
        nachname: 'Duck',
        vorname: 'Donald',
        anrede: 'Herr',
        dienstgebaeude: 'Disneyworld',
        mail: 'donal@disney.com',
        fax: '0123/3830101',
        postPLZ: '12345',
        postOrt: 'Orlando',
        postanschrift: 'Disneylane',
        telefon: '0123/393767200',
        titel: '',
        zimmer: '47'
      });
    });
  }
}
