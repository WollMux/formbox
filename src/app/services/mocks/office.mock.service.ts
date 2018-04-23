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

    return Promise.resolve();
  }

  async showDocument(): Promise<void> {
    this.log.debug('OfficeMockService.showDocument');

    return Promise.resolve();
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
    this.log.debug('OfficeMockService.getNextDocumentCommand');

    return Promise.resolve(this.cmds.pop());
  }

  async insertContentControl(title: string, tag: string): Promise<number> {
    this.log.debug('OfficeMockService.insertContentControl');

    return Promise.resolve(0);
  }

  async updateContentControl(id: number, title: string, tag: string): Promise<void> {
    this.log.debug('OfficeMockService.updateContentControl');
  }

  async deleteContentControl(id: number): Promise<void> {
    this.log.debug('OfficeMockService.deleteContentControl');
  }

  async insertFragment(id: number, base64: string): Promise<void> {
    this.log.debug('OfficeMockService.insertFragment');

    return Promise.resolve();
  }

  async insertValue(id: number, value: string): Promise<void> {
    return Promise.resolve();
  }

  async addXml(xml: string): Promise<string> {
    return Promise.reject('Not implemented.');
  }

  async getXmlById(id: string): Promise<string> {
    return Promise.reject('Not implemented.');
  }

  async getXmlIdsByNamespace(ns: string): Promise<string[]> {
    return Promise.reject('Not implemented.');
  }

  async deleteXmlById(id: string): Promise<void> {
    return Promise.reject('Not implemented.');
  }

  async deleteXmlByNamespace(ns: string): Promise<void> {
    return Promise.reject('Not implemented.');
  }
}
