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

    async initBindings(form: Form): Promise<void> {
        return form.controls.forEach(cc => {
            if (cc instanceof FormControl) {
                const formControl = cc as FormControl;
                this.office.getBindingById(formControl.ccid.toString()).then((res: Office.AsyncResult) => {
                    if (res.status === Office.AsyncResultStatus.Failed) {
                        return this.office.addBindingFromNamedItem(formControl.id, formControl.ccid.toString()).then(bindingId => {
                            return this.office.addEventHandlerToBinding(bindingId, text => {
                                // Binding CC -> FormGui
                            }).then(result => {
                                return result;
                            });
                        });
                    }
                });
            }
        });
    }

    async updateFormGuiValues(form: Form): Promise<Form> {
        form.controls.forEach(control => {
            if (control instanceof FormControl) {
                return this.office.getContentControlText(control.ccid).then(cc => {
                    control.value = cc;
                });
            }
        });

        return form;
    }

    async updateCCText(text: string, ccid: number): Promise<void> {
        return this.office.setData(text, ccid.toString()).then(res => {
            return res;
        });
    }
}
