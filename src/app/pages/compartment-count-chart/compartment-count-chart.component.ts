import { Component, OnInit, NgZone, Input } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { CompartmentsListComponent } from '../compartments-list/compartments-list.component';

// Themes begin
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-compartment-count-chart',
  templateUrl: './compartment-count-chart.component.html',
  styleUrls: ['./compartment-count-chart.component.css']
})
export class CompartmentCountChartComponent implements OnInit{

  private chart: am4charts.XYChart;

  constructor(private zone: NgZone, private compartmentsListComponent: CompartmentsListComponent) { }
  ngOnInit() {
    
    this.zone.runOutsideAngular(() => {
      // Create chart instance
      var chart = am4core.create("chartdiv", am4charts.XYChart);

      // Add data
      this.compartmentsListComponent.msgSubject.subscribe(data=>{
        // console.log(data);
        chart.data = data;
      })
      
      // Create axes
      var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "compartment";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 30;

      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

      // Create series
      var series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "count";
      series.dataFields.categoryX = "compartment";
      series.name = "count";
      series.columns.template.tooltipText = "passenger count in {compartment} is {count}";
      series.columns.template.fillOpacity = 1;

      // var columnTemplate = series.columns.template;
      this.chart = chart;
    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

}
