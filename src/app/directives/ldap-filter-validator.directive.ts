import { Directive, Input } from '@angular/core';
import { LDAPFilter } from '../services/ldap.service';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Logger } from '@nsalaun/ng-logger';

/**
 * Validator für das LDAP-Formular.
 */
@Directive({
  selector: '[appLdapFilterValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: LdapFilterValidatorDirective, multi: true}]
})
export class LdapFilterValidatorDirective implements Validator {

  @Input('appLdapFilterValidator') filter: LDAPFilter; // tslint:disable-line no-input-rename

  constructor(private log: Logger) {
    // nothing to initialize
  }

  /**
   * Testen ob eine Suchanfrage gestellt werden soll. Dazu muss mindestens eines der Formularfelder einen Wert enthalten.
   */
  validate(control: AbstractControl): ValidationErrors {
    if (this.filter.uid || this.filter.nachname || this.filter.vorname || this.filter.ou) {
      return undefined;
    }

    return { filter: { value: this.filter, error: 'Alle Felder sind leer'}};
  }
}
