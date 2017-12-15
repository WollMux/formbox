import { Injectable } from '@angular/core';

@Injectable()
export class OfficeService {
  async insertDocument(base64: string, loc: string): Promise<{}> {
    return Word.run(context => {
      const body = context.document.body;
      body.insertFileFromBase64(base64, loc);
      return context.sync();
    });
  }
}
