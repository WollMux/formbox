import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import * as expressions from 'expressions-js';
import * as dateFormat from 'dateformat';

import { FormBoxState } from '../store/states/formbox-state';
import { Absender } from '../storage/absender';
import { OverrideFrag } from '../store/actions/template-actions';
import { TemplateService } from './template.service';

@Injectable()
export class ExpressionsService {
  ctx: Context = new Context(this.templates);

  private formmatters = {
    format: (value: Date, format = 'dd.mm.yy'): string => {
      return dateFormat(value, format);
    }
  };

  constructor(
    private store: NgRedux<FormBoxState>,
    private templates: TemplateService
  ) {
    store.select<OverrideFrag[]>([ 'template', 'overrideFrags' ]).subscribe(overrideFrags => {
      this.ctx.overrideFrags = overrideFrags;
    });

    // Wenn der User den Absender ändert, werden die Eigenschaften als globale
    // Variablen für Expressions übernommen.
    store.select<Absender>([ 'absenderliste', 'selected' ]).subscribe(absender => {
      if (absender) {
        Object.keys(absender).forEach(key => {
          expressions.globals[ key ] = absender[ key ];
        });
      }
    });
  }

  parse(expr: string): FunctionConstructor {
    return expressions.parse(expr, expressions.globals, this.formmatters);
  }

  eval(expr: string, id?: number): any {
    const fn = this.parse(expr);
    this.ctx.id = id;

    return fn.call(this.ctx);
  }
}

class Context {
  id: number;
  overrideFrags: OverrideFrag[] = [];

  constructor(private templates: TemplateService) { /*Empty */ }

  insertFrag(name: string): void {
    const of = this.getOverrideFrag(name) || name;
    this.templates.getFragmentUrl(of).then(async url => {
      await this.templates.insertFragment(this.id, url.url);
    });
  }

  overrideFrag(...overrides: { fragId: string, newFragId: string }[]): void {
    this.overrideFrags.push(...overrides);
  }

  date = (): Date => {
    return new Date();
  }

  private getOverrideFrag(fragId: string): string {
    const of = this.overrideFrags.find(it => it.fragId === fragId);
    if (of) {
      return of.newFragId;
    }

    return undefined;
  }
}
