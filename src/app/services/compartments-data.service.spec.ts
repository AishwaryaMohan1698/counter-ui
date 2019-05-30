import { TestBed } from '@angular/core/testing';

import { CompartmentsDataService } from './compartments-data.service';

describe('CompartmentsDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompartmentsDataService = TestBed.get(CompartmentsDataService);
    expect(service).toBeTruthy();
  });
});
