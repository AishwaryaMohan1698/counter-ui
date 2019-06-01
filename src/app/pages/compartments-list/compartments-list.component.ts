import { Component, OnInit} from '@angular/core';
import { CompartmentsDataService } from '../../services/compartments-data.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { CompartmentChartDataItem } from 'src/app/models/compartment-chart-data-item';
import { CompartmentTypes } from 'src/app/data-look-up/compartment-types';
import { Compartment } from 'src/app/models/compartment';

@Component({
  selector: 'app-compartments-list',
  templateUrl: './compartments-list.component.html',
  styleUrls: ['./compartments-list.component.css']
})
export class CompartmentsListComponent implements OnInit {

  constructor(private compartmentsDataService: CompartmentsDataService, private route: ActivatedRoute, private compartmentTypesData: CompartmentTypes) { }

  trainId: string;
  compartmentDetails: Array<Compartment> = new Array<Compartment>();
  passengerCountArray: Array<CompartmentChartDataItem> = new Array<CompartmentChartDataItem>();
  public msgSubject = new Subject<Array<CompartmentChartDataItem>>();

  ngOnInit() {
    this.trainId = this.route.snapshot.paramMap.get('trainId');

    this.compartmentsDataService.getCompartmentDetailsOfTrain(this.trainId).subscribe(compartments => {
      compartments.forEach((compartment: any) => {
        var compartmentObject = new Compartment();

        if (compartment.comNo === undefined) {
          console.log("not array");

          compartmentObject.compartmentNo = compartment.compartmentNo;
          compartmentObject.type = this.compartmentTypesData.compartmentTypesNamesForDisplay[compartment.type];
          compartmentObject.deviceId = compartment.deviceId;

        } else {
          console.log("array");

          compartmentObject.compartmentNo = compartment.comNo.compartmentNo;
          compartmentObject.type = this.compartmentTypesData.compartmentTypesNamesForDisplay[compartment.comNo.type];
          compartmentObject.deviceId = compartment.comNo.deviceId;
        }

        this.compartmentsDataService.getCountDataOfKit(compartmentObject.deviceId).subscribe(cameras => {

          var totalCount = 0;
          compartmentObject.count = totalCount;

          cameras.forEach((pasCount) => {
            totalCount = totalCount + (+pasCount);
          })
          compartmentObject.count = totalCount;
          if(totalCount<0){
            compartmentObject.count=0;
          }

          const indexOfExistingCompartment = this.passengerCountArray.findIndex((e) => e.compartment === compartmentObject.compartmentNo);
          if (indexOfExistingCompartment > -1) {
            this.passengerCountArray[indexOfExistingCompartment].count = compartmentObject.count;
          } else {
            this.passengerCountArray.push({ compartment: compartmentObject.compartmentNo, count: compartmentObject.count });
          }

          this.msgSubject.next(this.passengerCountArray);
        })

        // this.compartmentDetails.push(compartmentObject);

        const indexOfExistingCompartmentInList = this.compartmentDetails.findIndex((e) => e.compartmentNo === compartmentObject.compartmentNo);
        if (indexOfExistingCompartmentInList > -1) {
          this.compartmentDetails[indexOfExistingCompartmentInList] = compartmentObject;
        } else {
          this.compartmentDetails.push(compartmentObject);
        }
      });

    });
  }

}