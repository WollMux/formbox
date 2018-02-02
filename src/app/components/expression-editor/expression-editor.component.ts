import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { DocumentCommand } from '../../store/states/expression-editor-state';
import { ExpressionEditorActions } from '../../store/actions/expression-editor-actions';

@Component({
  selector: 'app-expression-editor',
  templateUrl: './expression-editor.component.html',
  styleUrls: [ './expression-editor.component.css' ],
  providers: [ ExpressionEditorActions ]
})
export class ExpressionEditorComponent implements OnInit {
  @select([ 'expressionEditor', 'selected' ]) selected: Observable<DocumentCommand>;
  @select([ 'expressionEditor', 'selected_index' ]) selectedIndex: Observable<number>;
  @select([ 'expressionEditor', 'documentCommands' ]) documentCommands: Observable<DocumentCommand[]>;

  constructor(private actions: ExpressionEditorActions) { }

  ngOnInit(): void {
    this.actions.init();
  }

  newDocumentCommand(): void {
    this.actions.new();
  }

  deleteDocumentCommand(n: number): void {
    this.actions.delete(n);
  }

  selectDocumentCommand(n: number): void {
    this.actions.select(n);
  }
}
