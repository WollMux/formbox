import { Component, Input, OnInit } from '@angular/core';
import { Button } from '../../data/forms/button';
import { Label } from '../../data/forms/label';
import { FormGroup } from '@angular/forms';
import { Textfield } from '../../data/forms/textfield';
import { Checkbox } from '../../data/forms/checkbox';
import { Textarea } from '../../data/forms/textarea';
import { Control } from '../../data/forms/control';
import { TabsModule } from 'ngx-tabs';
import { Tabs } from '../../data/forms/tabs';
import { Tab } from '../../data/forms/tab';
import { Hbox } from '../../data/forms/hbox';
import { Combobox } from '../../data/forms/combobox';
import { Separator } from '../../data/forms/separator';
import { TemplateActions } from '../../store/actions/template-actions';
import { FormXmlParserService } from '../../services/form-xml-parser.service';
import { Option } from '../../data/forms/option';
import { Form } from '../../data/forms/form';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

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
