import { Component, OnInit } from '@angular/core';
import { FormularGuiBase } from '../formular-gui-base/formular-gui-base';
import { Separator } from '../../data/forms/separator';
import { Logger } from '@nsalaun/ng-logger';

@Component({
  selector: 'app-formular-gui-seperator',
  templateUrl: './formular-gui-seperator.component.html',
  styleUrls: ['./formular-gui-seperator.component.css']
})
export class FormularGuiSeperatorComponent extends FormularGuiBase<Separator> {

  constructor(log: Logger) {
    super(log);
  }

}
