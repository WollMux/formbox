import { inject, TestBed } from '@angular/core/testing';

import { LDAPService } from '../../../src/app/services/ldap.service';
import { HttpModule } from '@angular/http';
import { NgLoggerModule } from '@nsalaun/ng-logger';
import { environment } from '../../../src/environments/environment';

describe('LdapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        NgLoggerModule.forRoot(environment.loglevel)
      ],
      providers: [LDAPService]
    });
  });

  it('should be created', inject([LDAPService], (service: LDAPService) => {
    expect(service).toBeTruthy();
  }));
});
