import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import * as expressions from 'expressions-js';
import * as dateFormat from 'dateformat';

import { FormBoxState } from '../store/states/formbox-state';
import { Absender } from '../storage/absender';
import { OverrideFrag } from '../store/actions/template-actions';
import { TemplateService } from './template.service';

/**
 * Klasse zum Parsen und Ausführen von Javascript-Expressions.
 * Diese Expressions werden in den Dokumentenkommandos verwendet.
 *
 * Über die Klasse Context können Expressions auf die Eigenschaften des
 * aktuellen Absenders zugreifen.
 * Außerdem steht auch eine Datumsfunktion date() zur Verfügung.
 * Javascript-Funktionen Math. parseInt, parseFloat, isNaN, Array können verwendet
 * werden.
 */
@Injectable()
export class ExpressionsService {
  ctx: Context = new Context(this.templates);

  /**
   * Der Formatter kann dazu verwendet werden ein Datum über einen Formatstring
   * zu fomatieren. Formatter werden mit einer Pipe ('|') an das Kommando
   * angehängt
   *
   * z.B.: date() | format('yyyy-mm-dd')
   */
  private formmatters = {
    format: (value: Date, format = 'dd.mm.yy'): string => {
      return dateFormat(value, format);
    }
  };

  constructor(
    private store: NgRedux<FormBoxState>,
    private templates: TemplateService
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

  /**
   * Parst eine Expression ohne sie auszuführen. Die Funktion kann später
   * mit call() aufegrufen werden.
   *
   * Fehler in der Expression lösen eine Exception aus. Das kann zur Validierung
   * in der GUI verwendet werden.
   */
  parse(expr: string): FunctionConstructor {
    return expressions.parse(expr, expressions.globals, this.formmatters);
  }

  /**
   * Parst eine Expression und führt sie gleich aus.
   */
  eval(expr: string, id?: number): any {
    const fn = this.parse(expr);
    this.ctx.id = id;

    return fn.call(this.ctx);
  }
}

/**
 * Über den Kontext kann man der Expression-Engine zusätzliche Objekte
 * und Funktionen übergeben, die in Expressions verwendet werden können.
 */
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
