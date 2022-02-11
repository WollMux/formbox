import { Component } from '@angular/core';
import { Logger } from '@nsalaun/ng-logger';

import { Hbox } from '../../data/forms/hbox';
import { FormularGuiBase } from '../formular-gui-base/formular-gui-base';

@Component({
  selector: 'app-formular-gui-hbox',
  templateUrl: './formular-gui-hbox.component.html',
  styleUrls: ['./formular-gui-hbox.component.css']
})
export class FormularGuiHboxComponent extends FormularGuiBase<Hbox> {

  constructor(private log: Logger) {
    super();
  }
}
