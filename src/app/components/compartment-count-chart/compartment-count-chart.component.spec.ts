import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompartmentCountChartComponent } from './compartment-count-chart.component';

describe('CompartmentCountChartComponent', () => {
  let component: CompartmentCountChartComponent;
  let fixture: ComponentFixture<CompartmentCountChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompartmentCountChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompartmentCountChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
