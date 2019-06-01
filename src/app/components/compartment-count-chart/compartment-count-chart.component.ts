import { Component, OnInit, NgZone, Input } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { CompartmentsListComponent } from '../../pages/compartments-list/compartments-list.component';

// Themes begin
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-compartment-count-chart',
  templateUrl: './compartment-count-chart.component.html',
  styleUrls: ['./compartment-count-chart.component.css']
})
export class CompartmentCountChartComponent implements OnInit {

  private chart: am4charts.XYChart;

  constructor(private zone: NgZone, private compartmentsListComponent: CompartmentsListComponent) { }
  ngOnInit() {

    this.zone.runOutsideAngular(() => {
      // Create chart instance
      var chart = am4core.create("chartdiv", am4charts.XYChart);

      // Add data
      this.compartmentsListComponent.msgSubject.subscribe(data => {
        // console.log(data);
        chart.data = data.sort((obj1, obj2) => {
          if (obj1.count > obj2.count) {
            return -1;
          }

          if (obj1.count < obj2.count) {
            return 1;
          }

          return 0;
        });;
      })

      // Create axes
      var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "compartment";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 30;

      categoryAxis.stroke = am4core.color("#66fcf1");
      categoryAxis.title.text = "Compartment Number";
      categoryAxis.title.fontWeight = "bold";

      // categoryAxis.renderer.labels.template.rotation = 270;
      // categoryAxis.renderer.inversed = true;

      var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());

      valueAxis.title.text = "Passenger Count";
      valueAxis.title.fontWeight = "100";
      valueAxis.title.fillOpacity = 0;
      valueAxis.stroke = am4core.color("#66fcf1");

      // Create series
      var series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueX = "count";
      series.dataFields.categoryY = "compartment";
      series.name = "count";
      series.columns.template.tooltipText = "Passenger count in {compartment} is {count}";
      series.columns.template.fillOpacity = 1;
      series.columns.template.fill = am4core.color("#C5c6c7");
      series.columns.template.stroke = am4core.color("#C5c6c7");

      
      //value above bars
      let valueLabel = series.bullets.push(new am4charts.LabelBullet());
      valueLabel.label.text = "{count}";
      valueLabel.label.fontSize = 20;
      valueLabel.label.dx = 20;
      valueLabel.label.fill = am4core.color("#66fcf1");
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
