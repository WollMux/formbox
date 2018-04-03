import { NgModule } from '@angular/core';
import { TreeModule } from 'angular-tree-component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FormularEditorComponent } from '../../components/formular-editor/formular-editor.component';
import { CommonModule } from '@angular/common';
import { FormularEditorLabelComponent } from '../../components/formular-editor-label/formular-editor-label.component';
import { FormularEditorCheckboxComponent } from '../../components/formular-editor-checkbox/formular-editor-checkbox.component';

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
    FormularEditorCheckboxComponent
  ],
  exports: [
    RouterModule
  ]
})
// tslint:disable-next-line:no-unnecessary-class
export class FormularEditorModule { }
