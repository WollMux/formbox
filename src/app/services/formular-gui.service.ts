import { Injectable } from '@angular/core';
import { OfficeService } from './office.service';
import { FormControl } from '../data/forms/form-control';
import { Form } from '../data/forms/form';
import { Observable } from 'rxjs/Observable';
import { Logger } from '@nsalaun/ng-logger';
import { Control } from '../data/forms/control';

/**
 * Service für die Formular-GUI.
 */
@Injectable()
export class FormularGuiService {

    constructor(
        private office: OfficeService,
        private log: Logger
    ) { }

    async updateFormGuiValues(form: Form): Promise<void> {
       return Promise.all(
        form.controls.map(control => {
            if (control instanceof FormControl) {
                return this.office.getContentControlText(control.ccid).then(text => {
                    control.value = text;
                });
            }
        })).then(() => Promise.resolve());
    }

    async updateCCText(text: string, ccid: number): Promise<void> {
        return this.office.replaceTextInContentControl(ccid, text);
    }
}
