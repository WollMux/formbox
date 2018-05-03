// tslint:disable-next-line:no-reference
/// <reference path="../../../node_modules/@microsoft/office-js/dist/office.d.ts" />

import { Injectable } from '@angular/core';
import { Logger } from '@nsalaun/ng-logger';
import { XMLSerializer } from 'xmldom';

/**
 * Service für die Interaktion mit MS Office.
 */
@Injectable()
export class OfficeService {
  private document: Word.DocumentCreated;

  constructor(private log: Logger) { }

  /**
   * Öffnet einen OfficeJs-Dialog.
   *
   * @param url Url oder Pfad einer Komponente.
   * @param dialogHeight Höhe des Dialogs. Angabe in Prozent im Verhältnis zur Bildschirmhöhe (Komplette Höhe = 100).
   * @param dialogWidth Breite des Dialog. Angabe in Prozent im Verhältnis zur Bildschirmbreite.
   */
  async displayDialog(url: string, dialogHeight: number, dialogWidth: number): Promise<void> {
    return Office.context.ui.displayDialogAsync(url, { height: dialogHeight, width: dialogWidth });
  }

  /**
   * Öffnet ein Dokument in MS Office.
   *
   * @param base64 Das Dokument als Base64-String
   */
  async openDocument(base64: string): Promise<Word.DocumentCreated> {
    return Word.run(async context => {
      const doc = context.application.createDocument(base64);
      context.trackedObjects.add(doc);
      context.load(doc);
      this.document = doc;
      doc.load('contentControls/items');

      return context.sync().then(() => {
        return doc;
      });
    });
  }

  async newDocument(): Promise<Word.DocumentCreated> {
    return Word.run(async context => {
      const doc = context.application.createDocument();
      context.load(doc);

      return context.sync().then(() => {
        return doc;
      });
    });
  }

  /**
   * Zeigt ein Dokument an, dass mit openDocument geöffnet wurde.
   *
   * Die Funktion kann nur einmal aufgerufen werden, danach hat sie keine
   * Funktion mehr. Nachdem das Dokument angezeigt wird, kann das aktuelle
   * Addon keine Änderungen daran mehr vornehmen.
   */
  async showDocument(document?: Word.DocumentCreated): Promise<void> {
    return Word.run(context => {
      let doc = document;
      if (!doc) {
        doc = this.document;
        context.trackedObjects.remove(this.document);
        this.document = undefined;
      }
      if (doc) {
        doc.open();

        return doc.context.sync().then(() => Promise.resolve());
      }
    });
  }

  async copyDocument(target: Word.DocumentCreated): Promise<void> {
    return Word.run(context => {
      const doc: Word.Document = context.document;
      const body: Word.Body = doc.body;

      const ooxml = body.getOoxml();

      return context.sync().then(() => {
        target.body.insertOoxml(ooxml.value, Word.InsertLocation.end);

        return context.sync().then(() => Promise.resolve());
      });
    });
  }

  async insertPageBreak(target: Word.Document | Word.DocumentCreated): Promise<void> {
    return Word.run(context => {
      target.body.insertBreak(Word.BreakType.page, Word.InsertLocation.end);

      return context.sync().then(() => Promise.resolve());
    });
  }

  /**
   * Liefert eine Liste der Namen aller Fragmente im aktiven Dokument.
   */
  async getDocumentCommands(): Promise<{ id: number, tag: string, cmd: string }[]> {
    return this.getAllContentControls().then(c => {
      return c.filter(it => it.title && it.title.startsWith('='))
        .map(it => ({ id: it.id, tag: it.tag, cmd: it.title.substr(1).trim() }));
    });
  }

  /**
   * Liefert das nächste DocumentCommand zurück.
   */
  async getNextDocumentCommand(): Promise<{ id: number, tag: string, cmd: string }> {
    return this.getDocumentCommands().then(c => {
      if (c && c.length > 0) {
        const sorted = c.sort((cc1, cc2) => {
          let p1 = Number.MAX_SAFE_INTEGER;
          let p2 = Number.MAX_SAFE_INTEGER;

          if (cc1.tag && !isNaN(+cc1.tag)) {
            p1 = +cc1.tag;
          }

          if (cc2.tag && !isNaN(+cc2.tag)) {
            p2 = +cc2.tag;
          }

          if (p1 < p2) {
            return 1;
          }

          if (p1 > p2) {
            return -1;
          }

          return 0;
        });

        const cc = sorted.pop();

        return cc;
      } else {
        return undefined;
      }
    }).then(cc => {
      // Wir löschen den Title des ContentControls, damit es nicht noch einmal
      // gefunden wird.
      if (cc) {
        return this.deleteContentControlTitle(cc.id).then(() => cc);
      }
    });
  }

