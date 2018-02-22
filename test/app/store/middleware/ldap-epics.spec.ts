import { async, inject, TestBed } from '@angular/core/testing';
import { ActionsObservable } from 'redux-observable';
import { NgLoggerModule } from '@nsalaun/ng-logger';
import { environment } from '../../../../src/environments/environment';
import { NgReduxModule } from '@angular-redux/store';
import { LDAPFilter, LDAPService } from '../../../../src/app/services/ldap.service';
import { LDAPActions } from '../../../../src/app/store/actions/ldap-actions';
import { LDAPEpics } from '../../../../src/app/store/middleware/ldap-epics';
import { LDAPMockService } from '../../../../src/app/services/mocks/ldap.mock.service';

describe('LDAP epics', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgLoggerModule.forRoot(environment.loglevel),
        NgReduxModule
      ],
      providers: [
        { provide: LDAPService, useClass: LDAPMockService },
        LDAPActions,
        LDAPEpics
      ]
    });
  });

  it('searching ldap', async(inject([LDAPEpics, LDAPService],
    (epics: LDAPEpics, ldap: LDAPService) => {
      const filter = {uid: 'max.mustermann'} as LDAPFilter;
      const action = LDAPActions.SEARCH_LDAP.started(filter);

      const p = epics.searchingLDAP(ActionsObservable.of(action));

      p.subscribe(result => {
        expect(result).toEqual({
          type: 'SEARCH_LDAP_DONE',
          payload: {
            params: filter,
            result: [{uid: 'max.mustermann', vorname: 'max', nachname: 'mustermann'}]
          }
        });
      });
    })
  ));
});
