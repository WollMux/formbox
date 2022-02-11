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
  @select(['appstate', 'busy']) busy: Observable<boolean>;
  @select(['slv', 'slv']) slv: Observable<SachleitendeVerfuegung>;

  isBusy = false;
  copies: number[] = [];
  subscriptions: { [ordinal: number]: Subscription } = {};

  constructor(private actions: SachleitendeverfuegungActions) { }

  ngOnInit(): void {
    // Für jeden Verfügungspunkt wird die Anzahl der Kopien auf 1 gesetzt.
    this.slv.subscribe(slv => {
      this.copies = slv.verfuegungspunkte.map(it => 1);
    });

    this.busy.subscribe(b => this.isBusy = b);
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

    if (vp.controlText) {
      this.subscriptions[vp.ordinal] = vp.controlText.subscribe(text => {
        if (!this.isBusy) {
          let s = SachleitendeVerfuegung.splitVerfuegungspunktText(text);
          const p = SachleitendeVerfuegung.generatePrefix(vp.ordinal, vp.abdruck);
          const n = s.indexOf(p);
          if (n !== -1) {
            s = s.slice(0, n) + s.slice(n + p.length);
          }
          this.actions.updateUeberschrift(vp.id, s);
        }
      });
    }
  }
}
