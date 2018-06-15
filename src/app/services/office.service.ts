// tslint:disable-next-line:no-reference
/// <reference path="../../../node_modules/@microsoft/office-js/dist/office.d.ts" />

import { Injectable } from '@angular/core';
import { Logger } from '@nsalaun/ng-logger';
import { XMLSerializer } from 'xmldom';
import * as uniqid from 'uniqid';
import * as wgxpath from 'wicked-good-xpath';

// tslint:disable-next-line:no-require-imports
const randomColor = require('randomcolor');

/**
 * Service für die Interaktion mit MS Office.
 */
@Injectable()
export class OfficeService {
  private document: Word.DocumentCreated;

  constructor(private log: Logger) {
    wgxpath.install();
  }

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
   * Gibt getrackte Office-Objekte wieder frei.
   */
  async untrack(o: any): Promise<void> {
    return Word.run(o, context => {
      o.untrack();

      return context.sync().then(() => Promise.resolve());
    });
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

  /**
   * Erzeugt ein neues Dokument im Hintergrund. Muss mit showDocument sichtbar
   * gemacht werden.
   */
  async newDocument(): Promise<Word.DocumentCreated> {
    return Word.run(async context => {
      const doc = context.application.createDocument();
      context.trackedObjects.add(doc);
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
  async showDocument(document?: Word.DocumentCreated): Promise<Word.DocumentCreated> {
    return Word.run(context => {
      let doc = document;
      if (!doc) {
        doc = this.document;
        context.trackedObjects.remove(this.document);
        this.document = undefined;
      }
      if (doc) {
        doc.open();

        return doc.context.sync().then(() => Promise.resolve(document));
      }
    });
  }

  /**
   * Kopiert den Inhalt des aktuellen Dokuments in ein temporäres
   * Dokument.
   *
   * @param target Dokument, das mit createDocument erzeugt wurde.
   */
  async copyDocument(target: Word.DocumentCreated): Promise<void> {
    return Word.run(context => {
      const doc: Word.Document = context.document;
      const body: Word.Body = doc.body;

      const ooxml = body.getOoxml();

      return context.sync().then(() => {
        target.body.insertOoxml(ooxml.value, Word.InsertLocation.end);

        return target.context.sync().then(() => Promise.resolve());
      });
    });
  }

  /**
   * Fügt einen Seitenumbruch am Ende eines Dokuments ein.
   */
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
   * Eweitert eine Range auf den gesamten Absatz. Wenn keine Range übergeben
   * wird, wird die aktuelle Selektion verwendet.
   *
   * @returns Range für den Absatz. Die Range wird automatisch getrackt, weil
   * man sonst nichts damit anfangen kann. Wenn die Range nicht mehr benötigt
   * wird, muss sie mit {@link untrack} freigegeben werden.
   */
  async expandRangeToParagraph(range?: Word.Range): Promise<Word.Range> {
    return Word.run(context => {
      const rng = (range) ? range : context.document.getSelection();
      rng.paragraphs.load('items');

      return context.sync().then(() => {
        const p = rng.paragraphs.items[0];
        const r = p.getRange(Word.RangeLocation.whole);
        r.track();

        return context.sync().then(() => r);
      });
    });
  }

  /**
   * Prüft ob eine Range in einem ContentControl ist.
   *
   * @param range Wenn keine Range übergeben wird, wird die aktuelle Selektion verwendet
   *
   * @returns id, title, tag des ContentControls oder undefined, wenn kein ContentControl gefunden wird.
   */
  async isInsideContentControl(range?: Word.Range): Promise<{ id: number, title: string, tag: string, text: string }> {
    return Word.run(range, context => {
      const rng = (range) ? range : context.document.getSelection();
      const cc = rng.parentContentControlOrNullObject; // sollte eigentlich undefined zurückgeben, wenn kein CC da ist. Tut es aber nicht.

      if (cc) {
        cc.load('title, tag, text');

        return context.sync().then(() => {
          if (cc.title || cc.tag) {
            return Promise.resolve({ id: cc.id, title: cc.title, tag: cc.tag, text: cc.text });
          } else {
            return Promise.resolve(undefined);
          }
        });
      } else {
        return Promise.resolve(undefined);
      }
    });
  }

  /**
   * Gibt alle ContentControls in einem Range zurück.
   *
   * @param range Wenn kein Range angegeben wird, wird die aktuelle Selektion
   *  verwendet.
   */
  async getContentControlsInRange(range?: Word.Range): Promise<{ id: number, title: string, tag: string, text: string }[]> {
    return Word.run(range, context => {
      const rng = (range) ? range : context.document.getSelection();
      const cc = rng.contentControls;
      cc.load('items');

      return context.sync().then(() => {
        return Promise.resolve(cc.items.map(it => ({ id: it.id, title: it.title, tag: it.tag, text: it.text })));
      });
    });
  }

  /**
   * Fügt ein neues ContentControl an der aktuellen Cursorpsoition ein.
   * Ist ein Text im Dokument selektiert, wird das Control um den selektierten
   * Text herum angelegt.
   */
  async insertContentControl(
    title: string, tag: string, placeholder?: string, style?: string, range?: Word.Range,
    cannotEdit?: boolean, cannotDelete?: boolean): Promise<number> {
    return Word.run(range, context => {
      const doc = context.document;
      const rng = (range) ? range : doc.getSelection();
      const cc = rng.insertContentControl();
      const color = randomColor();

      cc.title = title;
      cc.tag = tag;
      cc.color = color;
      cc.cannotEdit = cannotEdit;
      cc.cannotDelete = cannotDelete;
      cc.placeholderText = placeholder;
      // cc.style = style;
      context.load(cc, 'id');

      return context.sync().then(() => cc.id);
    });
  }

  /**
   * Erzeugt eine ContentControl um einen Absatz im Dokument.
   * 
   * @param title Titel des ContentControls
   * @param tag Tag des ContentControl
   * @param style Name einer Formatvorlage
   */
  async insertContentControlAroundParagraph(title: string, tag: string, placeholder?: string, style?: string): Promise<number> {
    return this.expandRangeToParagraph().then(range => {
      return this.insertContentControl(title, tag, placeholder, style, range).then(id => {
        this.untrack(range);

        return Promise.resolve(id);
      });
    });
  }

  /**
   * Gibt den Text, der von einem ContentControl umschlossen wird, zurück.
   * 
   * @param id Id des ContentControls
   */
  async getContentControlText(id: number): Promise<string> {
    return Word.run(context => {
      const doc = this.getDocument(context);
      const cc = doc.contentControls.getById(id);
      cc.load('text');

      return context.sync().then(() => cc.text);
    });
  }

  /**
   * Setzt anhand einer bestehenden Bindung den Text des Content-Controls.
   *
   * @param text Zu setzender Text Content-Control.
   * @param ccid ID des Content-Controls
   */
  async setData(text: string, ccid: string): Promise<any> {
    return Office.context.document.bindings.getByIdAsync(ccid, (result: Office.AsyncResult) => {
      if (result.status === Office.AsyncResultStatus.Succeeded) {
        const bind: Office.Binding = result.value;

        return bind.setDataAsync(text);
      }
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
   * Ersetzt den Text, der von einem ContentControl umschlossen wird.
   * 
   * @param id Id des ContentControls
   * @param text Text, der eingefügt werden soll
   */
  async replaceTextInContentControl(id: number, text: string): Promise<void> {
    return Word.run(context => {
      const doc = this.getDocument(context);
      const cc = doc.contentControls.getById(id);
      cc.load('cannotEdit');

      return context.sync().then(() => {
        if (cc.cannotEdit) {
          cc.cannotEdit = false;
          cc.insertText(text, Word.InsertLocation.replace);
          cc.cannotEdit = true;
          context.sync();

          return Promise.resolve();
        }

        cc.insertText(text, Word.InsertLocation.replace);

        return Promise.resolve();
      }).catch(error => {
        this.log.error(error);
      });
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
      cc.style = 'Normal';
      cc.delete(true);

      return context.sync().then(() => Promise.resolve());
    });
  }

  /**
   * Gibt eine Liste aller ContentControls im aktiven Dokument zurück.
   */
  async getAllContentControls(): Promise<{ id: number, title: string, tag: string, text: string }[]> {
    return Word.run(context => {
      const doc = this.getDocument(context);
      const controls = doc.contentControls;
      doc.context.load(controls, 'id, title, tag');
      controls.load('items/id, items/title, items/tag, items/text');

      return doc.context.sync().then(() => {
        return controls.items.map(it => ({ id: it.id, title: it.title, tag: it.tag, text: it.text }));
      });
    });
  }

  async getPreviousContentControl(tag?: string): Promise<number> {
    return Word.run(context => {
      const doc = context.document;
      const range = doc.getSelection().getRange(Word.RangeLocation.start).expandTo(doc.body.getRange(Word.RangeLocation.start));
      const cc = range.contentControls;
      cc.load('items');

      return context.sync().then(() => {
        const c = cc.items.reverse().find(it => it.tag === tag);
        if (c) {
          return c.id;
        } else {
          return undefined;
        }
      });
    });
  }

  /**
   * Gibt eine Liste aller  Content Controls zurück, die nach einem bestimmten
   * Content Control definiert sind. Wird keine Id angegeben, werden alle
   * Content Controls zurückgegeben.
   * 
   * @param id Id des Content Controls von dem aus gesucht werden soll.
   */
  async getNextContentControls(id?: number): Promise<{ id: number, title: string, tag: string }[]> {
    return Word.run(context => {
      const doc = this.getDocument(context);
      if (!id) {
        const controls = doc.body.contentControls;
        controls.load('items');

        return context.sync().then(() => Promise.resolve(controls.items.map(cc => {
          return { id: cc.id, title: cc.title, tag: cc.tag };
        })));
      }

      const ccStart: Word.ContentControl = doc.contentControls.getByIdOrNullObject(id);

      if (ccStart) {
        let rng: Word.Range = ccStart.getRange(Word.RangeLocation.after);
        const end = doc.body.getRange(Word.RangeLocation.end);
        rng = rng.expandTo(end);
        const controls = rng.contentControls;
        controls.load('items');

        return context.sync().then(() => Promise.resolve(controls.items.map(cc => {
          return { id: cc.id, title: cc.title, tag: cc.tag };
        })));
      } else {
        Promise.reject(`ContentControl mit id ${id} existiert nicht.`);
      }
    });
  }

  /**
   * Gibt die Range zwischen zwei Content Controls zurück, beginnend 
   * vor dem ersten Content Control. 
   */
  async getRangeBetweenContentControls(id: number, idNext: number): Promise<Word.Range> {
    return Word.run(context => {
      const doc = this.getDocument(context);
      const cc1 = doc.contentControls.getByIdOrNullObject(id);
      const rng1 = cc1.getRange(Word.RangeLocation.before);

      let rng2;
      if (idNext) {
        const cc2 = doc.contentControls.getByIdOrNullObject(idNext);
        rng2 = cc2.getRange(Word.RangeLocation.before);
      } else {
        rng2 = doc.body.getRange(Word.RangeLocation.end);
      }

      const rng = rng1.expandToOrNullObject(rng2);
      rng.track();

      return context.sync().then(() => {
        return Promise.resolve(rng);
      });
    });
  }

  /**
   * Erzeugt ein Databinding für ein Content Control. Der Titel des Content 
   * Controls wird auf eine zufällige Id geändert.
   * 
   * @param id Id des Content Controls.
   * @param prefix Präfix, der dem Titel vorangestellt wird.
   */
  async bindToContentControl(id: number, prefix: string): Promise<string> {
    return Word.run(context => {
      const cc = context.document.contentControls.getByIdOrNullObject(id);
      if (cc) {
        cc.title = `${prefix}${uniqid()}`;

        return context.sync(cc.title);
      } else {
        return Promise.reject('ContentControl existiert nicht.');
      }
    }).then(title => this.addBindingFromNamedItem(title));
  }

  /**
   * Löscht ein bestehendes Databinding eines Content Controls.
   * 
   * @param id Id des Bindings.
   */
  async deleteBinding(id: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      Office.context.document.bindings.releaseByIdAsync(id, (result: Office.AsyncResult) => {
        if (result.status === Office.AsyncResultStatus.Succeeded) {
          resolve();
        } else {
          reject(result.error.message);
        }
      });
    });
  }

  /**
   * Erzeugt einen EventHandler für ein bestehendes Binding eines Content
   * Controls.
   * 
   * @param id Id des Bindings
   * @param callback Callbackfunktion für BindingDataChanged
   */
  async addEventHandlerToBinding(id: string, callback: (text: string) => void): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      Office.context.document.bindings.getByIdAsync(id, (result: Office.AsyncResult) => {
        if (result.status === Office.AsyncResultStatus.Succeeded) {
          const bind: Office.Binding = result.value;
          bind.addHandlerAsync(Office.EventType.BindingDataChanged,
            args => {
              this.getDataFromBinding(bind).then(text => callback(text));
            },
            (result2: Office.AsyncResult) => {
              if (result2.status === Office.AsyncResultStatus.Succeeded) {
                resolve();
              } else {
                reject('Erstellung des EventHandlers für Binding fehlgeschlagen.');
              }
            });
        } else {
          reject('Binding existiert nicht.');
        }
      });
    });
  }

  /**
   * Lösche alle EventHandler eines Bindings
   * 
   * @param id Id des Bindings.
   */
  async removeEventHandlersFromBinding(id: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      Office.context.document.bindings.getByIdAsync(id, (result: Office.AsyncResult) => {
        if (result.status === Office.AsyncResultStatus.Succeeded) {
          const bind: Office.Binding = result.value;
          bind.removeHandlerAsync(Office.EventType.BindingDataChanged, (result2: Office.AsyncResult) => {
            if (result2.status === Office.AsyncResultStatus.Succeeded) {
              resolve();
            } else {
              reject('Entfernen der EventHandler für Binding fehlgeschlagen.');
            }
          });
        } else {
          reject('Binding existiert nicht.');
        }
      });
    });
  }