  /**
   * Fügt ein Fragment in das aktive Dokument ein.
   *
   * @param name Name des Fragments
   * @param base64 Fragmentdatei als Base64-String
   */
  async insertFragment(id: number, base64: string): Promise<void> {
    return Word.run(context => {
      const doc = this.getDocument(context);
      const control = doc.contentControls.getById(id);

      return context.sync().then(() => {
        if (base64) {
          control.insertFileFromBase64(base64, 'Replace');
        }
        control.delete(true);

        return context.sync();
      });
    }).catch(error => {
      this.log.error(error);

      return Promise.reject(error);
    });
  }

  /**
   * Ersetzt ein ContentControl durch den angegebenen Wert.
   *
   * @param id Interne Id des ContentControls im Dokument
   */
  async insertValue(id: number, value: string): Promise<void> {
    return Word.run(context => {
      const doc = this.getDocument(context);
      const control = doc.contentControls.getById(id);

      return context.sync().then(() => {
        if (value) {
          control.insertText(String(value), 'Replace');
        }
        control.delete(true);

        return context.sync();
      });
    }).catch(error => {
      this.log.error(error);

      return Promise.reject(error);
    });
  }

  /**
   * Fügt ein neues ContentControl an der aktuellen Cursorpsoition ein.
   * Ist ein Text im Dokument selektiert, wird das Control um den selektierten
   * Text herum angelegt.
   */
  async insertContentControl(title: string, tag: string): Promise<number> {
    return Word.run(context => {
      const doc = context.document;
      const range = doc.getSelection();
      const cc = range.insertContentControl();
      cc.title = title;
      cc.tag = tag;
      context.load(cc, 'id');

      return context.sync().then(() => cc.id);
    });
  }

  /**
   * Ändert Titel und Tag des angegebenen ContentControls.
   *
   * @param id Interne Id des Controls im Dokument.
   */
  async updateContentControl(id: number, title: string, tag: string): Promise<void> {
    return Word.run(context => {
      const doc = this.getDocument(context);
      const cc = doc.contentControls.getById(id);
      cc.title = title;
      cc.tag = tag;

      return context.sync().then(() => Promise.resolve());
    });
  }

  /**
   * Löscht ein ContentControl. Der Text, den das Control umfaßt, bleibt
   * erhalten.
   */
  async deleteContentControl(id: number): Promise<void> {
    return Word.run(context => {
      const doc = this.getDocument(context);
      const cc = doc.contentControls.getById(id);
      cc.delete(true);

      return context.sync().then(() => Promise.resolve());
    });
  }

  async addXml(xml: string): Promise<string> {
    return new Promise<string>(resolve => {
      Office.context.document.customXmlParts.addAsync(xml, result => {
        resolve(result.value.id);
      });
    });
  }

  async getXmlById(id: string): Promise<string> {
    return new Promise<string>(resolve => {
      Office.context.document.customXmlParts.getByIdAsync(id, result => {
        result.value.getXmlAsync({}, e => {
          resolve(e.value);
        });
      });
    });
  }

  async getXmlIdsByNamespace(ns: string): Promise<string[]> {
    return new Promise<string[]>(resolve => {
      Office.context.document.customXmlParts.getByNamespaceAsync(ns, result => {
        const ret = [];
        for (const r of result.value as Office.CustomXmlPart[]) {
          ret.push(r.id);
        }
        resolve(ret);
      });
    });
  }

  async deleteXmlById(id: string): Promise<void> {
    return new Promise<void>(resolve => {
      Office.context.document.customXmlParts.getByIdAsync(id, result => {
        result.value.deleteAsync(() => { resolve(); });
      });
    });
  }

  async deleteXmlByNamespace(ns: string): Promise<void> {
    return new Promise<void>(async resolve => {
      await Office.context.document.customXmlParts.getByNamespaceAsync(ns, async result => {
        for (const part of result.value) {
          await part.deleteAsync();
        }
        resolve();
      });
    });
  }

  /**
   * Selektiert ein Content Control.
   * @param id id des ContentControls.
   */
  async selectContentControlById(id: number): Promise<void> {
    await Word.run(context => {
      const doc = this.getDocument(context);
      const control = doc.contentControls.getById(id);
      control.select();

      return context.sync();
    });
  }

