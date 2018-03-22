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

  constructor(
    private office: OfficeService,
    private log: Logger
  ) { }

  /**
   * Löscht falls notwendig ein ContentControl in Word.
   * @param id Die Id des ContentControls, wenn hier keine angegeben wird, dann wird auch nichts gelöscht.
   */
  async deleteControl(id?: number): Promise<void> {
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
    let control: Control;
    switch (type) {
      case 'label':
        control = new Label();
        break;
      case 'button':
        control = new Button();
        break;
      case 'checkbox':
        control = new Checkbox();
        (control as FormControl).ccid = await this.createControl();
        break;
      case 'visibility':
        control = new Checkbox();
        (control as FormControl).ccid = undefined;
        break;
      case 'tabs':
        control = new Tabs();
        break;
      case 'tab':
        control = new Tab();
        break;
      case 'textarea':
        control = new Textarea();
        (control as FormControl).ccid = await this.createControl();
        break;
      case 'textfield':
        control = new Textfield();
        (control as FormControl).ccid = await this.createControl();
        break;
      case 'hbox':
        control = new Hbox();
        break;
      case 'combobox':
        control = new Combobox();
        (control as FormControl).ccid = await this.createControl();
        break;
      case 'separator':
        control = new Separator();
        break;
      default:
        this.log.error('Invalid Formtype');
        break;
    }
    if (control) {
      control.id = Math.random().toString().slice(2);
    }

    return Promise.resolve(control);
  }

  /**
   * Legt ein ContentControl in Word an.
   */
  private async createControl(): Promise<number> {
    return this.office.insertContentControl('', 'formbox');
  }

}
