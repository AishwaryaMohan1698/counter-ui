import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompartmentsListComponent } from './compartments-list.component';

describe('CompartmentsListComponent', () => {
  let component: CompartmentsListComponent;
  let fixture: ComponentFixture<CompartmentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompartmentsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompartmentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
