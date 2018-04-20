import { Form } from '../../../src/app/data/forms/form';
import { Button } from '../../../src/app/data/forms/button';
import { Checkbox } from '../../../src/app/data/forms/checkbox';
import { Hbox } from '../../../src/app/data/forms/hbox';
import { Label } from '../../../src/app/data/forms/label';
import { Separator } from '../../../src/app/data/forms/separator';
import { Tabs } from '../../../src/app/data/forms/tabs';
import { Tab } from '../../../src/app/data/forms/tab';
import { Textarea } from '../../../src/app/data/forms/textarea';
import { Textfield } from '../../../src/app/data/forms/textfield';
import { Combobox } from '../../../src/app/data/forms/combobox';
import { Option } from '../../../src/app/data/forms/option';

describe('Formdata XML', () => {
  it('writing Form as XML', () => {
    const f = new Form();
    f.title = 'Form 1';
    f.id = 'myForm';

    expect(f.toXml()).toEqual('<form xmlns="http://www.muenchen.de/formbox/forms" ' +
      'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" '
      + 'xsi:schemaLocation="http://www.muenchen.de/formbox/forms http://www.muenchen.de/formbox/form.xsd">' +
      '<id>myForm</id><controls></controls><title>Form 1</title></form>');
    expect(new Form(f)).toEqual(f);
  });

  it('writing Button as XML', () => {
    const b = new Button();
    b.id = 'button1';
    b.title = 'Button 1';
    b.action = 'Action';
    b.value = 'Value';

    expect(b.toXml()).toEqual('<button><id>button1</id><title>Button 1</title><action>Action</action><value>Value</value></button>');
    expect(new Button(b)).toEqual(b);
  });

  it('writing Checkbox as XML', () => {
    const cb = new Checkbox();
    cb.id = 'checkbox1';
    cb.title = 'CheckBox 1';
    cb.ccid = 1;

    expect(cb.toXml()).toEqual('<checkbox><id>checkbox1</id><title>CheckBox 1</title><ccid>1</ccid></checkbox>');
    expect(new Checkbox(cb)).toEqual(cb);
  });

  it('writing HBox as XML', () => {
    const hb = new Hbox();
    hb.id = 'hbox1';

    expect(hb.toXml()).toEqual('<hbox><id>hbox1</id><controls></controls></hbox>');
    expect(new Hbox(hb)).toEqual(hb);
  });

  it('writing Label as XML', () => {
    const lb = new Label();
    lb.id = 'label1';
    lb.title = 'Label 1';

    expect(lb.toXml()).toEqual('<label><id>label1</id><title>Label 1</title></label>');
    expect(new Label(lb)).toEqual(lb);
  });

  it('writing Separator as XML', () => {
    const sp = new Separator();
    sp.id = 'separator1';

    expect(sp.toXml()).toEqual('<separator><id>separator1</id></separator>');
    expect(new Separator(sp)).toEqual(sp);
  });

  it('writing Tabs as XML', () => {
    const tb = new Tabs();
    tb.id = 'tabs1';

    expect(tb.toXml()).toEqual('<tabs><id>tabs1</id><pages></pages></tabs>');
    expect(new Tabs(tb)).toEqual(tb);
  });

  it('writing Tab as XML', () => {
    const tb = new Tab();
    tb.title = 'Tab 1';
    tb.id = 'tab1';

    expect(tb.toXml()).toEqual('<tab><id>tab1</id><controls></controls><title>Tab 1</title></tab>');
    expect(new Tab(tb)).toEqual(tb);
  });

  it('writing Textarea as XML', () => {
    const ta = new Textarea();
    ta.id = 'textarea1';
    ta.title = 'Textarea 1';
    ta.ccid = 1;

    expect(ta.toXml())
      .toEqual('<textarea><id>textarea1</id><title>Textarea 1</title><ccid>1</ccid><lines>5</lines><wrap>true</wrap></textarea>');
    expect(new Textarea(ta)).toEqual(ta);
  });

  it('writing Textfield as XML', () => {
    const tf = new Textfield();
    tf.id = 'textfield1';
    tf.title = 'Textfield 1';
    tf.ccid = 1;

    expect(tf.toXml()).toEqual('<textfield><id>textfield1</id><title>Textfield 1</title><ccid>1</ccid></textfield>');
    expect(new Textfield(tf)).toEqual(tf);
  });

  it('writing Combobox as XML', () => {
    const cb = new Combobox();
    cb.id = 'cb1';
    cb.title = 'Combobox 1';
    cb.ccid = 1;
    cb.editable = true;
    const option1 = new Option();
    option1.id = 'option1';
    option1.value = 'Item1';
    const option2 = new Option();
    option2.id = 'option2';
    option2.value = 'Item2';
    cb.option = [option1, option2];

    expect(cb.toXml()).toEqual('<combobox><id>cb1</id><title>Combobox 1</title><ccid>1</ccid><editable>true</editable>' +
    '<option><id>option1</id><value>Item1</value></option><option><id>option2</id><value>Item2</value></option></combobox>');
    expect(new Option(option1)).toEqual(option1);
    expect(new Combobox(cb)).toEqual(cb);
  });
});
