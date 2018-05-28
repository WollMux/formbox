import { Component } from '@angular/core';
import { Logger } from '@nsalaun/ng-logger';

import { Tabs } from '../../data/forms/tabs';
import { FormularGuiBase } from '../formular-gui-base/formular-gui-base';

@Component({
  selector: 'app-formular-gui-tabs',
  templateUrl: './formular-gui-tabs.component.html',
  styleUrls: ['./formular-gui-tabs.component.css']
})
export class FormularGuiTabsComponent extends FormularGuiBase<Tabs> {

  constructor(log: Logger) {
    super(log);
  }
}