  async getSelection(): Promise<Word.Range> {
    return Word.run(context => {
      const sel = context.document.getSelection();
      context.load(sel);

      return context.sync().then(() => {
        sel.track();

        return Promise.resolve(sel);
      });
    });
  }

  async getSelectedData(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      Office.context.document.getSelectedDataAsync(Office.CoercionType.Ooxml, (result: Office.AsyncResult) => {
        resolve(result.value);
      });
    });
  }

  async setSelectedData(ooxml: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      Office.context.document.setSelectedDataAsync(ooxml, { coercionType: Office.CoercionType.Ooxml }, (result: Office.AsyncResult) => {
        resolve();
      });
    });
  }

  async hideRange(range: Word.Range): Promise<Word.Range> {
    return Word.run(range, context => {
      const ooxml = range.getOoxml();

      return context.sync().then(() => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(ooxml.value, 'application/xml');

        const el = doc.getElementsByTagName('w:t');

        for (let i = 0; i < el.length; i++) {
          const t = el.item(i);
          const vanish = doc.createElementNS('http://schemas.openxmlformats.org/wordprocessingml/2006/main', 'w:vanish');
          let rpr = t.previousSibling;

          if (!rpr) {
            rpr = doc.createElementNS('http://schemas.openxmlformats.org/wordprocessingml/2006/main', 'w:rPr');
            t.parentNode.insertBefore(rpr, t);
          }

          rpr.appendChild(vanish);
        }

        const ser = new XMLSerializer();
        const xml = ser.serializeToString(doc);

        return Promise.resolve(xml);
      }).then(xml => {
        const ret = range.insertOoxml(xml, Word.InsertLocation.replace);

        return context.sync().then(() => Promise.resolve(ret));
      });
    });
  }

  async unhideRange(range: Word.Range): Promise<Word.Range> {
    return Word.run(range, context => {
      const ooxml = range.getOoxml();

      return context.sync().then(() => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(ooxml.value, 'application/xml');

        const el = doc.getElementsByTagName('w:vanish');

        while (el.length > 0) {
          const t = el.item(0);
          t.parentNode.removeChild(t);
        }

        const ser = new XMLSerializer();
        const xml = ser.serializeToString(doc);

        return Promise.resolve(xml);
      }).then(xml => {
        const ret = range.insertOoxml(xml, Word.InsertLocation.replace);

        return context.sync().then(() => Promise.resolve(ret));
      });
    });
  }

  async hideContentControl(cc: Word.ContentControl): Promise<void> {
    return Word.run(cc, context => {
      const range = cc.getRange(Word.RangeLocation.whole);

      return context.sync(range);
    }).then(range => {
      return this.hideRange(range);
    })
      .then(() => Promise.resolve());
  }

  async unhideContentControl(cc: Word.ContentControl): Promise<void> {
    return Word.run(cc, context => {
      const range = cc.getRange(Word.RangeLocation.whole);

      return context.sync(range);
    }).then(range => {
      return this.unhideRange(range);
    })
      .then(() => Promise.resolve());
  }

  private deleteContentControlTitle = async (id: number): Promise<void> => {
    return Word.run(context => {
      const doc = this.getDocument(context);
      const controls = doc.contentControls;
      controls.load('items/id, items/title, items/tag');

      return doc.context.sync().then(() => {
        const cc = controls.getByIdOrNullObject(id);
        cc.title = '';

        return doc.context.sync().then(() => Promise.resolve());
      });
    });
  }

  /**
   * Gibt eine Liste aller ContentControls im aktiven Dokument zurück.
   */
  private getAllContentControls = async (): Promise<{ id: number, title: string, tag: string }[]> => {
    return Word.run(context => {
      const doc = this.getDocument(context);
      const controls = doc.contentControls;
      doc.context.load(controls, 'id, title, tag');
      controls.load('items/id, items/title, items/tag');

      return doc.context.sync().then(() => {
        return controls.items.map(it => ({ id: it.id, title: it.title, tag: it.tag }));
      });
    });
  }

  private getDocument(context: Word.RequestContext): Word.Document | Word.DocumentCreated {
    let doc: Word.Document | Word.DocumentCreated;
    if (this.document) {
      doc = this.document;
    } else {
      doc = context.document;
    }

    return doc;
  }
}
