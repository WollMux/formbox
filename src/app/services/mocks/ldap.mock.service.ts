import { Injectable } from '@angular/core';
import { Logger } from '@nsalaun/ng-logger';
import { LDAPFilter } from '../ldap.service';

@Injectable()
export class LDAPMockService {

  private formboxapi: string;

  constructor(private log: Logger) {  }

  search(filter: LDAPFilter): Promise<any[]> {
    return Promise.resolve([{uid: 'max.mustermann', vorname: 'max', nachname: 'mustermann'}]);
  }

}
