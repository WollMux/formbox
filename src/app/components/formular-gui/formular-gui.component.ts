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

@Component({
  selector: 'app-formular-gui',
  templateUrl: './formular-gui.component.html',
  styleUrls: ['./formular-gui.component.css']
})
export class FormularGuiComponent implements OnInit {

  @Input() formModels: Control[] = [];

  sampleXML = `<?xml version='1.0' encoding='utf-8' ?>
  <!DOCTYPE xml>
  <form
    xmlns='http://www.muenchen.de/formbox/forms'
    xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance'
    xsi:schemaLocation='http://www.muenchen.de/formbox/forms http://www.muenchen.de/formbox/form.xsd'>
    <title>Title</title>
    <controls>
      <label>
        <id>Label1</id>
        <title>Label 1</title>
      </label>
      <label>
        <id>Label2</id>
        <title>Label 2</title>
      </label>
      <tabs>
        <id>tab1</id>
        <pages>
          <tab>
            <title>Tab 1</title>
            <tooltip></tooltip>
            <controls>
              <combobox>
                  <id>checkbox1</id>
                  <title>Checkbox 1</title>
                  <editable>true</editable>
                  <option>
                  <id>cbid1</id>
                    <value>Item1</value>
                  </option>
                  <option>
                  <id>cbid2</id>
                    <value>Item2</value>
                  </option>
                  <option>
                  <id>cbid3</id>
                    <value>Item3</value>
                  </option>
                  <option>
                  <id>cbid4</id>
                    <value>Item4</value>
                  </option>
              </combobox>
              <label>
                <id>label1</id>
                <title>Label1</title>
              </label>
              <textfield>
                <id>textfeld1</id>
                <title>Eingabefeld</title>
                <tip></tip>
                <readonly>false</readonly>
                <autofill>Text</autofill>
              </textfield>
            </controls>
          </tab>
          <tab>
            <title>Tab 2</title>
            <controls>
              <checkbox>
                <id>checkbox1</id>
                <title>Checkbox 1</title>
              </checkbox>
              <checkbox>
                <id>checkbox2</id>
                <title>Checkbox 1</title>
              </checkbox>
              <separator>
                <id>separator1</id>
              </separator>
              <hbox>
                <id>hbox1</id>
                <controls>
                  <button>
                    <id>button1</id>
                    <title>Button 1</title>
                    <action>openTemplate</action>
                    <value>fragId</value>
                  </button>
                  <button>
                    <id>button2</id>
                    <title>Button 2</title>
                    <action>openExt</action>
                    <value>explorer.exe</value>
                    <disabled>true</disabled>
                  </button>
                </controls>
              </hbox>
            </controls>
          </tab>
        </pages>
      </tabs>
    </controls>
  </form>`;

  form: Form;

  onModelChange(val, id): void {
    // id = id ContentControl
    // this.templateActions.insertValue(val, id);
  }

  constructor(
    private templateActions: TemplateActions,
    private xmlParser: FormXmlParserService) {
  }

  /**
   * Hinweis: Ich habe die Verwendung von Form noch offen gelassen da
   * man evtl. in html keine <form> bräuchte, würde egeintlich nur Sinn machen wenn es ein submit button gibt der alle Werte
   * der controls einer form-group submitted (use-case für form-gui?).
   * So wie es jetzt gebaut ist würde das Binding über ngModel
   * (onModelChange event mit parameter {id des content Controls,
   * wird beim anlegen des ContentControls durch Formular-Editor in XML gespeichert})
   * das entsprechende ContentControl füllen.
   * 2-way-binding von customxml -> ContentControl und binding Html -> angular model sind zwei verschiedene Technologien, daher der
   * Weg über onModelChange mit id des ContentControls zum befüllen.
   * Wenn der User Text im Contentcontrol ändert müsste sich das entsprechende Control der formular-gui ebenfalls aktualisieren,
   * das ließe sich dann über die bindung/reagieren bei contentcontrol -> customxml realisieren.
   * Die Änderung zu <form> wäre aber nicht aufwendig falls doch form notwendig (https://angular.io/guide/dynamic-form).
   */
  ngOnInit(): void {
    this.form = this.xmlParser.parse(this.sampleXML);

    /* Mock */
    const btn1 = new Button();
    btn1.id = 'btn1';
    btn1.title = 'BTN1';
    btn1.value = 'BTN1VALUE';

    const btn2 = new Button();
    btn2.id = 'btn2';
    btn2.title = 'BTN2';
    btn2.value = 'BTN2VALUE';

    const textField = new Textfield();
    textField.id = 'textfield';
    textField.title = 'textfield sample';
    textField.value = 'test textfield';

    const testLabel = new Label();
    testLabel.id = 'label';
    testLabel.title = 'TestLabel';

    const testCheckBox = new Checkbox();
    testCheckBox.id = 'checkbox';
    testCheckBox.title = 'Test Checkbox';
    testCheckBox.value = 'Checkbox Value';

    const testTextArea = new Textarea();
    testTextArea.id = 'textarea';
    testTextArea.title = 'Textarea';
    testTextArea.lines = 2;
    testTextArea.value = 'Textarea';

    const testComboBox = new Combobox();
    testComboBox.id = 'combobox';
    testComboBox.title = 'test combobox';
    testComboBox.value = 'ComboBox';
    const option1 = new Option();
    option1.id = 'option1';
    option1.value = 'Item 1';
    const option2 = new Option();
    option2.id = 'option2';
    option2.value = 'Item 2';
    testComboBox.options = [option1, option2];

    const testComboBox2 = new Combobox();
    testComboBox2.id = 'combobox2';
    testComboBox2.title = 'test combobox 2';
    testComboBox2.value = 'ComboBox 2';
    const option21 = new Option();
    option21.id = 'option21';
    option21.value = 'Item 21';
    const option22 = new Option();
    option22.id = 'option22';
    option22.value = 'Item 22';
    testComboBox2.options = [option21, option22];

    const testComboBox3 = new Combobox();
    testComboBox3.id = 'combobox3';
    testComboBox3.title = 'test combobox 3';
    testComboBox3.value = 'ComboBox 3';
    const option31 = new Option();
    option31.id = 'option31';
    option31.value = 'Item 31';
    const option32 = new Option();
    option32.id = 'option32';
    option32.value = 'Item 32';
    testComboBox3.options = [option31, option32];

    const tabset = new Tabs();
    const tab1 = new Tab();
    tab1.title = 'Tab1';
    tab1.controls = [btn1, testTextArea, btn2];
    const tab2 = new Tab();
    tab2.title = 'Tab2';
    tab2.controls = [testCheckBox, textField];
    const tab3 = new Tab();
    tab3.title = 'Tab3';
    tab3.controls = [testCheckBox, testComboBox2];
    tabset.controls = [tab1, tab2, tab3];

    const seperator = new Separator();
    seperator.id = 'separator';

    const testhbox = new Hbox();
    testhbox.controls = [btn1, btn2, testComboBox3, testTextArea];

    this.formModels = new Array<Control>();
    //this.formModels = [btn1, btn2, testComboBox, textField, testLabel, testCheckBox, testTextArea, seperator, tabset, testhbox];
  }
}
