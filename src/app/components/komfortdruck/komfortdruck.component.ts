import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store/lib/src';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { SachleitendeVerfuegung } from '../../data/slv/sachleitende-verfuegung';
import { SachleitendeverfuegungActions } from '../../store/actions/sachleitendeverfuegung-actions';
import { Verfuegungspunkt } from '../../data/slv/verfuegungspunkt';

@Component({
  selector: 'app-komfortdruck',
  templateUrl: './komfortdruck.component.html',
  styleUrls: ['./komfortdruck.component.css']
})
export class KomfortdruckComponent implements OnInit {
  @select(['slv', 'slv']) slv: Observable<SachleitendeVerfuegung>;

  copies: number[] = [];
  subscriptions: { [ordinal: number]: Subscription } = {};

  constructor(private actions: SachleitendeverfuegungActions) { }

  ngOnInit(): void {
    // Für jeden Verfügungspunkt wird die Anzahl der Kopien auf 1 gesetzt.
    this.slv.subscribe(slv => {
      this.copies = slv.verfuegungspunkte.map(it => 1);
    });
  }

  /**
   * Erzeugt ein Druckdokument mit der ausgwählten Anzahl von Kopien. 
   */
  print(): void {
    this.actions.print(this.copies);
  }

  /**
   * Databinding für Verfügungspunkte.
   * Wenn der User den Text im Content Control ändert, wird die Überschrift
   * des Verfügungspunkts angepaßt. 
   */
  bindVP(vp: Verfuegungspunkt): void {
    if (vp.ordinal in this.subscriptions) {
      this.subscriptions[vp.ordinal].unsubscribe();
      delete this.subscriptions[vp.ordinal];
    }

    this.subscriptions[vp.ordinal] = vp.controlText.subscribe(text => {
      const s = text.split('\t');
      this.actions.updateUeberschrift(vp.id, s.pop());
    });
  }
}
