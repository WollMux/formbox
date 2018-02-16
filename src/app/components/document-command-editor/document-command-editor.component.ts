import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ExpressionEditorCommandsActions } from '../../store/actions/expression-editor-commands-actions';
import { DocumentCommand } from '../../store/states/expression-editor-commands-state';
import { ExpressionsService } from '../../services/expressions.service';

@Component({
  selector: 'app-document-command-editor',
  templateUrl: './document-command-editor.component.html',
  styleUrls: [ './document-command-editor.component.css' ]
})
export class DocumentCommandEditorComponent implements OnInit {
  @select([ 'expressionEditor', 'expressionEditorCommands', 'selected' ]) selected: Observable<DocumentCommand>;
  @select([ 'expressionEditor', 'expressionEditorCommands', 'selected_index' ]) selectedIndex: Observable<number>;

  model: { index: number, cmd: DocumentCommand } = { index: -1, cmd: undefined };

  constructor(private actions: ExpressionEditorCommandsActions, private expressions: ExpressionsService) { }

  ngOnInit(): void {
    this.selected.subscribe(c => {
      this.model.cmd = { ...c };
    });
    this.selectedIndex.subscribe(n => this.model.index = n);
  }

  save(): void {
    if (isNaN(this.model.cmd.order)) {
      this.model.cmd.order = Number.MAX_SAFE_INTEGER;
    }
    this.actions.save(this.model.index, this.model.cmd);
  }
}
