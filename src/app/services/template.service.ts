import { Injectable } from '@angular/core';
import { Http, Response, ResponseContentType, URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';
import { OfficeService } from './office.service';

/**
 * Service für Templates und Fragmente.
 */
@Injectable()
export class TemplateService {
  private chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

  private formboxapi: string;

  constructor(private http: Http, private office: OfficeService) {
    this.formboxapi = environment.formboxapi;
  }

  /**
   * Gibt die Url zurück, über die das Template vom Server geladen werden kann.
   * 
   * @param name Name des Templates
   */
  async getTemplateUrl(name: string): Promise<any> {
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
  async getFragmentUrls(): Promise<{ name: string, url: string }[]> {
    return this.office.getFragmentNames().then(async names => {
      if (names.length === 0) {
        return undefined;
      }
      return Promise.all(names.map(name => {
        return this.getFragmentUrl(name);
      }));
    });
  }

  /**
   * Gibt die Url eines Fragments zurück.
   * 
   * @param name Name des Fragments.
   */
  async getFragmentUrl(name: string): Promise<{ name: string, url: string }> {
    return await this.http.get(`${this.formboxapi}/config/fragmente/${name}`, { responseType: ResponseContentType.Json })
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
    return await this.http.get(`${this.formboxapi}/${url}`, { responseType: ResponseContentType.ArrayBuffer })
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
    await this.office.openDocument(base64);
  }

  /**
   * Lädt ein Fragment über eine Url und fügt es in das aktuelle Dokument ein.
   * 
   * @param name Name des Fragments
   * @param url Url des Fragments
   */
  async insertFragment(name: string, url: string): Promise<void> {
    await this.getFileAsBase64(url).then(async s => {
      await this.office.insertFragment(name, s);
    });
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
      base64 += this.chars[ bytes[ i ] >> 2 ];
      base64 += this.chars[ ((bytes[ i ] & 3) << 4) | (bytes[ i + 1 ] >> 4) ];
      base64 += this.chars[ ((bytes[ i + 1 ] & 15) << 2) | (bytes[ i + 2 ] >> 6) ];
      base64 += this.chars[ bytes[ i + 2 ] & 63 ];
    }

    if ((len % 3) === 2) {
      base64 = base64.substring(0, base64.length - 1) + '=';
    } else if (len % 3 === 1) {
      base64 = base64.substring(0, base64.length - 2) + '==';
    }

    return base64;
  }

}
