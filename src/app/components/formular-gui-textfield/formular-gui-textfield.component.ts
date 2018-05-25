import { Component, OnInit } from '@angular/core';
import { Textfield } from '../../data/forms/textfield';
import { FormularGuiBase } from '../formular-gui-base/formular-gui-base';
import { Logger } from '@nsalaun/ng-logger';

@Component({
  selector: 'app-formular-gui-textfield',
  templateUrl: './formular-gui-textfield.component.html',
  styleUrls: ['./formular-gui-textfield.component.css']
})
export class FormularGuiTextfieldComponent extends FormularGuiBase<Textfield> {

  constructor(log: Logger) {
    super(log);
  }

}
