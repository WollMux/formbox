import { Component, OnInit } from '@angular/core';
import { Label } from '../../data/forms/label';
import { Logger } from '@nsalaun/ng-logger';
import { FormularGuiBase } from '../formular-gui-base/formular-gui-base';

@Component({
  selector: 'app-formular-gui-label',
  templateUrl: './formular-gui-label.component.html',
  styleUrls: ['./formular-gui-label.component.css']
})
export class FormularGuiLabelComponent extends FormularGuiBase<Label> {

  constructor(log: Logger) {
    super(log);
  }

}
