import { Component } from '@angular/core';
import { Logger } from '@nsalaun/ng-logger';

import { Button } from '../../data/forms/button';
import { FormularGuiBase } from '../formular-gui-base/formular-gui-base';

@Component({
  selector: 'app-formular-gui-button',
  templateUrl: './formular-gui-button.component.html',
  styleUrls: ['./formular-gui-button.component.css']
})
export class FormularGuiButtonComponent extends FormularGuiBase<Button> {

  constructor(log: Logger) {
    super(log);
   }
}
