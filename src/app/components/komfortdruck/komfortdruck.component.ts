import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store/lib/src';
import { Observable } from 'rxjs/Observable';

import { SachleitendeVerfuegung } from '../../data/slv/sachleitende-verfuegung';
import { SachleitendeverfuegungActions } from '../../store/actions/sachleitendeverfuegung-actions';

@Component({
  selector: 'app-komfortdruck',
  templateUrl: './komfortdruck.component.html',
  styleUrls: ['./komfortdruck.component.css']
})
export class KomfortdruckComponent implements OnInit {
  @select(['slv', 'slv']) slv: Observable<SachleitendeVerfuegung>;

  copies: number[] = [];

  constructor(private actions: SachleitendeverfuegungActions) { }

  ngOnInit(): void {
    this.slv.subscribe(slv => {
      this.copies = slv.verfuegungspunkte.map(it => 1);
    });
  }

  print(): void {
    this.actions.print(this.copies);
  }
}
