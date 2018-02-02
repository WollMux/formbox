import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

import { ExpressionsService } from '../services/expressions.service';

@Directive({
  selector: '[appExpression]',
  providers: [ { provide: NG_VALIDATORS, useExisting: ExpressionValidatorDirective, multi: true }]
})
export class ExpressionValidatorDirective implements Validator {
  constructor(private expressions: ExpressionsService) { }

  validate(control: AbstractControl): { [ key: string ]: any } {
    try {
      this.expressions.parse(control.value);

      return null; // tslint:disable-line:no-null-keyword
    } catch (error) {
      return { expression: { value: control.value, error: error } };
    }
  }
}
