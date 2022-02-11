/**
 * Status von Sachleitendeverfuegung.
 */
import { SachleitendeVerfuegung } from '../../data/slv/sachleitende-verfuegung';

export interface SachleitendeverfuegungState {
  slv: SachleitendeVerfuegung;
}

export const INITIAL_STATE: SachleitendeverfuegungState = {
  slv: new SachleitendeVerfuegung()
};
