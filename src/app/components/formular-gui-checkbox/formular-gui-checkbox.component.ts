import { Component, OnInit } from '@angular/core';
import { Checkbox } from '../../data/forms/checkbox';
import { FormularGuiBase } from '../formular-gui-base/formular-gui-base';
import { Logger } from '@nsalaun/ng-logger';

@Component({
  selector: 'app-formular-gui-checkbox',
  templateUrl: './formular-gui-checkbox.component.html',
  styleUrls: ['./formular-gui-checkbox.component.css']
})
export class FormularGuiCheckboxComponent extends FormularGuiBase<Checkbox> {

  constructor(log: Logger) {
    super(log);
  }

}
