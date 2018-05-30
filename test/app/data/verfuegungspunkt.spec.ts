import { Verfuegungspunkt } from '../../../src/app/data/slv/verfuegungspunkt';
import { Observable } from 'rxjs/Observable';

describe('Verfuegungspunkt', () => {
  it('set ueberschrift', () => {
    const vp = new Verfuegungspunkt(0, '', '');
    const s = 'Test   123\tÜberschrift';

    vp.ueberschrift = s;

    expect(vp.ueberschrift).toEqual('Test 123 Überschrift');
  });

  it('controlText', () => {
    const vp = new Verfuegungspunkt(0, '', '');

    const ob = Observable.of('I.\tTest');

    vp.controlText = ob;
    expect(vp.ueberschrift).toEqual('Test');
  });
});
