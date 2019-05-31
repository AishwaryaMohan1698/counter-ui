import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { TrainsDataService } from './trains-data.service';

@Injectable({
  providedIn: 'root'
})
export class SearchTrainsService {

  trains:any[];
  results:any[];

  constructor(private trainsDataService: TrainsDataService) { }

  searchTrains(from: string, to: string) {
    this.trainsDataService.getTrains().subscribe(trains => {
      this.trains = trains;
      trains.forEach(train => {
        console.log(train);
      });
    });
  }
}




