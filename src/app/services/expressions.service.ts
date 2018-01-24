import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import * as expressions from 'expressions-js';

import { FormBoxState } from '../store/states/formbox-state';
import { Absender } from '../storage/pal';
import { OverrideFrag, TemplateActions } from '../store/actions/template-actions';

@Injectable()
export class ExpressionsService {
  ctx: Context = new Context(this.templateActions);

  constructor(
    private store: NgRedux<FormBoxState>,
    private templateActions: TemplateActions
  ) {
    store.select<OverrideFrag[]>(['template', 'overrideFrags']).subscribe(overrideFrags => {
      this.ctx.overrideFrags = overrideFrags;
    });

    // Wenn der User den Absender ändert, werden die Eigenschaften als globale
    // Variablen für Expressions übernommen.
    store.select<Absender>(['absenderliste', 'selected']).subscribe(absender => {
      if (absender) {
        Object.keys(absender).forEach(key => {
          expressions.globals[key] = absender[key];
        });
      }
    });
  }

  eval(expr: string, id?: number): any {
    const fn = expressions.parse(expr, expressions.globals);
    this.ctx.id = id;

    return fn.call(this.ctx);
  }
}

class Context {
  id: number;
  overrideFrags: OverrideFrag[];

  constructor(private templateActions: TemplateActions) { /*Empty */ }

  insertFrag(name: string): void {
    const of = this.getOverrideFrag(name) || name;
    this.templateActions.insertFragment(this.id, of);
  }

  overrideFrag(fragId: string, newFragId: string): void {
    this.templateActions.overrideFragment(fragId, newFragId);
  }

  private getOverrideFrag(fragId: string): string {
    const of = this.overrideFrags.find(it => it.fragId === fragId);
    if (of) {
      return of.newFragId;
    }

    return undefined;
  }
}
