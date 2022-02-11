import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { DocumentCommand } from '../../store/states/expression-editor-commands-state';
import { ExpressionEditorCommandsActions } from '../../store/actions/expression-editor-commands-actions';
import { TemplateActions } from '../../store/actions/template-actions';

/**
 * Expression-Editor zum Anlegen und Bearbeiten von Dokumentenkommandos.
 */
@Component({
  selector: 'app-expression-editor',
  templateUrl: './expression-editor.component.html',
  styleUrls: ['./expression-editor.component.css'],
  providers: [ExpressionEditorCommandsActions]
})
export class ExpressionEditorComponent implements OnInit {
  @select(['expressionEditor', 'expressionEditorCommands', 'selected']) selected: Observable<DocumentCommand>;
  @select(['expressionEditor', 'expressionEditorCommands', 'selected_index']) selectedIndex: Observable<number>;
  @select(['expressionEditor', 'expressionEditorCommands', 'documentCommands']) documentCommands: Observable<DocumentCommand[]>;

  constructor(
    private actions: ExpressionEditorCommandsActions,
    private templateActions: TemplateActions) { }

  ngOnInit(): void {
    this.actions.init();
    this.templateActions.getFragments();
  }

  onNewDocumentCommand(): void {
    this.actions.create('0', Number.MAX_SAFE_INTEGER);
  }

  onDeleteDocumentCommand(event: Event, id: number): boolean {
    event.stopPropagation();
    this.actions.delete(id);

    return false;
  }

  onSelectDocumentCommand(id: number): boolean {
    this.actions.select(id);

    return false;
  }
}
