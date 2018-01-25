import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Absender } from './pal';

/**
 * Implementation der IndexDB für das Speichern von benutzerbezogenen Daten.
 * Enthält Informationen über die Struktur der Tabellen und Funktionen zum
 * Zugriff auf die Daten.
 */
@Injectable()
export class DexieStorage extends Dexie {
  pal: Dexie.Table<Absender, number>;

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
      pal: '++id, nachname, vorname, anrede, titel, strasse, posPLZ, postOrt, telefon, fax, email, dienstgebaeude, zimmer'
    });
  }

  /**
   * Gibt eine Liste mit Personen in der Persönlichen Absenderliste (PAL)
   * zurück.
   *
   * @returns {Promise<Absender[]>} Promise mit dem Inhalt der PAL.
   */
  async getPAL(): Promise<Absender[]> {
    return this.pal.toArray();
  }

  /**
   * Initialisierung der Datenbank mit Beispieldatensätzen.
   */
  async init(): Promise<void> {
    await this.transaction('rw', this.pal, async () => {
      this.pal.put({
        nachname: 'Mouse',
        vorname: 'Mickey',
        anrede: 'Herr',
        dienstgebaeude: 'Disneyworld',
        email: 'mickey@disney.com',
        fax: '0123/3830101',
        postPLZ: '12345',
        postOrt: 'Orlando',
        strasse: 'Disneylane',
        telefon: '0123/393767192',
        titel: 'Dr.',
        zimmer: '45'
      });
      this.pal.put({
        nachname: 'Duck',
        vorname: 'Donald',
        anrede: 'Herr',
        dienstgebaeude: 'Disneyworld',
        email: 'donal@disney.com',
        fax: '0123/3830101',
        postPLZ: '12345',
        postOrt: 'Orlando',
        strasse: 'Disneylane',
        telefon: '0123/393767200',
        titel: '',
        zimmer: '47'
      });
    });
  }
}
