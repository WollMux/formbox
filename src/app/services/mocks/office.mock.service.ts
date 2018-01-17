import { Injectable } from '@angular/core';
import { Logger } from '@nsalaun/ng-logger';

@Injectable()
export class OfficeMockService {

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

  async insertFragment(name: string, base64: string): Promise<void> {
    this.log.debug('OfficeMockService.insertFragment');
  }

}
