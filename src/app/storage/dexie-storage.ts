import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Pal } from './pal';

/**
 * Implementation der IndexDB für das Speichern von benutzerbezogenen Daten.
 * Enthält Informationen über die Struktur der Tabellen und Funktionen zum
 * Zugriff auf die Daten.
 */
@Injectable()
export class DexieStorage extends Dexie {
  pal: Dexie.Table<Pal, number>;

  /**
   * Initialisiert die Tabellen der Datenbank, falls noch nicht vorhanden.
   * Änderungen in der Struktur müssen über die Versionsnummer dem Framework
   * mitgeteilt werden. Die Änderungen werden dann zur Laufzeit mit vorhandenen
   * Datenbanken gemergt.
   *
   * @constructor
   */
  constructor() {
    super('FormBoxDB');
    this.version(1).stores({
      pal: '++id, name, vorname'
    });
  }

  /**
   * Gibt eine Liste mit Personen in der Persönlichen Absenderliste (PAL)
   * zurück.
   *
   * @returns {Promise<Pal[]>} Promise mit dem Inhalt der PAL.
   */
  async getPAL(): Promise<Pal[]> {
    return this.pal.toArray();
  }

  /**
   * Initialisierung der Datenbank mit Beispieldatensätzen.
   */
  async init(): Promise<void> {
    await this.transaction('rw', this.pal, async () => {
      this.pal.put({ name: 'Mouse', vorname: 'Mickey' });
      this.pal.put({ name: 'Duck', vorname: 'Donald' });
    });
  }
}
