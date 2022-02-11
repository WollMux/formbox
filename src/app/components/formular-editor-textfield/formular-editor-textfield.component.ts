import { Component, OnInit } from '@angular/core';
import { Textfield } from '../../data/forms/textfield';
import { FormularEditorBase } from '../formular-editor-base/formular-editor-base';
import { Logger } from '@nsalaun/ng-logger';

@Component({
  selector: 'app-formular-editor-textfield',
  templateUrl: './formular-editor-textfield.component.html',
  styleUrls: ['./formular-editor-textfield.component.css']
})
export class FormularEditorTextfieldComponent extends FormularEditorBase<Textfield> implements OnInit {

  constructor(log: Logger) {
    super(log);
  }

  ngOnInit(): void {
    this.newControl = new Textfield(this.control);
  }

}
