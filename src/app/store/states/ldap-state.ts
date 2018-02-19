import { Absender } from '../../storage/absender';

export interface LDAPState {
  result: any[];
}

export const INITIAL_STATE: LDAPState = { result: [] };
