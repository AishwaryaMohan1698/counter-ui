import { Component, OnInit } from '@angular/core';
import { SearchTrainsService } from 'src/app/services/search-trains.service';

@Component({
  selector: 'app-search-train',
  templateUrl: './search-train.component.html',
  styleUrls: ['./search-train.component.css']
})
export class SearchTrainComponent implements OnInit {

  constructor(private searchTrainsService: SearchTrainsService) { }

  ngOnInit() {
    this.searchTrainsService.searchTrains('aaa', 'bbb');
  }

}
