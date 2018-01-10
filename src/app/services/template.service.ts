import { Injectable } from '@angular/core';
import { Http, Response, ResponseContentType, URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';
import { OfficeService } from './office.service';

@Injectable()
export class TemplateService {
  private chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

  private formboxapi: string;

  constructor(private http: Http, private office: OfficeService) {
    this.formboxapi = environment.formboxapi;
  }

  async getTemplateUrl(name: string): Promise<any> {
    return this.http.get(`${this.formboxapi}/config/vorlagen/${name}`, { responseType: ResponseContentType.Json })
      .toPromise()
      .then(res => {
        return res.json().path as string;
      });
  }

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

  async getFragmentUrl(name: string): Promise<{ name: string, url: string }> {
    return await this.http.get(`${this.formboxapi}/config/fragmente/${name}`, { responseType: ResponseContentType.Json })
      .toPromise()
      .then(res => {
        return { name: name, url: res.json().path as string };
      });
  }

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

  async openDocument(base64: string): Promise<void> {
    await this.office.insertDocument(base64, 'Replace');
  }

  async insertFragment(name: string, url: string): Promise<void> {
    await this.getFileAsBase64(url).then(async s => {
      await this.office.insertFragment(name, s);
    });
  }

  async insertFragments(): Promise<void> {
    await this.office.getFragmentNames().then(async names => {
      if (names.length === 0) {
        return;
      }
      await Promise.all(names.map(async name => {
        await this.getFragmentUrl(name).then(async url => {
          await this.getFileAsBase64(url.url).then(async s => {
            await this.office.insertFragment(name, s);
          });
        });
      })).then(async () => {
        await this.insertFragments();
      });
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
      base64 += this.chars[bytes[i] >> 2];
      base64 += this.chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
      base64 += this.chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
      base64 += this.chars[bytes[i + 2] & 63];
    }

    if ((len % 3) === 2) {
      base64 = base64.substring(0, base64.length - 1) + '=';
    } else if (len % 3 === 1) {
      base64 = base64.substring(0, base64.length - 2) + '==';
    }

    return base64;
  }

}
