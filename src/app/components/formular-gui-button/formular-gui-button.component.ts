import { Component, Input, OnInit } from '@angular/core';
import { Button } from '../../data/forms/button';
import { FormularGuiBase } from '../formular-gui-base/formular-gui-base';
import { Logger } from '@nsalaun/ng-logger';

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
