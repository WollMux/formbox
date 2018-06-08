import { Component } from '@angular/core';
import { Logger } from '@nsalaun/ng-logger';

import { Textarea } from '../../data/forms/textarea';
import { FormularGuiBase } from '../formular-gui-base/formular-gui-base';
import { FormularGuiActions } from '../../store/actions/formular-gui-actions';

@Component({
  selector: 'app-formular-gui-textarea',
  templateUrl: './formular-gui-textarea.component.html',
  styleUrls: ['./formular-gui-textarea.component.css']
})
export class FormularGuiTextareaComponent extends FormularGuiBase<Textarea> {

  constructor(log: Logger, private formGuiActions: FormularGuiActions) {
    super(log);
  }

  onModelChange(text, ccid): void {
    this.formGuiActions.updateCCText(text, ccid);
  }

}
