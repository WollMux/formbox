import { Injectable } from '@angular/core';
import { Http, Response, ResponseContentType, URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';

/**
 * Schnittstelle zur LDAP-Komponente der FormBox-API.
 */
@Injectable()
export class LDAPService {

  /** URL der FormBox-API */
  private formboxapi: string;

  constructor(
    private http: Http
  ) {
    this.formboxapi = environment.formboxapi;
  }

  /**
   * Stellt eine Suchanfrage an die Komponente in der FormBox-API.
   *
   * @param filter: Der Suchfilter
   * @return Ein Array mit den Suchergebnissen.
   */
  search(filter: LDAPFilter): Promise<any[]> {
    return this.http.get(
      `${this.formboxapi}/db/ldap`,
      { params: filter, responseType: ResponseContentType.Json })
      .toPromise()
      .then(res => {
        return res.json() as any[];
      });
  }

}

/**
 * LDAP-Filter bei Anfragen. Siehe FormBox-API.
 */
export interface LDAPFilter {
  vorname: string;
  nachname: string;
  uid: string;
  ou: string;
}
