import { Injectable } from '@angular/core';

@Injectable()
export class TemplateMockService {

  constructor() { /* Leer */ }

  async getTemplateUrl(name: string): Promise<string> {
    return Promise.resolve('');
  }

  async getFragmentUrls(): Promise<{ name: string, url: string }[]> {
    return Promise.resolve([
      { name: 'frag1', url: 'frag1.docx' },
      { name: 'frag2', url: 'frag2.docx' },
      { name: 'frag3', url: 'frag3.docx' }]);
  }

  async getFragmentUrl(name: string): Promise<{ name: string, url: string }> {
    return { name: 'Fragment', url: 'url' };
  }

  async getFileAsBase64(url: string): Promise<string> {
    return undefined;
  }

  async openDocument(base64: string): Promise<void> {
    return undefined;
  }

  async getNextDocumentCommand(): Promise<{ id: number, cmd: string }> {
    return undefined;
  }

  async insertValue(id: number, value: string): Promise<void> {
    return Promise.resolve();
  }

  async insertFragment(id: number, url: string): Promise<void> {
    return Promise.resolve();
  }

  async getFragmentNames(): Promise<string[]> {
    return Promise.resolve(['Eins', 'Zwei', 'Drei']);
  }

  async getDocumentCommands(): Promise<{ id: number, tag: string, cmd: string }[]> {
    return Promise.resolve([{ id: 1, tag: '1', cmd: "insertFrag('fragment')" }]);
  }

  async createDocumentCommand(cmd: string, order: number): Promise<number> {
    return Promise.resolve(1);
  }

  async updateDocumentCommand(id: number, cmd: string, order: number): Promise<void> {
    return Promise.resolve();
  }

  async deleteDocumentCommand(id: number): Promise<void> {
    return Promise.resolve();
  }
}
