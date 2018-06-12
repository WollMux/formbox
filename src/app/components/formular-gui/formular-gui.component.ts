import { select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Form } from '../../data/forms/form';
import { FormXmlParserService } from '../../services/form-xml-parser.service';
import { TemplateActions } from '../../store/actions/template-actions';
import { FormularGuiActions } from '../../store/actions/formular-gui-actions';

@Component({
  selector: 'app-formular-gui',
  templateUrl: './formular-gui.component.html',
  styleUrls: ['./formular-gui.component.css']
})
export class FormularGuiComponent implements OnInit {
  @select(['formularEditor', 'form']) form: Observable<Form>;

  ngOnInit(): void {
    this.formularGuiActions.fillValues();
  }

  constructor(private formularGuiActions: FormularGuiActions) { }
}
