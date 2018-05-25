import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormularGuiComponent } from '../../components/formular-gui/formular-gui.component';
import { FormularGuiButtonComponent } from '../../components/formular-gui-button/formular-gui-button.component';
import { FormularGuiCheckboxComponent } from '../../components/formular-gui-checkbox/formular-gui-checkbox.component';
import { FormularGuiTextareaComponent } from '../../components/formular-gui-textarea/formular-gui-textarea.component';
import { FormularGuiTextfieldComponent } from '../../components/formular-gui-textfield/formular-gui-textfield.component';
import { FormularGuiComboboxComponent } from '../../components/formular-gui-combobox/formular-gui-combobox.component';
import { FormularGuiLabelComponent } from '../../components/formular-gui-label/formular-gui-label.component';
import { FormularGuiSeperatorComponent } from '../../components/formular-gui-seperator/formular-gui-seperator.component';
import { FormularGuiTabsComponent } from '../../components/formular-gui-tabs/formular-gui-tabs.component';
import { FormularGuiControlTemplateComponent } from '../../components/formular-gui-control-template/formular-gui-control-template.component';
import { FormularGuiHboxComponent } from '../../components/formular-gui-hbox/formular-gui-hbox.component';

const routes: Routes = [
  {
    path: '',
    component: FormularGuiComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  declarations: [
    FormularGuiComponent,
    FormularGuiButtonComponent,
    FormularGuiCheckboxComponent,
    FormularGuiTextareaComponent,
    FormularGuiTextfieldComponent,
    FormularGuiComboboxComponent,
    FormularGuiLabelComponent,
    FormularGuiSeperatorComponent,
    FormularGuiTabsComponent,
    FormularGuiControlTemplateComponent,
    FormularGuiHboxComponent
  ],
  exports: [
    RouterModule
  ]
})
// tslint:disable-next-line:no-unnecessary-class
export class FormularGuiModule { }
