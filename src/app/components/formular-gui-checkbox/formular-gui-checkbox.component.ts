import { Component } from '@angular/core';
import { Logger } from '@nsalaun/ng-logger';

import { Checkbox } from '../../data/forms/checkbox';
import { FormularGuiBase } from '../formular-gui-base/formular-gui-base';
import { FormularGuiActions } from '../../store/actions/formular-gui-actions';

@Component({
  selector: 'app-formular-gui-checkbox',
  templateUrl: './formular-gui-checkbox.component.html',
  styleUrls: ['./formular-gui-checkbox.component.css']
})
export class FormularGuiCheckboxComponent extends FormularGuiBase<Checkbox> {

  constructor(private log: Logger, private formGuiActions: FormularGuiActions) {
    super();
  }

  onModelChange(text, ccid): void {
    if (text) {
      text = '\u2611';
    } else {
      text = '\u2610';
    }

    this.formGuiActions.updateContentControlText(text, ccid);
  }

}
