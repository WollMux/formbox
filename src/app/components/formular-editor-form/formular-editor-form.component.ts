import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Form } from '../../data/forms/form';
import { Logger } from '@nsalaun/ng-logger';
import { FormularEditorBase } from '../formular-editor-base/formular-editor-base';

@Component({
  selector: 'app-formular-editor-form',
  templateUrl: './formular-editor-form.component.html',
  styleUrls: ['./formular-editor-form.component.css']
})
export class FormularEditorFormComponent extends FormularEditorBase<Form> implements OnInit {

  constructor(log: Logger) {
    super(log);
  }

  ngOnInit(): void {
    this.newControl = new Form(this.control);
  }

}
