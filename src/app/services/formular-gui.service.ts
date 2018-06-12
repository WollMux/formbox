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

    async updateFormGuiValues(form: Form): Promise<Form> {
        form.controls.forEach(control => {
            if (control instanceof FormControl) {
                return this.office.getAllContentControls().then(cc => {
                    return cc.filter(it => it.tag === 'formgui').map(it => {
                        if (it.id === control.ccid) {
                            control.value = it.text;
                        }
                    });
                });
            };
        });

        return form;
    }

    async updateCCText(text: string, ccid: number): Promise<void> {
        return this.office.replaceTextInContentControl(ccid, text);
    }
}
