import { Level } from '@nsalaun/ng-logger';
import { OfficeMockService } from '../app/services/mocks/office.mock.service';

export const environment = {
  production: false,
  test: true,
  formboxapi: 'https://127.0.0.1:4201',
  loglevel: Level.LOG,
  officeService: OfficeMockService
};
