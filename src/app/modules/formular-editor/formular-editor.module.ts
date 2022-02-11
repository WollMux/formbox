import { NgModule } from '@angular/core';
import { TreeModule } from 'angular-tree-component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FormularEditorComponent } from '../../components/formular-editor/formular-editor.component';
import { CommonModule } from '@angular/common';
import { FormularEditorLabelComponent } from '../../components/formular-editor-label/formular-editor-label.component';
import { FormularEditorCheckboxComponent } from '../../components/formular-editor-checkbox/formular-editor-checkbox.component';
import { FormularEditorTextfieldComponent } from '../../components/formular-editor-textfield/formular-editor-textfield.component';
import { FormularEditorTabComponent } from '../../components/formular-editor-tab/formular-editor-tab.component';
import { FormularEditorButtonComponent } from '../../components/formular-editor-button/formular-editor-button.component';
import { FormularEditorFormComponent } from '../../components/formular-editor-form/formular-editor-form.component';
import { FormularEditorTextareaComponent } from '../../components/formular-editor-textarea/formular-editor-textarea.component';
import { FormularEditorComboboxComponent } from '../../components/formular-editor-combobox/formular-editor-combobox.component';

const routes: Routes = [
  {
    path: '',
    component: FormularEditorComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    TreeModule
  ],
  declarations: [
    FormularEditorComponent,
    FormularEditorLabelComponent,
    FormularEditorCheckboxComponent,
    FormularEditorTextfieldComponent,
    FormularEditorTabComponent,
    FormularEditorButtonComponent,
    FormularEditorFormComponent,
    FormularEditorTextareaComponent,
    FormularEditorComboboxComponent
  ],
  exports: [
    RouterModule
  ]
})
// tslint:disable-next-line:no-unnecessary-class
export class FormularEditorModule { }
