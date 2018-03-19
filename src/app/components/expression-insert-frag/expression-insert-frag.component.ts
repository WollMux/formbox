import { Component } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { ExpressionEditorCommandsActions } from '../../store/actions/expression-editor-commands-actions';

/**
 * GUI zum Schnellen Erzeugen eines insertFrag-Kommandos.
 */
@Component({
  selector: 'app-expression-insert-frag',
  templateUrl: './expression-insert-frag.component.html',
  styleUrls: ['./expression-insert-frag.component.css']
})
export class ExpressionInsertFragComponent {
  @select(['template', 'fragments']) fragments: Observable<string[]>;

  private selectedIndex = -1;
  private selectedName;

  constructor(private expressionActions: ExpressionEditorCommandsActions) { }

  getSelectedIndex(): number {
    return this.selectedIndex;
  }

  onSelect(n: number, name: string): boolean {
    this.selectedIndex = n;
    this.selectedName = name;

    return false;
  }

  onInsert(): boolean {
    this.expressionActions.create(`insertFrag('${this.selectedName}')`, Number.MAX_SAFE_INTEGER);

    return false;
  }
}
