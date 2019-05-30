import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainsDataService {
  trains: Observable<any[]>;
  constructor(private db: AngularFireDatabase) {
    this.trains = db.list('trains').valueChanges();
  }

  getTrains() {
    return this.trains;
  }
}