  /**
   * Fügt Custom XML in das aktuelle Dokument ein.
   *
   * @returns Die ID des neuen CustomXML-Objekts
   */
  async addXml(xml: string): Promise<string> {
    return new Promise<string>(resolve => {
      Office.context.document.customXmlParts.addAsync(xml, (result: Office.AsyncResult) => {
        resolve(result.value.id);
      });
    });
  }

  /**
   * Gibt einen CustomXML-Objekt zurück.
   *
   * @param id ID des CustomXML-Objekts.
   */
  async getXmlById(id: string): Promise<string> {
    return new Promise<string>(resolve => {
      Office.context.document.customXmlParts.getByIdAsync(id, (result: Office.AsyncResult) => {
        result.value.getXmlAsync({}, e => {
          resolve(e.value);
        });
      });
    });
  }

  /**
   * Gibt ein oder mehrere CustomXML-Objekte zurück, die einen bestimmten
   * Namespace verwenden.
   *
   * @param ns Namespace im XML-Dokument.
   */
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

  /**
   * Löscht ein CustomXML-Objekt.
   *
   * @param id ID des CustomXML-Objekts.
   */
  async deleteXmlById(id: string): Promise<void> {
    return new Promise<void>(resolve => {
      Office.context.document.customXmlParts.getByIdAsync(id, result => {
        result.value.deleteAsync(() => { resolve(); });
      });
    });
  }

