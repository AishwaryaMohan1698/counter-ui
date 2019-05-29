import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CompartmentsDataService } from '../compartments-data.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-compartments-list',
  templateUrl: './compartments-list.component.html',
  styleUrls: ['./compartments-list.component.css']
})
export class CompartmentsListComponent implements OnInit {

  constructor(private compartmentsDataService: CompartmentsDataService, private route: ActivatedRoute) { }

  trainId: string;
  compartmentDetails: any[];
  passengerCountArray: any[];

  kits: string[] = [];

  ngOnInit() {
    this.trainId = this.route.snapshot.paramMap.get('trainId');
    console.log(this.trainId);
    this.compartmentsDataService.getCompartmentDetailsOfTrain(this.trainId).subscribe(compartments => {
      this.compartmentDetails = compartments;
      console.log(this.compartmentDetails);

      var totalCount = 0;
      this.compartmentDetails.forEach((compartment) => {
        this.kits.push(compartment.kitId);
        console.log(compartment.kitId);
        this.compartmentsDataService.getCountDataOfKit(compartment.kitId).subscribe(cameras => {
          cameras.forEach((pasCount) => {
            totalCount = totalCount + (+pasCount);
            console.log(totalCount);
            compartment.count = totalCount;
          })
        })
        compartment.count = totalCount;
      });

    });
    
  }

}