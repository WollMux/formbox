import { Component } from '@angular/core';
import { Logger } from '@nsalaun/ng-logger';

import { Separator } from '../../data/forms/separator';
import { FormularGuiBase } from '../formular-gui-base/formular-gui-base';

@Component({
  selector: 'app-formular-gui-seperator',
  templateUrl: './formular-gui-seperator.component.html',
  styleUrls: ['./formular-gui-seperator.component.css']
})
export class FormularGuiSeperatorComponent extends FormularGuiBase<Separator> {

  constructor(private log: Logger) {
    super();
  }

}
