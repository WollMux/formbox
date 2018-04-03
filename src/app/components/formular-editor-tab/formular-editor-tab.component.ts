import { Component, OnInit } from '@angular/core';
import { Tab } from '../../data/forms/tab';
import { FormularEditorBase } from '../formular-editor-base/formular-editor-base';
import { Logger } from '@nsalaun/ng-logger';

@Component({
  selector: 'app-formular-editor-tab',
  templateUrl: './formular-editor-tab.component.html',
  styleUrls: ['./formular-editor-tab.component.css']
})
export class FormularEditorTabComponent extends FormularEditorBase<Tab> implements OnInit {

  constructor(log: Logger) {
    super(log);
  }

  ngOnInit(): void {
    this.newControl = new Tab(this.control);
  }

}
