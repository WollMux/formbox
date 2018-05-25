import { Component, OnInit } from '@angular/core';
import { Tabs } from '../../data/forms/tabs';
import { FormularGuiBase } from '../formular-gui-base/formular-gui-base';
import { Logger } from '@nsalaun/ng-logger';

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
