import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CompartmentsDataService {

  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
  }

  getCompartmentDetailsOfTrain(trainId: string) {
    return this.db.list('trains/' + trainId + '/compartments').valueChanges();
  }

  getCountDataOfKit(kitId: string) {
    return this.db.list('kits/' + kitId + '/cameras').valueChanges();
  }


}
