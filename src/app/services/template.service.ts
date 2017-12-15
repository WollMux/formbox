import { Injectable } from '@angular/core';
import { Http, Response, ResponseContentType, URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class TemplateService {
  private chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

  private formboxapi: string;

  constructor(private http: Http) {
    this.formboxapi = environment.formboxapi;
  }

  async getTemplateUrl(name: string): Promise<any> {
    const params: URLSearchParams = new URLSearchParams();
    params.set('name', name);
    // tslint:disable-next-line:object-literal-shorthand
    return this.http.get(`${this.formboxapi}/config/vorlagen`, { responseType: ResponseContentType.Json, params: params })
      .toPromise()
      .then(res => {
        return res.json().path as string;
      });
  }

  async getFragmentUrl(name: string): Promise<string> {
    const params: URLSearchParams = new URLSearchParams();
    params.set('name', name);
    // tslint:disable-next-line:object-literal-shorthand
    return this.http.get(`${this.formboxapi}/config/fragmente`, { responseType: ResponseContentType.Json, params: params })
      .toPromise()
      .then(res => {
        return res.json().path as string;
      });
  }

  async getFileAsBase64(url: string): Promise<string> {
    return this.http.get(`${this.formboxapi}/${url}`, { responseType: ResponseContentType.ArrayBuffer })
      .toPromise()
      .then(res => {
        return this.encode(res.arrayBuffer());
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
