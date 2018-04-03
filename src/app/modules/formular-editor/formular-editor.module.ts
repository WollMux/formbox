import { NgModule } from '@angular/core';
import { TreeModule } from 'angular-tree-component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FormularEditorComponent } from '../../components/formular-editor/formular-editor.component';
import { CommonModule } from '@angular/common';

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
    FormularEditorComponent
  ],
  exports: [
    RouterModule
  ]
})
// tslint:disable-next-line:no-unnecessary-class
export class FormularEditorModule { }
