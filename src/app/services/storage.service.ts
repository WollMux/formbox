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
   * Löscht die Datenbank und legt sie neu an.
   * 
   * Nur für Testzwecke gedacht.
   */
  abstract async reset(): Promise<void>;

  /**
   * Liefert die Persönliche Absenderliste (PAL) zurück.
   */
  abstract async getPAL(): Promise<Absender[]>;
}
