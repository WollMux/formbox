import { Level } from '@nsalaun/ng-logger';
import { OfficeMockService } from '../app/services/mocks/office.mock.service';

export const environment = {
  production: false,
  test: true,
  formboxapi: 'https://localhost:4201',
  loglevel: Level.LOG,
  officeService: OfficeMockService
};
