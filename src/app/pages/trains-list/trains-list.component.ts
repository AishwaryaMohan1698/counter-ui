import { Component, OnInit } from '@angular/core';
import { TrainsDataService } from '../../services/trains-data.service';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
@Component({
  selector: 'app-trains-list',
  templateUrl: './trains-list.component.html',
  styleUrls: ['./trains-list.component.css']
})
export class TrainsListComponent implements OnInit {

  trains: any[];
  constructor(private trainsDataService: TrainsDataService, private router: Router) {

  }

  isTrainChosen: boolean;

  ngOnInit() {
    this.trainsDataService.getTrains().subscribe(trains => {
      this.trains = trains;
      // console.log(this.trains);
    });
    this.isTrainChosen = false;
  }

  goToTrainPage(trainId: string) {
    // console.log(trainId + " is selected");
    this.isTrainChosen = true;
    this.router.navigate(['/compartments', { trainId: trainId }]);
  }

}
