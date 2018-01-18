import { Absender } from '../../storage/pal';

export interface AbsenderlisteState {
  selected: Absender;

  pal: Absender[];
}

export const INITIAL_STATE: AbsenderlisteState = { selected: undefined, pal: [] };
