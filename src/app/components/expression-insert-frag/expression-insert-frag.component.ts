import { Component } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { ExpressionEditorCommandsActions } from '../../store/actions/expression-editor-commands-actions';

@Component({
  selector: 'app-expression-insert-frag',
  templateUrl: './expression-insert-frag.component.html',
  styleUrls: [ './expression-insert-frag.component.css' ]
})
export class ExpressionInsertFragComponent {
  @select([ 'template', 'fragments' ]) fragments: Observable<string[]>;

  private selectedIndex = -1;
  private selectedName;

  constructor(private expressionActions: ExpressionEditorCommandsActions) { }

  onSelect(n: number, name: string): boolean {
    this.selectedIndex = n;
    this.selectedName = name;

    return false;
  }

  onInsert(): boolean {
    this.expressionActions.new(`insertFrag('${this.selectedName}')`, Number.MAX_SAFE_INTEGER);

    return false;
  }
}
