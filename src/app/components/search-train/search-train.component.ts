import { Component, OnInit } from '@angular/core';
import { SearchTrainsService } from 'src/app/services/search-trains.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TrainsListComponent } from 'src/app/pages/trains-list/trains-list.component';

@Component({
  selector: 'app-search-train',
  templateUrl: './search-train.component.html',
  styleUrls: ['./search-train.component.css']
})
export class SearchTrainComponent {
  trainId = new FormControl('');

  constructor(private trainsListComponent: TrainsListComponent, private router: Router) { }

  goToTrainPage() {
    this.trainsListComponent.goToTrainPage(this.trainId.value);
  }
}
