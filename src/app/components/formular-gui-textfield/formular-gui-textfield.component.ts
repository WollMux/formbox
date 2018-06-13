import { Component } from '@angular/core';
import { Logger } from '@nsalaun/ng-logger';

import { Textfield } from '../../data/forms/textfield';
import { FormularGuiBase } from '../formular-gui-base/formular-gui-base';
import { FormularGuiActions } from '../../store/actions/formular-gui-actions';

@Component({
  selector: 'app-formular-gui-textfield',
  templateUrl: './formular-gui-textfield.component.html',
  styleUrls: ['./formular-gui-textfield.component.css']
})
export class FormularGuiTextfieldComponent extends FormularGuiBase<Textfield> {

  constructor(private log: Logger, private formGuiActions: FormularGuiActions) {
    super();
  }

  onModelChange(text, ccid): void {
    this.formGuiActions.updateContentControlText(text, ccid);
  }

}
