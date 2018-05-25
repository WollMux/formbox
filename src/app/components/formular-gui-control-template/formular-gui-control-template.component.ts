import { Component, Input, OnInit } from '@angular/core';
import { Control } from '../../data/forms/control';

@Component({
  selector: 'app-formular-gui-control-template',
  templateUrl: './formular-gui-control-template.component.html',
  styleUrls: ['./formular-gui-control-template.component.css']
})
export class FormularGuiControlTemplateComponent {
  @Input() control: Control;
}
