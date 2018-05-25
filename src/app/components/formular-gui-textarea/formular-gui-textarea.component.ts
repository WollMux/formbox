import { Component, OnInit } from '@angular/core';
import { Textarea } from '../../data/forms/textarea';
import { Logger } from '@nsalaun/ng-logger';
import { FormularGuiBase } from '../formular-gui-base/formular-gui-base';

@Component({
  selector: 'app-formular-gui-textarea',
  templateUrl: './formular-gui-textarea.component.html',
  styleUrls: ['./formular-gui-textarea.component.css']
})
export class FormularGuiTextareaComponent extends FormularGuiBase<Textarea> {

  constructor(log: Logger) {
    super(log);
  }

}
