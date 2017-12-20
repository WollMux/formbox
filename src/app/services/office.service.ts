import { Injectable } from '@angular/core';

@Injectable()
export class OfficeService {
  async insertDocument(base64: string, loc: string): Promise<void> {
    await Word.run(context => {
      const body = context.document.body;
      body.insertFileFromBase64(base64, loc);
      return context.sync();
    });
  }

  async getFragmentNames(): Promise<string[]> {
    return await this.getAllContentControls().then(c => {
      return c.items.map(it => it.title);
    });
  }

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
      console.log(error);
      return undefined;
    });
  }

  /**
   * Gibt eine Liste aller ContentControls im aktiven Dokument zurück.
   */
  private getAllContentControls = async (): Promise<Word.ContentControlCollection> => {
    return await Word.run(context => {
      const doc = context.document;
      const controls = doc.contentControls;
      controls.load('items');

      return context.sync(controls);
    });
  }

}
