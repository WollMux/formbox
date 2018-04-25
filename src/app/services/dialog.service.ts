import { Injectable } from '@angular/core';
import { Logger } from '@nsalaun/ng-logger';
import { OfficeService } from './office.service';

/**
 * Service für Templates und Fragmente.
 */
@Injectable()
export class DialogService {

  constructor(private log: Logger, private office: OfficeService) {}

  async showDialog(url: string, height: number, width: number): Promise<void> {
      return this.office.displayDialog(url, height, width).then(res => {
          return res;
      });
  }
}
