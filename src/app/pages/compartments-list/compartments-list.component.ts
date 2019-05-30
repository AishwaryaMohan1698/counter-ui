import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CompartmentsDataService } from '../../services/compartments-data.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, Observer, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CompartmentChartDataItem } from 'src/app/models/compartment-chart-data-item';
import { CompartmentTypes } from 'src/app/data-look-up/compartment-types';

@Component({
  selector: 'app-compartments-list',
  templateUrl: './compartments-list.component.html',
  styleUrls: ['./compartments-list.component.css']
})
export class CompartmentsListComponent implements OnInit {

  constructor(private compartmentsDataService: CompartmentsDataService, private route: ActivatedRoute, private compartmentTypesData: CompartmentTypes) { }

  trainId: string;
  compartmentDetails: any[];
  passengerCountArray: Array<CompartmentChartDataItem> = new Array<CompartmentChartDataItem>();
  public msgSubject = new Subject<Array<CompartmentChartDataItem>>();

  ngOnInit() {
    this.trainId = this.route.snapshot.paramMap.get('trainId');

    this.compartmentsDataService.getCompartmentDetailsOfTrain(this.trainId).subscribe(compartments => {
      this.compartmentDetails = compartments;


      this.compartmentDetails.forEach((compartment) => {
        compartment.type=this.compartmentTypesData.compartmentTypesNamesForDisplay[compartment.type];
        this.compartmentsDataService.getCountDataOfKit(compartment.kitId).subscribe(cameras => {
          
          var totalCount = 0;
          compartment.count = totalCount;
          
          cameras.forEach((pasCount) => {
            totalCount = totalCount + (+pasCount);
          })
          compartment.count = totalCount;

          const indexOfExistingCompartment=this.passengerCountArray.findIndex((e) => e.compartment === compartment.comId);
          if(indexOfExistingCompartment>-1){
            this.passengerCountArray[indexOfExistingCompartment].count=compartment.count;
          }else{
            this.passengerCountArray.push({ compartment: compartment.comId, count: compartment.count });
          }
          
          this.msgSubject.next(this.passengerCountArray);
        })

      });
    });
  }

}