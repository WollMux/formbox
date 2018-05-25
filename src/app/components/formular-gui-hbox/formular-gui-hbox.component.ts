import { Component, Input, OnInit } from '@angular/core';
import { Hbox } from '../../data/forms/hbox';
import { FormularGuiBase } from '../formular-gui-base/formular-gui-base';
import { Logger } from '@nsalaun/ng-logger';
import { Control } from '../../data/forms/control';

@Component({
  selector: 'app-formular-gui-hbox',
  templateUrl: './formular-gui-hbox.component.html',
  styleUrls: ['./formular-gui-hbox.component.css']
})
export class FormularGuiHboxComponent extends FormularGuiBase<Hbox> {

  constructor(log: Logger) {
    super(log);
  }
}
