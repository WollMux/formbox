import { Injectable } from '@angular/core';
import { Logger } from '@nsalaun/ng-logger';

@Injectable()
export class OfficeMockService {
  cmds = [
    { id: 0, cmd: '=insertFrag(\'Adresse_Angaben\')'.substr(1).trim() },
    { id: 1, cmd: '=insertFrag(\'Empfaengerfeld\')'.substr(1).trim() },
    { id: 100, cmd: '=insertFrag(\'Email\')'.substr(1).trim() }
  ];

  cmds1 = [
    { id: 0, cmd: '=insertFrag(\'Adresse_Angaben\')'.substr(1).trim() },
    { id: 1, cmd: '=insertFrag(\'Empfaengerfeld\')'.substr(1).trim() }
  ];

  cmds2 = [
    { id: 100, cmd: '=insertFrag(\'Email\')'.substr(1).trim() }
  ];

  constructor(private log: Logger) { }

  async openDocument(base64: string): Promise<void> {
    this.log.debug('OfficeMockService.openDocument');
  }

  async getFragmentNames(): Promise<string[]> {
    this.log.debug('OfficeMockService.getFragmentNames');

    return Promise.resolve([
      'Adresse_Angaben',
      'Email',
      'Empfaengerfeld',
      'Fensterzeile',
      'Fusszeile_Dateinname',
      'Fusszeile_Rahmen',
      'Hauptabteilung',
      'Logo',
      'Zusatz'
    ]);
  }

  async getDocumentCommands(): Promise<{ id: number, cmd: string }[]> {
    this.log.debug('OfficeMockService.getDocumentCommands');

    let ret;

    if (this.cmds1) {
      ret = this.cmds1.slice();
    }
    if (this.cmds2) {
      this.cmds1 = this.cmds2.slice();
      this.cmds2 = undefined;
    } else {
      this.cmds1 = undefined;
    }

    return Promise.resolve(ret);
  }

  async getNextDocumentCommand(): Promise<{ id: number, cmd: string }> {
    return Promise.resolve(this.cmds.pop());
  }

  async insertFragment(id: number, base64: string): Promise<void> {
    this.log.debug('OfficeMockService.insertFragment');

    return Promise.resolve();
  }

}
