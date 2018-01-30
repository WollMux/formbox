import { Injectable } from '@angular/core';
import { Http, Response, ResponseContentType, URLSearchParams } from '@angular/http';
import { Logger } from '@nsalaun/ng-logger';
import { environment } from '../../environments/environment';
import { OfficeService } from './office.service';

/**
 * Service für Templates und Fragmente.
 */
@Injectable()
export class TemplateService {
  private chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

  private formboxapi: string;

  constructor(private log: Logger, private http: Http, private office: OfficeService) {
    this.formboxapi = environment.formboxapi;
  }

  /**
   * Gibt die Url zurück, über die das Template vom Server geladen werden kann.
   * 
   * @param name Name des Templates
   */
  async getTemplateUrl(name: string): Promise<string> {
    return this.http.get(`${this.formboxapi}/config/vorlagen/${name}`, { responseType: ResponseContentType.Json })
      .toPromise()
      .then(res => {
        return res.json().path as string;
      });
  }

  /**
   * Gibt eine Liste von Namen und Urls für alle Fragmente im aktuellen
   * Dokument.
   */
  async getDocumentCommands(): Promise<{ id: number, cmd: string }[]> {
    return this.office.getDocumentCommands();
  }

  async getNextDocumentCommand(): Promise<{ id: number, cmd: string }> {
    this.log.debug('TemplateService.getNextDocumentCommand()');

    return this.office.getNextDocumentCommand();
  }

  /**
   * Gibt die Url eines Fragments zurück.
   * 
   * @param name Name des Fragments.
   */
  async getFragmentUrl(name: string): Promise<{ name: string, url: string }> {
    this.log.debug(`TemplateService.getFragmentUrl(${name})`);

    return this.http.get(`${this.formboxapi}/config/fragmente/${name}`, { responseType: ResponseContentType.Json })
      .toPromise()
      .then(res => {
        return { name: name, url: res.json().path as string };
      });
  }

  /**
   * Lädt eine Datei über eine Url und gibt den Inhalt als Base64-String
   * zurück.
   * 
   * @param url Url der Datei
   */
  async getFileAsBase64(url: string): Promise<string> {
    this.log.debug(`TemplateService.getFileAsBase64(${url})`);

    return this.http.get(`${this.formboxapi}/${url}`, { responseType: ResponseContentType.ArrayBuffer })
      .toPromise()
      .then(res => {
        return this.encode(res.arrayBuffer());
      })
      .catch(error => {
        return undefined;
      });
  }

  /**
   * Öffnet ein Dokument in Office.
   */
  async openDocument(base64: string): Promise<void> {
    this.log.debug('TemplateService.openDocument(...)');

    await this.office.openDocument(base64);
  }

  /**
   * Lädt ein Fragment über eine Url und fügt es in das aktuelle Dokument ein.
   * 
   * @param name Name des Fragments
   * @param url Url des Fragments
   */
  async insertFragment(id: number, url: string): Promise<void> {
    this.log.debug(`TemplateService.insertFragment(${id}, ${url})`);

    await this.getFileAsBase64(url).then(async s => {
      await this.office.insertFragment(id, s);
    });
  }

  async insertValue(id: number, value: string): Promise<void> {
    this.log.debug(`TemplateService.insertValue(${id}, ${value})`);

    await this.office.insertValue(id, value);
  }

  /**
   * Codiert ein Byte-Array als Base64.
   *
   * @param arraybuffer Array, das codiert werden soll.
   */
  private encode(arraybuffer): string {
    const bytes = new Uint8Array(arraybuffer);
    const len = bytes.length;
    let base64 = '';

    for (let i = 0; i < len; i += 3) {
      base64 += this.chars[bytes[i] >> 2];
      base64 += this.chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
      base64 += this.chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
      base64 += this.chars[bytes[i + 2] & 63];
    }

    if ((len % 3) === 2) {
      base64 = base64.substring(0, base64.length - 1) + '=';  // tslint:disable-line: prefer-template
    } else if (len % 3 === 1) {
      base64 = base64.substring(0, base64.length - 2) + '==';  // tslint:disable-line: prefer-template
    }

    return base64;
  }

}
