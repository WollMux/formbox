import { Component,  OnInit } from '@angular/core';
import { Label } from '../../data/forms/label';
import { FormularEditorBase } from '../formular-editor-base/formular-editor-base';
import { Logger } from '@nsalaun/ng-logger';

@Component({
  selector: 'app-formular-editor-label',
  templateUrl: './formular-editor-label.component.html',
  styleUrls: ['./formular-editor-label.component.css']
})
export class FormularEditorLabelComponent extends FormularEditorBase<Label> implements OnInit {

  constructor(log: Logger) {
    super(log);
  }

  ngOnInit(): void {
    this.newControl = new Label(this.control);
  }

}
