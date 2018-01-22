import { inject, TestBed } from '@angular/core/testing';

import { ExpressionsService } from '../../../src/app/services/expressions.service';
import { NgReduxModule } from '@angular-redux/store';
import { TemplateActions } from '../../../src/app/store/actions/template-actions';

describe('ExpressionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgReduxModule
      ],
      providers: [
        TemplateActions,
        ExpressionsService
      ]
    });
  });

  it('should be created', inject([ExpressionsService], (service: ExpressionsService) => {
    expect(service).toBeTruthy();
  }));
});
