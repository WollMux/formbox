import { select } from '@angular-redux/store';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Form } from '../../data/forms/form';
import { FormXmlParserService } from '../../services/form-xml-parser.service';
import { TemplateActions } from '../../store/actions/template-actions';

@Component({
  selector: 'app-formular-gui',
  templateUrl: './formular-gui.component.html',
  styleUrls: ['./formular-gui.component.css']
})
export class FormularGuiComponent {
  @select(['formularEditor', 'form']) form: Observable<Form>;

  onModelChange(val, id): void {
    // id = id ContentControl
    // this.templateActions.insertValue(val, id);
  }

  constructor(
    private templateActions: TemplateActions,
    private xmlParser: FormXmlParserService) {
  }
}
