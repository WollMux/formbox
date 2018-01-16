import { Injectable } from '@angular/core';

@Injectable()
export class TemplateMockService {

  constructor() { }

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
    return undefined;
  }

  async getFileAsBase64(url: string): Promise<string> {
    return undefined;
  }

  async openDocument(base64: string): Promise<void> {
    return undefined;
  }

  async insertFragment(name: string, url: string): Promise<void> {
    return undefined;
  }
}
