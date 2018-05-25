import { Component, OnInit } from '@angular/core';
import { Combobox } from '../../data/forms/combobox';
import { FormularGuiBase } from '../formular-gui-base/formular-gui-base';
import { Logger } from '@nsalaun/ng-logger';

@Component({
  selector: 'app-formular-gui-combobox',
  templateUrl: './formular-gui-combobox.component.html',
  styleUrls: ['./formular-gui-combobox.component.css']
})
export class FormularGuiComboboxComponent extends FormularGuiBase<Combobox> {

  constructor(log: Logger) {
    super(log);
  }

}
