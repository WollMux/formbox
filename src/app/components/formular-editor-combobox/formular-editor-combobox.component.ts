import { Component, OnInit } from '@angular/core';
import { FormularEditorBase } from '../formular-editor-base/formular-editor-base';
import { Combobox } from '../../data/forms/combobox';
import { Option } from '../../data/forms/option';
import { Logger } from '@nsalaun/ng-logger';

@Component({
  selector: 'app-formular-editor-combobox',
  templateUrl: './formular-editor-combobox.component.html',
  styleUrls: ['./formular-editor-combobox.component.css']
})
export class FormularEditorComboboxComponent extends FormularEditorBase<Combobox> implements OnInit {

  constructor(log: Logger) {
    super(log);
  }

  ngOnInit(): void {
    this.newControl = new Combobox(this.control);
  }

  deleteOption(id: number): void {
    this.newControl.options = this.newControl.options.filter((o, index) => index !== id);
  }

  addOption(): void {
    const option = new Option();
    option.id = Math.random().toString().slice(2);
    this.newControl.options.push(option);
  }

}
