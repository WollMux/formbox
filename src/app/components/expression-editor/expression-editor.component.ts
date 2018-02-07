import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { DocumentCommand } from '../../store/states/expression-editor-state';
import { ExpressionEditorActions } from '../../store/actions/expression-editor-actions';

@Component({
  selector: 'app-expression-editor',
  templateUrl: './expression-editor.component.html',
  styleUrls: ['./expression-editor.component.css'],
  providers: [ExpressionEditorActions]
})
export class ExpressionEditorComponent implements OnInit {
  @select(['expressionEditor', 'selected']) selected: Observable<DocumentCommand>;
  @select(['expressionEditor', 'selected_index']) selectedIndex: Observable<number>;
  @select(['expressionEditor', 'documentCommands']) documentCommands: Observable<DocumentCommand[]>;

  constructor(private actions: ExpressionEditorActions) { }

  ngOnInit(): void {
    this.actions.init();
  }

  newDocumentCommand(): void {
    this.actions.new('0', Number.MAX_SAFE_INTEGER);
  }

  deleteDocumentCommand(n: number): boolean {
    this.actions.delete(n);

    return false;
  }

  selectDocumentCommand(n: number): boolean {
    this.actions.select(n);

    return false;
  }
}
