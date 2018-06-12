import { Injectable } from '@angular/core';
import { OfficeService } from './office.service';
import { Control } from '../data/forms/control';
import { Button } from '../data/forms/button';
import { Checkbox } from '../data/forms/checkbox';
import { Tab } from '../data/forms/tab';
import { Textarea } from '../data/forms/textarea';
import { Textfield } from '../data/forms/textfield';
import { Hbox } from '../data/forms/hbox';
import { Combobox } from '../data/forms/combobox';
import { Separator } from '../data/forms/separator';
import { Tabs } from '../data/forms/tabs';
import { Label } from '../data/forms/label';
import { Form } from '../data/forms/form';
import { Logger } from '@nsalaun/ng-logger';
import { FormControl } from '../data/forms/form-control';

/**
 * Service für den Formular-Editor.
 */
@Injectable()
export class FormularEditorService {

  private types: Map<string, {prototype: any, cc: boolean}> = new Map([
    ['label', {prototype: new Label(), cc: false}],
    ['button', {prototype: Button.prototype, cc: false}],
    ['checkbox', {prototype: Checkbox.prototype, cc: true}],
    ['visibility', {prototype: Checkbox.prototype, cc: false}],
    ['tabs', {prototype: Tabs.prototype, cc: false}],
    ['tab', {prototype: Tab.prototype, cc: false}],
    ['textarea', {prototype: Textarea.prototype, cc: true}],
    ['textfield', {prototype: Textfield.prototype, cc: true}],
    ['hbox', {prototype: Hbox.prototype, cc: false}],
    ['combobox', {prototype: Combobox.prototype, cc: true}],
    ['separator', {prototype: Separator.prototype, cc: false}]
  ]);

  constructor(
    private office: OfficeService,
    private log: Logger
  ) { }

  /**
   * Löscht falls notwendig ein ContentControl in Word.
   * @param id Die Id des ContentControls, wenn id undefined oder 0 ist wird das ContentControl nicht gelöscht.
   */
  async deleteControl(id: number): Promise<void> {
    if (id) {
      return this.office.deleteContentControl(id);
    } else {
      return Promise.resolve();
    }
  }

  /**
   * Legt ein neues Formular an. Vorsicht es ist noch nicht gespeichert.
   */
  createEmptyForm(): Form {
    const form = new Form();
    form.title = 'Neues Formular';
    form.id = Math.random().toString().slice(2);

    return form;
  }

  /**
   * Legt ein Control im Formular an. Für die Typen Checkbox, Combobox, Textfeld und Textarea wird ein ContentControl in Word angelegt.
   * @param type Der Type des Controls, z.B. textfeld, label oder button.
   */
  async createFormControl(type: string): Promise<Control> {
    const desc = this.types.get(type);
    if (desc) {
      const control = desc.prototype.constructor();
      control.id = Math.random().toString().slice(2);
      if (desc.cc) {
        return this.createControl().then(ccid => {
          (control as FormControl).ccid = ccid;

          return Promise.resolve(control);
        });
      }

      return Promise.resolve(control);
    }

    return Promise.resolve(undefined);
  }

  /**
   * Legt ein ContentControl in Word an.
   */
  private async createControl(): Promise<number> {
    return this.office.insertContentControl('', 'formgui',undefined, undefined, true, true);
  }

}