  /**
   * Löscht alle CustomXML-Objekte, die einen bestimmten
   * Namespace verwenden.
   *
   * @param ns Namespace im XML-Dokument.
   */
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

  async getBindingById(ccid: string): Promise<Office.AsyncResult> {
    return new Promise<Office.AsyncResult>((resolve, reject) => {
      Office.context.document.bindings.getByIdAsync(ccid, (result: Office.AsyncResult) => {
        resolve(result);
      });
    });
  }

  /**
   * Gibt die Selektion im aktuellen Document als Range zurück.
   */
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

  /**
   * Versteckt einen Range, indem der Textstyle auf unsichtbar gesetzt wird.
   */
  async hideRange(range: Word.Range): Promise<void> {
    return Word.run(range, context => {
      const ooxml = range.getOoxml();

      return context.sync().then(() => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(ooxml.value, 'application/xml');
        const body = doc.getElementsByTagName('w:body').item(0);
        const children = Array.from(body.childNodes).filter(it => ['w:sdt', 'w:p', 'w:tbl'].indexOf(it.nodeName) !== -1);

        children.map(it => {
          switch (it.nodeName) {
            case 'w:sdt': {
              this.hideSdt(it);
              break;
            }
            case 'w:p': {
              this.hideP(it);
              break;
            }
            case 'w:tbl': {
              this.hideTbl(it);
              break;
            }
            default: break;
          }
        });

        const ser = new XMLSerializer();
        const xml = ser.serializeToString(doc);

        return Promise.resolve(xml);
      }).then(xml => {
        range.insertOoxml(xml, Word.InsertLocation.replace);

        return context.sync().then(() => Promise.resolve());
      });
    });
  }

  /**
   * Macht einen Range sichtbar, der mit hideRange versteckt wurde.
   */
  async unhideRange(range: Word.Range): Promise<void> {
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
        range.insertOoxml(xml, Word.InsertLocation.replace);

        return context.sync().then(() => Promise.resolve());
      });
    });
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

  private getDocument(context: Word.RequestContext): Word.Document | Word.DocumentCreated {
    let doc: Word.Document | Word.DocumentCreated;
    if (this.document) {
      doc = this.document;
    } else {
      doc = context.document;
    }

    return doc;
  }

  private getDataFromBinding = (bind: Office.Binding): Promise<any> => {
    return new Promise<void>((resolve, reject) => {
      bind.getDataAsync((result: Office.AsyncResult) => {
        if (result.status === Office.AsyncResultStatus.Succeeded) {
          resolve(result.value);
        } else {
          reject('Binding existiert nicht.');
        }
      });
    });
  }

  /**
   * Vertsteckt ein Content Control.
   * http://www.datypic.com/sc/ooxml/e-w_sdt-1.html
   */
  private hideSdt = (node: Node) => {
    const doc = node.ownerDocument;

    let res = this.findNode('./w:sdtPr', XPathResult.FIRST_ORDERED_NODE_TYPE, node);
    const sdtPtr = res.singleNodeValue;
    this.hideRPr(sdtPtr);

    res = this.findNode('./w:sdtContent/w:p', XPathResult.ORDERED_NODE_ITERATOR_TYPE, node);
    let n = res.iterateNext();
    while (n) {
      this.hideP(n);
      n = res.iterateNext();
    }

    res = this.findNode('./w:sdtContent/w:r', XPathResult.ORDERED_NODE_ITERATOR_TYPE, node);
    let r = res.iterateNext();
    while (r) {
      this.hideRPr(r);
      r = res.iterateNext();
    }
  }

  /**
   * Versteckt einen Paragraphen.
   * http://officeopenxml.com/WPparagraph.php 
   */
  private hideP = (node: Node) => {
    const doc = node.ownerDocument;

    let res = this.findNode('./w:pPr', XPathResult.FIRST_ORDERED_NODE_TYPE, node);
    const pPr = res.singleNodeValue;
    if (pPr) {
      this.hideRPr(pPr);
    }

    res = this.findNode('./w:r', XPathResult.ORDERED_NODE_ITERATOR_TYPE, node);
    let r = res.iterateNext();
    while (r) {
      this.hideRPr(r);
      r = res.iterateNext();
    }

    res = this.findNode('./w:sdt', XPathResult.ORDERED_NODE_ITERATOR_TYPE, node);
    let sdt = res.iterateNext();
    while (sdt) {
      this.hideSdt(sdt);
      sdt = res.iterateNext();
    }
  }

  /**
   * Run Properties für Text. Hier wird das w:vanish-Tag eingefügt.
   * http://officeopenxml.com/WPtext.php
   */
  private hideRPr = (node: Node) => {
    const doc = node.ownerDocument;
    const vanish = doc.createElementNS('http://schemas.openxmlformats.org/wordprocessingml/2006/main', 'w:vanish');

    const res = this.findNode('./w:rPr[not(w:vanish)]', XPathResult.FIRST_ORDERED_NODE_TYPE, node);
    let rPr = res.singleNodeValue;
    if (!rPr) {
      rPr = doc.createElementNS('http://schemas.openxmlformats.org/wordprocessingml/2006/main', 'w:rPr');
      node.insertBefore(rPr, node.firstChild);
    }
    rPr.appendChild(vanish);
  }

  /**
   * Versteckt eine Tabelle.
   * http://officeopenxml.com/WPtable.php
   */
  private hideTbl = (node: Node) => {
    const doc = node.ownerDocument;

    let res = this.findNode('./w:tr', XPathResult.ORDERED_NODE_ITERATOR_TYPE, node);
    let tr = res.iterateNext();
    while (tr) {
      this.hideTr(tr);
      tr = res.iterateNext();
    }

    res = this.findNode('.//*/w:p', XPathResult.ORDERED_NODE_ITERATOR_TYPE, node);
    let p = res.iterateNext();
    while (p) {
      this.hideP(p);
      p = res.iterateNext();
    }
  }

  /**
   * Versteckt eine Tabellenzeile.
   * http://officeopenxml.com/WPtableRow.php
   */
  private hideTr = (node: Node) => {
    const doc = node.ownerDocument;

    const res = this.findNode('./w:trPr[not(w:hidden)]', XPathResult.FIRST_ORDERED_NODE_TYPE, node);
    let trPr = res.singleNodeValue;

    if (!trPr) {
      trPr = doc.createElementNS('http://schemas.openxmlformats.org/wordprocessingml/2006/main', 'w:trPr');
      node.insertBefore(trPr, node.firstChild);
    }

    const hidden = doc.createElementNS('http://schemas.openxmlformats.org/wordprocessingml/2006/main', 'w:hidden');
    trPr.appendChild(hidden);
  }

  private findNode = (xpath: string, type: number, scope: Node) => {
    const doc = scope.ownerDocument;

    return doc.evaluate(xpath, scope, doc.createNSResolver(scope), type, undefined);
  }

  /**
   * Erzeugt ein Binding für ein benanntes Objekt. Für ein ContentControl
   * ist der Name der Titel.  
   */
  private addBindingFromNamedItem = async (name: string): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      Office.context.document.bindings.addFromNamedItemAsync(name, Office.BindingType.Text, (result: Office.AsyncResult) => {
        if (result.status === Office.AsyncResultStatus.Succeeded) {
          const bind: Office.Binding = result.value;
          resolve(bind.id);
        } else {
          reject(result.error.message);
        }
      });
    });
  }
}
