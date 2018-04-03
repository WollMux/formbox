import { Component, OnInit } from '@angular/core';
import { Checkbox } from '../../data/forms/checkbox';
import { FormularEditorBase } from '../formular-editor-base/formular-editor-base';
import { Logger } from '@nsalaun/ng-logger';

@Component({
  selector: 'app-formular-editor-checkbox',
  templateUrl: './formular-editor-checkbox.component.html',
  styleUrls: ['./formular-editor-checkbox.component.css']
})
export class FormularEditorCheckboxComponent extends FormularEditorBase<Checkbox> implements OnInit {

  constructor(log: Logger) {
    super(log);
  }

  ngOnInit(): void {
    this.newControl = new Checkbox(this.control);
  }

}
