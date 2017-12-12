import { Component, OnInit } from '@angular/core';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private db: StorageService) {
  }

  async ngOnInit(): Promise<void> {
    this.db.reset().then(() => {
      this.db.getPAL().then(pal => {
        console.log(pal);
      });
    });
  }
}
