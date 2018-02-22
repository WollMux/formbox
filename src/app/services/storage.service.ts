import { Injectable } from '@angular/core';
import { Absender } from '../storage/absender';

/**
 * Wird zum Injizieren des StorageService benötigt, falls in Zukunft eine
 * andere Strategie zum Speichern der benutzerbezogenen Daten verwendet werden
 * soll.
 * 
 * Ein Interface wäre besser, aber Interfaces gehen beim Transpilieren nach
 * JavaScript verloren.
 */
@Injectable()
export abstract class StorageService {

  /**
   * Öffnet die Datenbank.
   */
  abstract async open(): Promise<void>;

  /**
   * Löscht die Datenbank und legt sie neu an.
   * 
   * Nur für Testzwecke gedacht.
   */
  abstract async reset(): Promise<void>;

  /**
   * Liefert die Persönliche Absenderliste (PAL) zurück.
   */
  abstract async getPAL(): Promise<Absender[]>;

  /**
   * Setzt eine neue PAL in der Datenbank.
   *
   * @param absender Die neue PAL.
   */
  abstract async setPAL(absender: Absender[]): Promise<void>;

  /**
   * Liefert die ID des ausgewählten Absender.
   */
  abstract async getSelected(): Promise<number>;

  /**
   * Setzt einen neuen ausgewählten Absender.
   *
   * @param selected Die ID des neuen Absenders.
   */
  abstract async setSelected(selected: number): Promise<void>;
}
