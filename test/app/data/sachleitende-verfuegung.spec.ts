import { SachleitendeVerfuegung } from '../../../src/app/data/slv/sachleitende-verfuegung';
import { Verfuegungspunkt } from '../../../src/app/data/slv/verfuegungspunkt';

describe('SachleitendeVerfuegung', () => {
  it('insertBeforeVerfuegunspunkt', () => {
    const slv = new SachleitendeVerfuegung(
      [new Verfuegungspunkt(1, 'VP1', ''),
      new Verfuegungspunkt(2, 'VP2', '')]);

    const vp = slv.insertBeforeVerfuegunspunkt(3, 2, 'VP3', '');

    expect(vp.ordinal).toEqual(2);
  });

  it('deleteVerfuegunspunkt', () => {
    const slv = new SachleitendeVerfuegung(
      [new Verfuegungspunkt(1, 'VP1', ''),
      new Verfuegungspunkt(2, 'VP2', '')]);

    slv.deleteVerfuegungspunkt(1);
    const vp = slv.getVerfuegungspunkt(2);

    expect(vp).toBeDefined();
    expect(vp.ordinal).toEqual(1);
  });

});
