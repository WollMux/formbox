// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import { Level } from '@nsalaun/ng-logger';
import { OfficeService } from '../app/services/office.service';

export const environment = {
  production: false,
  formboxapi: 'https://127.0.0.1:4201',
  loglevel: Level.LOG,
  officeServie: OfficeService
};
