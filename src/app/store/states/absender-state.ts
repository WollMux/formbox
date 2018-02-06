import { Absender } from '../../storage/absender';

export interface AbsenderlisteState {
  selected: Absender;

  pal: Absender[];
}

export const INITIAL_STATE: AbsenderlisteState = { selected: undefined, pal: [] };
