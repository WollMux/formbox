import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';

import 'rxjs/add/operator/take';

import { ExpressionOverrideFragActions } from '../../store/actions/expression-override-frag-actions';
import { ExpressionEditorCommandsActions } from '../../store/actions/expression-editor-commands-actions';

/**
 * GUI zum schnellen Anlegen von overrideFrag-Kommandos. Es können mehrere
 * Overrides im selben Kommand angelegt werden.
 */
@Component({
  selector: 'app-expression-override-frag',
  templateUrl: './expression-override-frag.component.html',
  styleUrls: ['./expression-override-frag.component.css'],
  providers: [ExpressionOverrideFragActions]
})
export class ExpressionOverrideFragComponent {
  @select(['expressionEditor', 'expressionEditorOverrideFrags', 'overrideFrags'])
  overrideFrags: Observable<{ oldFrag: string, newFrag: string }[]>;

  @select(['template', 'fragments']) fragments: Observable<string[]>;

  constructor(
    private actions: ExpressionOverrideFragActions,
    private expressionActions: ExpressionEditorCommandsActions
  ) { }

  onNewOverrideFrag(): boolean {
    this.actions.add();

    return false;
  }

  onDeleteOverrideFrag(n: number): boolean {
    this.actions.delete(n);

    return false;
  }

  onUpdateOldFrag(n: number, val: string): boolean {
    this.actions.updateOldFrag(n, val);

    return true;
  }

  onUpdateNewFrag(n: number, val: string): boolean {
    this.actions.updateNewFrag(n, val);

    return true;
  }

  onInsert(): boolean {
    this.overrideFrags.take(1).toPromise().then(of => {
      const json = JSON.stringify(of);

      this.expressionActions.new(`overrideFrag('${json}')`, Number.MAX_SAFE_INTEGER);

      this.actions.clear();
    });

    return false;
  }

  validate(overrideFrags: { oldFrag: string, newFrag: string }[]): boolean {
    return overrideFrags.every(it => it.oldFrag && it.newFrag && it.oldFrag.length > 0 && it.newFrag.length > 0);
  }

  /**
   * Workaround: Ohne die Funktion verlieren die Input-Felder den Fokus.
   */
  trackByFn(index: any, item: any): any {
    return index;
  }
}
