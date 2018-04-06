import { Component, OnInit } from '@angular/core';
import { Textarea } from '../../data/forms/textarea';
import { FormularEditorBase } from '../formular-editor-base/formular-editor-base';
import { Logger } from '@nsalaun/ng-logger';

@Component({
  selector: 'app-formular-editor-textarea',
  templateUrl: './formular-editor-textarea.component.html',
  styleUrls: ['./formular-editor-textarea.component.css']
})
export class FormularEditorTextareaComponent extends FormularEditorBase<Textarea> implements OnInit {

  constructor(log: Logger) {
    super(log);
  }

  ngOnInit(): void {
    this.newControl = new Textarea(this.control);
  }

}
