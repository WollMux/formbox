import { Injectable } from '@angular/core';
import { Logger } from '@nsalaun/ng-logger';

/**
 * Service für die Interaktion mit MS Office.
 */
@Injectable()
export class OfficeService {
  constructor(private log: Logger) { }

  /**
   * Öffnet ein Dokument in MS Office.
   * 
   * @param base64 Das Dokument als Base64-String
   */
  async openDocument(base64: string): Promise<void> {
    await Word.run(context => {
      const body = context.document.body;
      body.insertFileFromBase64(base64, 'Replace');

      return context.sync();
    });
  }

  /**
   * Liefert eine Liste der Namen aller Fragmente im aktiven Dokument.
   */
  async getFragmentNames(): Promise<string[]> {
    return this.getAllContentControls().then(c => {
      return c.items.map(it => it.title);
    });
  }

  /**
   * Fügt ein Fragment in das aktive Dokument ein.
   * 
   * @param name Name des Fragments
   * @param base64 Fragmentdatei als Base64-String
   */
  async insertFragment(name: string, base64: string): Promise<void> {
    await Word.run(context => {
      const doc = context.document;
      const controls = doc.contentControls.getByTitle(name);
      controls.load('items');

      return context.sync().then(() => {
        controls.items.forEach(c => {
          if (base64) {
            c.insertFileFromBase64(base64, 'Replace');
          }
          c.delete(true);
        });

        return context.sync();
      });
    }).catch(error => {
      this.log.error(error);

      return undefined;
    });
  }

  /**
   * Gibt eine Liste aller ContentControls im aktiven Dokument zurück.
   */
  private getAllContentControls = async (): Promise<Word.ContentControlCollection> => {
    return Word.run(context => {
      const doc = context.document;
      const controls = doc.contentControls;
      controls.load('items');

      return context.sync(controls);
    });
  }

}
