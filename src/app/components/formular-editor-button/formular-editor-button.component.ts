import { Component, OnInit } from '@angular/core';
import { Button } from '../../data/forms/button';
import { FormularEditorBase } from '../formular-editor-base/formular-editor-base';
import { Logger } from '@nsalaun/ng-logger';

@Component({
  selector: 'app-formular-editor-button',
  templateUrl: './formular-editor-button.component.html',
  styleUrls: ['./formular-editor-button.component.css']
})
export class FormularEditorButtonComponent extends FormularEditorBase<Button> implements OnInit {

  constructor(log: Logger) {
    super(log);
  }

  ngOnInit(): void {
    this.newControl = new Button(this.control);
  }

}
