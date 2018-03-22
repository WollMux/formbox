import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { LDAPFilter } from '../../services/ldap.service';
import { LDAPActions } from '../../store/actions/ldap-actions';
import { Logger } from '@nsalaun/ng-logger';

/**
 * Die Component für die LDAP-Suche.
 *
 * Die Parent-Componente kann festlegen, ob Drag-And-Drop aktiviert ist und welche Action dabei ausgeführt wird.
 */
@Component({
  selector: 'app-ldap-suche',
  templateUrl: './ldap-suche.component.html',
  styleUrls: ['./ldap-suche.component.css']
})
export class LDAPSucheComponent implements OnInit, OnDestroy {
  filter = {uid: undefined, vorname: undefined, nachname: undefined, ou: undefined} as LDAPFilter;
  @select(['ldap', 'result']) result: Observable<any[]>;
  @Input() dragEnabled = false;
  @Output() selected = new EventEmitter();

  constructor(
    private ldapActions: LDAPActions,
    private log: Logger
  ) { }

  ngOnInit(): void {
    // nothing to initialize
  }

  ngOnDestroy(): void {
    this.ldapActions.clearingLDAP();
  }

  /**
   * Suche starten.
   */
  onSubmit(): void {
    this.log.debug(`starte Suche mit filter: ${JSON.stringify(this.filter)}`);
    this.ldapActions.searchingLDAP(this.filter);
  }

  emitEvent(res: any): void {
    this.log.debug(JSON.stringify(res));
    this.selected.emit(res);
  }
}
